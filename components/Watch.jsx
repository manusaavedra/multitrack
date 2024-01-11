"use client"

import { useTimer, toStringTime } from "../hooks/useTimer"

export default function Watch() {
    const [duration, time] = useTimer()

    return (
        <>
            <div className="flex w-[100px] h-full flex-col bg-black bg-opacity-30 px-2 rounded-md">
                <span className="text-2xl font-[digital]">{toStringTime(time)}</span>
                <div>
                    <p className="text-xs">{toStringTime(time)} / {toStringTime(duration)}</p>
                </div>
            </div>
        </>
    )
}

