"use client"

import { useSelector } from "react-redux"
import { AudioTrack } from "."
import * as Tone from 'tone'
import { useEffect, useState } from "react"

function Peaks() {
    const [meterValue, setMeterValue] = useState([-80, -80])

    useEffect(() => {

        const toneMeter = new Tone.Meter({ channels: 2 })
        Tone.Destination.connect(toneMeter)

        const clock = setInterval(() => {
            if (Tone.Transport.state === "started")
                setMeterValue(toneMeter.getValue())
        }, 100)

        return () => {
            clearInterval(clock)
        }
    }, [])

    const Meter = () => {

        const [left, right] = meterValue

        const peeakColor = (value) => {
            if (value > .70)
                return 'yellow'
            if (value >= .80)
                return 'red'
            else
                return 'rgb(45, 170, 225)'
        }

        return (
            <div className="meter">
                <div style={{ width: Tone.dbToGain(left) * 300 + '%', backgroundColor: peeakColor(Tone.dbToGain(left)) }} className="left"></div>
                <div style={{ width: Tone.dbToGain(left) * 300 + '%', backgroundColor: peeakColor(Tone.dbToGain(right)) }} className="right"></div>
            </div>
        )
    }

    return <Meter />
}

function Mixer() {

    const currentSource = useSelector((state) => state.currentSource)

    const Skeleton = () => {
        return (
            <div className="mixer__empty">
                <h1>Selecciona un Multitrack</h1>
            </div>
        )
    }

    return (
        <div className="w-full">
            <div className="flex items-stretch bg-black bg-opacity-50 p-4 rounded-md">
                <div className="w-full overflow-x-auto p-4">
                    <div className="flex min-w-fit items-center gap-2">
                        {
                            currentSource.length > 0 && currentSource.map((audio, index) => (
                                <AudioTrack
                                    source={audio}
                                    key={audio.title + index.toString()} />
                            ))
                        }
                    </div>
                </div>
                {
                    currentSource.length > 0
                        ? <MixerControl />
                        : <Skeleton />
                }
            </div>
            <Peaks />
        </div>
    )
}


function MixerControl() {
    const handleChangeVolume = (evt) => {
        const { value } = evt.target
        Tone.Destination.volume.value = 0
    }

    return (
        <div className="relative overflow-hidden bg-neutral-950 grid text-white grid-rows-[20px_1fr] grid-cols-1 w-40 justify-center items-center border-2 border-cyan-500 rounded-md">
            <span className="text-center w-full font-semibold py-2 bg-black">Master</span>
            <input
                onInput={handleChangeVolume}
                type="range"
                className="track-fader-volume !w-[300px] !-mx-24 md:!-mx-20 !h-[32]"
                orient="vertical"
                min={-80}
                max={10}
                defaultValue={0}
            />
        </div>
    )
}



export default Mixer