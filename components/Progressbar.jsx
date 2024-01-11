"use client"

import { useTimer } from "../hooks/useTimer"

export default function ProgressBar() {
    const [duration, time] = useTimer()

    return (
        <div className="w-full py-2">
            <input
                type="range"
                className="accent-cyan-500 w-full rounded-sm"
                max={duration}
                defaultValue={time}
            />
        </div>
    )
}