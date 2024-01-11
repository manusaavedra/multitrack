import { Header, Playlist, Mixer, ProgressBar } from '.'

function Player() {

    return (
        <main className="w-full overflow-hidden max-w-[1200px] mx-auto px-2 h-screen grid grid-cols-1 grid-rows-[64px_40px_100px_1fr]">
            <Header buttonNav={false} watchElement={true} />
            <ProgressBar />
            <Playlist />
            <Mixer />
        </main>
    )
}


export default Player