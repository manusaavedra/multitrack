import useToggle from "../hooks/useToggle"
import { ListItems } from "./index"
import { FaPlus } from 'react-icons/fa'


export default function ButtonAdd({ disabled }) {
    const [isSelected, toggle] = useToggle()

    return (
        <>
            <button className="rounded-md border-2 border-neutral-700 flex items-center justify-center p-3" onClick={toggle} disabled={disabled}>
                <FaPlus />
            </button>
            <Dialog
                show={isSelected}
                body={<ListItems />}
                title="Escoge tus secuencias"
                callbackClose={toggle}
            />
        </>
    )
}


function Dialog({ show, title, body, textAcceptButton = "ok", callback, callbackClose }) {

    return (
        <div className={`fixed z-50 top-0 left-0 w-full h-full ${show ? 'flex' : 'hidden'} justify-center items-center`}>
            <div className="absolute top-0 left-0 w-full h-full" onClick={callbackClose}></div>
            <div className="bg-neutral-800 rounded-md p-2 max-w-4xl mx-auto w-full max-h-[400px] overflow-y-auto">
                <div className="flex items-center justify-between w-full">
                    <h4> {title} </h4>
                    <span onClick={callbackClose}>&#10006;</span>
                </div>
                <div className="py-6">
                    {body}
                </div>
                <div className="flex items-center justify-end">
                    {
                        callback ? <button className="bg-neutral-800 p-2 rounded-md" onClick={callback} >{textAcceptButton}</button> : null
                    }
                </div>
            </div>
        </div>
    )
}