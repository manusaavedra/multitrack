"use client"

import * as Tone from 'tone'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AddAudioBuffered } from "../redux/actions"
import { ActivityIndicator } from '.'
import { FaPlus } from 'react-icons/fa'
import useMultitracks from '../hooks/useMultitracks'

function ListItems() {

    let selectionItems = []

    const [loading, setLoading] = useState({
        state: false,
        text: "Cargando..."
    })

    const [list, setList] = useState([])
    const [selection, setSelection] = useState([])

    const [loadingMultitrack, multitracks] = useMultitracks()
    const playlists = useSelector((state) => state.listAudioBuffered)
    const audioCtx = Tone.getContext()
    const dispatch = useDispatch()

    useEffect(() => {

        const filterResources = () => {

            if (playlists !== null || playlists.length > 0) {

                const filtered = multitracks.filter((multitrack) => {
                    return playlists.every((stem) => stem.metadata.id !== multitrack.id)
                })

                setList(filtered)
            } else {
                setList(multitracks)
            }

        }

        filterResources()

        return () => {
            setList([])
        }

    }, [playlists, multitracks])


    const handleSelection = () => {

        selectionItems.length = 0

        const selectedSongInputs = document.querySelectorAll("input[type='checkbox']:checked")

        selectedSongInputs.forEach((input) => {
            let stem = list.filter((info) => info.id === input.value)
            selectionItems.push(...stem)
        })

        setSelection(selectionItems)
    }

    const multitrackLoader = async () => {

        let payload = []

        for (let i = 0; i < selection.length; i++) {
            let response = await mutitrackReader(selection[i])
            payload.push(response)
        }

        dispatch(AddAudioBuffered(payload))
        setLoading({ state: false, text: "" })
        setSelection([])

    }

    const sortTracks = (obj) => {
        return obj.sort((a, b) => a.pan - b.pan)
    }

    const mutitrackReader = async (multitrack) => {

        const files = multitrack.song
        const tracks = sortTracks(files)
        let listLoadedMultitracks = []

        for (let i = 0; i < tracks.length; i++) {
            let track = tracks[i]
            let buffer = await getFile(track.url)

            listLoadedMultitracks.push({
                buffer,
                ...track
            })

            setLoading({ state: true, text: `Cargando ${multitrack.name} - ${track.title}` })
        }

        return {
            metadata: multitrack,
            tracks: listLoadedMultitracks
        }
    }

    const getFile = async (path) => {

        const response = await fetch(path);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);

        return audioBuffer;
    }


    return (
        <div>
            {
                loading.state ? <ActivityIndicator open={loading.state} text={loading.text} /> : null
            }
            <ul>
                {
                    !loadingMultitrack && list.map((session) => (
                        <li key={session.id} className="grid grid-cols-[60px_1fr_20px] gap-2 items-center py-2">
                            <div>
                                <picture>
                                    <img src={session.featured} alt={session.name} />
                                </picture>
                            </div>
                            <div>
                                <span className="truncate text-ellipsis"> {session.name} </span>
                            </div>
                            <input className="item__checkbox" onChange={handleSelection} type="checkbox" value={session.id} />
                        </li>
                    ))
                }
            </ul>
            <div className="flex items-center justify-end">
                <button className="bg-neutral-900 font-semibold p-2 flex items-center justify-center gap-2" onClick={multitrackLoader}>
                    <FaPlus />
                    Agregar secuencias seleccionadas
                </button>
            </div>
        </div>
    )
}

export default ListItems