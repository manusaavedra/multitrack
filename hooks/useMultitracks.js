"use client"

import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { SetAllMultitracks } from '../redux/actions'
import listSong from '../tmp/database-test'

export default function useMultitracks() {

    const [loading, setLoading] = useState(true)

    const dispatch = useDispatch()

    useEffect(() => {
        getAllMultitracks()
    })

    const getAllMultitracks = async () => {

        dispatch(SetAllMultitracks(listSong))
        setLoading(false)
    }

    return [
        loading,
        listSong
    ]
}