"use client"

import { useSelector } from "react-redux"
import { AudioTrack } from "."
import * as Tone from 'tone'
import { useEffect, useState } from "react"

function Peaks() {
    const [meterValue, setMeterValue] = useState([-80, -80]);

    useEffect(() => {
        const toneMeter = new Tone.Meter({ channels: 2 });
        Tone.Destination.connect(toneMeter);

        const clock = setInterval(() => {
            if (Tone.Transport.state === 'started') {
                setMeterValue([...toneMeter.getValue()]);
            }
        }, 100);

        return () => {
            clearInterval(clock);
        };
    }, []);

    const peeakColor = (value) => {
        if (value > 0.70) return 'yellow';
        if (value >= 0.80) return 'red';
        return 'rgb(45, 170, 225)';
    };

    const Meter = () => {
        const [left, right] = meterValue;

        return (
            <div className="meter">
                <div style={{ width: Math.abs(Tone.dbToGain(left)) * 300 + '%', backgroundColor: peeakColor(Tone.dbToGain(left)) }} className="left"></div>
                <div style={{ width: Math.abs(Tone.dbToGain(right)) * 300 + '%', backgroundColor: peeakColor(Tone.dbToGain(right)) }} className="right"></div>
            </div>
        );
    };

    return <Meter />;
}

function Mixer() {
    const currentSource = useSelector((state) => state.currentSource)
    const isMountMixer = currentSource.length > 0

    const Skeleton = () => {
        return (
            <div className="w-full min-h-[200px] flex items-center justify-center font-semibold">
                <h1>Selecciona un Multitrack</h1>
            </div>
        )
    }

    return (
        <div className="w-full">
            <Peaks />
            <div className="flex items-stretch bg-black bg-opacity-30 p-1 rounded-md">
                <div className={`${isMountMixer ? 'block' : 'hidden'} w-full min-h-[200px] overflow-x-auto p-1`}>
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

                    isMountMixer
                        ? <MixerControl />
                        : <Skeleton />
                }
            </div>
        </div>
    )
}


function MixerControl() {
    const handleChangeVolume = (evt) => {
        const { value } = evt.target
        Tone.Destination.volume.value = value
    }

    return (
        <div className="relative overflow-hidden bg-neutral-950 grid text-white grid-rows-[20px_1fr] grid-cols-1 w-40 justify-center items-center border-2 border-cyan-500 rounded-md">
            <span className="text-center w-full font-semibold py-2 bg-black">Master</span>
            <input
                id="track-master"
                onInput={handleChangeVolume}
                type="range"
                className="track-fader-volume !w-[140px] !-mx-2 md:!-mx-2 !h-[24]"
                orient="vertical"
                min={-80}
                max={10}
                defaultValue={0}
            />
        </div>
    )
}



export default Mixer