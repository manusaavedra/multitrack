"use client"

import { useRef, useEffect } from "react"

export default function InputSlider({ minValue = 0, maxValue = 100, initialValue = 0, orientation = 'horizontal' }) {

    //const [value, setValue] = useState(initialValue)
    const sliderInput = useRef()
    const progressNode = useRef()

    let progressStyle = {
        color: 'white',
        backgroundColor: '#21c49b',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 100
    }

    useEffect(() => {

        let input = sliderInput.current

        const handleMouseUp = (e) => {
            console.log(e)
        }

        const handleMouseDown = (e) => {
            console.log(e)

        }

        input.addEventListener('mouseup', handleMouseUp)
        input.addEventListener('mousedown', handleMouseDown)


        return () => {
            input.removeEventListener('mouseup', handleMouseUp, false)
            input.removeEventListener('mousedown', handleMouseDown, false)
        }

    }, [])


    return (
        <div ref={sliderInput} className="slider">
            <div ref={progressNode} style={progressStyle} className="progress">
            </div>
        </div>
    )

}