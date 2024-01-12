import { FaInfo } from 'react-icons/fa'
import Info from './Info'
import ModalButton from './ModalButton'
import { Controls, Watch } from './index'

export default function Header() {
    return (
        <header className="relative bg-black bg-opacity-30 px-2 overflow-hidden w-full grid grid-cols-[40px_1fr_40px] gap-4 items-center">
            <picture>
                <img src="./multitrack-logo.png" width="160" alt="" />
            </picture>
            <div className="mx-auto flex items-center justify-center gap-6">
                <Watch />
                <Controls />
            </div>
            <ModalButton
                buttonContent={
                    <FaInfo />
                }
            >
                <Info />
            </ModalButton>
        </header>
    )
}

