"use client"

import { useTimer, toStringTime } from "../hooks/useTimer"

export default function Watch() {
    const [duration, time] = useTimer()

    return (
        <>
            <div className="flex w-[100px] text-black h-[95%] flex-col bg-neutral-50 shadow-[inset_0px_2px_2px_rgba(0,0,0,.4)] bg-opacity-30 px-2 rounded-md">
                <span className="text-2xl m-0 font-[digital]">{toStringTime(time)}</span>
                <div>
                    <p className="text-xs -mt-2">{toStringTime(time)} / {toStringTime(duration)}</p>
                </div>
            </div>
        </>
    )
}

