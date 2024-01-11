export default function ActivityIndicator({ open, text = "Cargando..." }) {

    return (
        <div className={`fixed bg-black bg-opacity-55 z-50 top-0 left-0 w-full h-screen place-items-center ${open ? 'grid' : 'hidden'}`}>
            <div className="flex flex-col items-center">
                <div id="fountainG">
                    <div id="fountainG_1" className="fountainG"></div>
                    <div id="fountainG_2" className="fountainG"></div>
                    <div id="fountainG_3" className="fountainG"></div>
                    <div id="fountainG_4" className="fountainG"></div>
                    <div id="fountainG_5" className="fountainG"></div>
                    <div id="fountainG_6" className="fountainG"></div>
                    <div id="fountainG_7" className="fountainG"></div>
                    <div id="fountainG_8" className="fountainG"></div>
                </div>
                <span className="loading__spinner">{text}</span>
            </div>
        </div>
    )
}