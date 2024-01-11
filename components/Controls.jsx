"use client"

import { FaPlay, FaPause, FaStop } from 'react-icons/fa'
import { useEffect, useRef } from 'react'
import useControls from '../hooks/useControls'
import { AddButton } from '.'


export default function Controls() {
    const [togglePlay, stop, isPlay] = useControls()
    const buttonPlay = useRef()

    useEffect(() => {
        const shortCut = (event) => {
            const code = String(event.code).toLowerCase()
            if (code === 'space')
                buttonPlay.current.click()
        }

        window.addEventListener('keyup', shortCut, false)

        return () => {
            window.removeEventListener('keyup', shortCut, false)
        }

    }, [])

    return (
        <div className="flex items-center gap-2">
            <button ref={buttonPlay} onClick={() => togglePlay()} className="rounded-full flex items-center justify-center border-2 border-neutral-700 p-3" value="Reproducir" title="Reproducir">
                {
                    !isPlay ? <FaPlay size={16} /> : <FaPause size={16} />
                }
            </button>

            <button onClick={() => stop()} className="rounded-md border-2 border-red-700 bg-red-700 flex items-center justify-center p-3" value="Detener" title="Detener">
                <FaStop size={16} />
            </button>
            <AddButton disabled={isPlay} />
        </div>
    )
}
