"use client"

import { useTimer } from "../hooks/useTimer"

export default function ProgressBar() {
    const [duration, time] = useTimer()

    const handleChange = () => { }

    return (
        <div className="w-full py-2">
            <input
                type="range"
                className="accent-cyan-500 w-full rounded-sm"
                max={duration}
                onChange={handleChange}
                value={time}
            />
        </div>
    )
}