import useToggle from "../hooks/useToggle";
import * as Tone from 'tone'

export default function ButtonFadeInOut() {
    const [isSelected, toggle] = useToggle()

    const icon = !isSelected ? '/icon-fadeout-64.svg' : '../icon-fadein-64.svg'

    if (Tone.Transport.state === "started") {
        Tone.Destination.volume.value = !isSelected ? 0 : -120
    }

    const waitTimeout = async (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const toogleFadeInOut = async () => {
        toggle()

        let volume = isSelected ? -120 : 0
        let volumeFaderMaster = document.getElementById("track-master").value

        const interval = setInterval(() => {

            if (!isSelected && volume >= -120) {
                Tone.Destination.volume.value = volume
                volume--
            }

            if (isSelected && volume <= volumeFaderMaster) {
                Tone.Destination.volume.value = volume
                volume++
            }

        }, 100)

        await waitTimeout(4500)

        clearInterval(interval)
    }


    return (
        <button className="rounded-md border-2 border-neutral-700 flex items-center justify-center p-2" onClick={toogleFadeInOut}>
            <picture>
                <img src={icon} alt="alternate" width={13} height={13} />
            </picture>
        </button>
    )
}