import { Header, Playlist, Mixer, ProgressBar } from '.'

function Player() {

    return (
        <main className="w-full h-screen grid place-items-center">
            <div className="overflow-hidden w-full max-w-[1200px] mx-auto px-2 grid grid-cols-1 grid-rows-[48px_25px_minmax(60px,100px)_1fr]">
                <Header buttonNav={false} watchElement={true} />
                <ProgressBar />
                <Playlist />
                <Mixer />
            </div>
        </main>
    )
}


export default Player