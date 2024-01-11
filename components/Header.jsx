import { Controls, Watch, ButtonFadeInOut } from './index'

export default function Header() {
    return (
        <header className="relative overflow-hidden w-full py-2 grid grid-cols-[40px_1fr] gap-4 items-center">
            <picture>
                <img src="./multitrack-logo.png" width="160" alt="" />
            </picture>
            <div className="mx-auto flex items-center justify-center gap-6">
                <Watch />
                <Controls />
                <ButtonFadeInOut />
            </div>
        </header>
    )
}

