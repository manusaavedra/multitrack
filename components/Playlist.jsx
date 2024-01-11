"use client"

import * as Tone from 'tone'
import { useDispatch, useSelector } from "react-redux";
import { AddCurrentSource, ListAudioBuffered } from '../redux/actions'
import { FaTrash } from 'react-icons/fa'
import { useState } from "react";
import SortableList, { SortableItem } from 'react-easy-sort'
import { arrayMoveImmutable } from 'array-move'

function Playlist() {
    const [state, setState] = useState({
        open: false,
        itemSelected: null
    })

    const multitracks = useSelector((state) => state.listAudioBuffered)

    const dispatch = useDispatch()

    const handleLoadToMixer = (data) => {
        dispatch(AddCurrentSource(data))
        Tone.start()
        Tone.Transport.stop()
    }

    const onSortEnd = (oldIndex, newIndex) => {
        const data = arrayMoveImmutable(multitracks, oldIndex, newIndex)
        dispatch(ListAudioBuffered(data))
    }

    const handleToggleDialog = (id) => {
        setState({ open: !state.open, itemSelected: id })
    }

    const handleDelete = (id) => {
        const payload = multitracks.filter((item) => item.metadata.id !== id)
        if (multitracks.length === 1) dispatch(AddCurrentSource([]))
        dispatch(ListAudioBuffered(payload))
        setState({ open: !state.open, itemSelected: null })
    }

    return (
        <div className="flex items-center py-2">
            <SortableList
                className="flex items-center gap-2"
                onSortEnd={onSortEnd}
                draggedItemClassName="dragged">
                {
                    multitracks.map((multitrack) => {
                        return (
                            <SortableItem key={multitrack.metadata.id}>
                                <div
                                    className="relative group border-2 pr-4 overflow-hidden border-neutral-700 max-w-[280px] max-h-14 rounded-3xl grid grid-cols-[50px_1fr] items-center gap-2"
                                    onTouchEnd={() => handleLoadToMixer(multitrack.tracks)}
                                    onDoubleClick={() => handleLoadToMixer(multitrack.tracks)}>

                                    <div>
                                        <picture>
                                            <img src={multitrack.metadata.featured} alt={multitrack.metadata.name} />
                                        </picture>
                                    </div>
                                    <div className="overflow-hidden">
                                        <p className="truncate text-ellipsis"> {multitrack.metadata.name} - {multitrack.metadata.artists} </p>
                                    </div>
                                    <div className="group-hover:flex absolute top-3 left-4 hidden bg-black rounded-full bg-opacity-60 p-2" onClick={() => handleToggleDialog(multitrack.metadata.id)}>
                                        <FaTrash />
                                    </div>
                                </div>
                            </SortableItem>
                        )
                    })
                }
            </SortableList>
            <Dialog
                show={state.open}
                title="Eliminar"
                body="¿Deseas eliminar de la lista de reproducción?"
                textAcceptButton="Eliminar"
                callback={() => handleDelete(state.itemSelected)}
                callbackClose={handleToggleDialog}
            />
        </div>

    )
}


function Dialog({ show, title, body, textAcceptButton = "ok", callback, callbackClose }) {

    return (
        <div className={`fixed flex items-center justify-center bg-black bg-opacity-30 w-full h-screen z-50 top-0 left-0 ${show ? 'flex' : 'hidden'}`}>
            <div className="bg-neutral-900 max-w-[320px] w-[95%] p-2">
                <div className="flex items-center justify-between w-full border-b border-neutral-700">
                    <h4 className="font-semibold"> {title} </h4>
                    <span className="text-sm text-white" onClick={callbackClose}>&#10006;</span>
                </div>
                <div className="text-center py-4">
                    <p> {body} </p>
                </div>
                <div className="flex items-center justify-end">
                    <button className="bg-neutral-800 p-2 font-semibold rounded-md" onClick={callback} >{textAcceptButton}</button>
                </div>
            </div>
        </div>
    )
}


export default Playlist