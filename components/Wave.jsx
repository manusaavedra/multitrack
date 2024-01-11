"use client"

import { useEffect } from "react"
import { useSelector } from "react-redux"

function Waves({ time }) {

    const currentSource = useSelector((state) => state.currentSource)


    useEffect(() => {

        const generate = () => {

            if (currentSource.length > 0 && time <= 0) {

                var element = document.getElementById("waveform")
                var context = element.getContext("2d")
                var { width, height } = element

                context.clearRect(0, 0, width, height)

                currentSource.map((audio) => {
                    return drawBuffer('waveform', audio.buffer)
                })
            }
        }

        generate()

    }, [currentSource, time])

    const drawBuffer = (canvas, buffer) => {

        var element = document.getElementById(canvas)
        var context = element.getContext("2d")
        var { width, height } = element

        context.fillStyle = `rgba(0,255,142, 0.6)`

        var data = buffer.getChannelData(1);
        var step = Math.ceil(data.length / width);
        var amp = height / 2;

        for (var i = 0; i < width; i++) {

            var min = 0.0;
            var max = 0.0;

            for (var j = 0; j < step; j++) {
                var datum = data[(i * step) + j];
                if (datum < min)
                    min = datum;
                if (datum > max)
                    max = datum;
            }

            context.fillRect(i, (1 + min) * amp, 1, Math.max(1, (max - min) * amp));
        }
    }

    return (
        <div className="container__wrap">
            <div className="timeline" id="timeline"></div>
            <canvas id="waveform" />
        </div>
    )
}

export default Waves