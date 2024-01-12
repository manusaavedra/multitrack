"use client"

import * as Tone from 'tone'
import { memo, useEffect, useRef } from "react"
import { useDispatch } from "react-redux"
import { PlayState } from '../redux/actions'
import useToggle from '../hooks/useToggle'


function AudioTrack({ source }) {

    const { buffer, pan, title } = source
    const dispatch = useDispatch()

    const volRef = useRef()
    const panRef = useRef()
    const muteRef = useRef()
    const soloRef = useRef()
    const player = useRef()
    const channel = useRef()

    const titleSource = String(title).substring(title.lastIndexOf("/") + 1)

    useEffect(() => {

        const initialize = (buffer, pan) => {
            const handleStopped = () => {
                switch (Tone.Transport.state) {
                    case "started":
                        Tone.Transport.stop()
                        player.current.dispose()
                        break;
                    case "paused":
                        Tone.Transport.pause()
                        break;
                    case "stopped":
                        Tone.Transport.stop()
                        dispatch(PlayState(false))
                        break;
                    default:
                        Tone.Transport.stop()
                        console.log("la audio terminó de reproducirse")
                        break;

                }
            }

            player.current = new Tone.Player({
                url: buffer,
                fadeIn: 1,
                onstop: handleStopped
            }).sync().start(0)

            channel.current = new Tone.Channel({
                pan: pan,
                solo: false,
                volume: 0,
                mute: false,
            }).toDestination()


            volRef.current.value = channel.current.volume.value
            panRef.current.value = channel.current.pan.value

            player.current.connect(channel.current)

        }

        initialize(buffer, pan)

        return () => {
            player.current.dispose()
            channel.current.dispose()
        }

    }, [dispatch, buffer, pan])

    const handleVolumenChange = (evt) => {
        const { value } = evt.target
        if (!channel.current.mute.valueOf())
            channel.current.volume.value = value
    }

    const handlePanChange = (evt) => {
        const { value } = evt.target
        channel.current.pan.value = value
    }

    const handleMute = (evt) => {
        channel.current.mute = !channel.current.mute.valueOf()
        if (!channel.current.mute.valueOf())
            channel.current.volume.value = volRef.current.value
    }

    const handleSolo = (evt) => {
        channel.current.solo = !channel.current.solo.valueOf()
    }

    return (
        <div className="border min-w-[110px] justify-center items-center overflow-hidden border-neutral-800 rounded-md grid grid-rows-[20px_60px_90px_0px] grid-cols-1 gap-2">
            <div className="flex items-center justify-center py-2 px-1 overflow-hidden h-full w-full text-center bg-black">
                <span className="truncate text-ellipsis">
                    {titleSource}
                </span>
            </div>
            <div>
                <input
                    ref={volRef}
                    className="track-fader-volume !m-1 !mt-8"
                    onInput={(evt) => handleVolumenChange(evt)}
                    type="range"
                    min={-80}
                    max={0}
                    defaultValue={0}
                />
            </div>
            <div className="w-[80%] mx-auto grid grid-cols-[10px_1fr_10px] items-center justify-center">
                L
                <input
                    ref={panRef}
                    className="track-fader-pan"
                    type="range"
                    onChange={(evt) => handlePanChange(evt)}
                    step={0.01}
                    min={-1}
                    max={1}
                    defaultValue={0}
                />
                R
            </div>
            <div className="mt-[-40px] flex items-center gap-2 justify-center">
                {
                    <>
                        <ButtonMute refs={muteRef} onClick={handleMute}>M</ButtonMute>
                        <ButtonSolo refs={soloRef} onClick={handleSolo} >S</ButtonSolo>
                    </>

                }
            </div>
        </div>
    )

}

function ButtonMute({ onClick }) {

    const [isSelected, toggle] = useToggle()

    const handleToggleMute = () => {
        toggle()
        onClick()
    }

    return (
        <button className={`w-8 rounded-md px-1 border-2 border-red-700 ${isSelected ? 'bg-red-700' : ''}`} onClick={handleToggleMute}>M</button>
    )
}

function ButtonSolo({ onClick }) {

    const [isSelected, toggle] = useToggle()

    const handleToggleSolo = () => {
        toggle()
        onClick()
    }

    return (
        <button className={`w-8 rounded-md px-1 border-2 border-yellow-700 ${isSelected ? 'bg-yellow-700 text-white' : ''}`} onClick={handleToggleSolo}>S</button>
    )
}

export default memo(AudioTrack)

