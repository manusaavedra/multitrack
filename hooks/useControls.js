"use client"

import { useSelector } from 'react-redux'
import * as Tone from 'tone'
import useToggle from './useToggle'

export default function useControls() {

    const [isPlay, togglePlay] = useToggle()
    const currentSource = useSelector((state) => state.currentSource)

    const handlePlay = () => {

        if (currentSource.length > 0) {
            if (!isPlay) {
                Tone.start()
                if (Tone.context.state === "running") {
                    Tone.Transport.start()
                    togglePlay()
                }
                return
            } else {
                Tone.Transport.pause()
                togglePlay()
            }
        }
    }

    const handleStop = () => {
        if (currentSource.length > 0 && isPlay) {
            Tone.Transport.stop()
            togglePlay()
        }

    }

    return [handlePlay, handleStop, isPlay]
}