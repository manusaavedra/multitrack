"use client"

import * as Tone from 'tone'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Offset } from '../redux/actions'

function padLeft(number) {
    return String(number).padStart(2, 0)
}

export function toStringTime(miliseconds) {

    miliseconds = miliseconds.toFixed(0)
    let minute = padLeft(Math.floor((miliseconds / 60) % 60));
    let second = padLeft((miliseconds % 60).toFixed(0));

    return `${minute}:${second}`

}

export function useTimer() {

    const [time, setTime] = useState(0)

    const dispatch = useDispatch()
    const offSetTime = useSelector((state) => state.offset)
    const currentSource = useSelector((state) => state.currentSource)
    const duration = currentSource.length > 0 ? currentSource[0].buffer.duration : 0

    useEffect(() => {

        let progress = 0, offsetStoped = 0

        const handleWatchTimer = () => {

            if (Tone.Transport.state === "started") {
                progress = (Tone.now() - offSetTime) - offsetStoped
                setTime(progress)
            }

            if (Tone.Transport.state === "paused")
                offsetStoped = (Tone.now() - (offSetTime + progress))

            if (Tone.Transport.state === "stopped")
                dispatch(Offset(Tone.context.currentTime))

        }

        const interval = setInterval(handleWatchTimer, 1000 / 30)

        return () => {
            clearInterval(interval)
        }

    }, [offSetTime, dispatch, currentSource])

    return [duration, time]
}