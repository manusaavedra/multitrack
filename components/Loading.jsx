export default function ActivityIndicator({ open, text = "Cargando..." }) {

    return (
        <div style={{ display: open ? 'grid' : 'none' }} className="loading">
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
    )
}