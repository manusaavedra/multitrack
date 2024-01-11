

const ACTION_TYPES = {
    SET_ALL_MULTITRACK: "SET_ALL_MULTITRACK",
    ADD_CURRENT_TRACKS: "ADD_CURRENT_TRACKS",
    LIST_AUDIO_BUFFERED: "LIST_AUDIO_BUFFERED",
    ADD_AUDIO_BUFFERED: "ADD_AUDIO_BUFFERED",
    LIST_SELECTION: "LIST_SELECTION",
    OFFSET: "OFFSET",
    SET_TIME: "SET_TIME",
    SET_PITCH: "SET_PITCH",
    PLAY_STATE: "PLAY_STATE"
}

const SetAllMultitracks = (payload) => {
    return {
        type: ACTION_TYPES.SET_ALL_MULTITRACK,
        payload: payload
    }
}

const ListSelection = (payload) => {
    return {
        type: ACTION_TYPES.LIST_SELECTION,
        payload: payload
    }
}

const ListAudioBuffered = (payload) => {
    return {
        type: ACTION_TYPES.LIST_AUDIO_BUFFERED,
        payload: payload
    }
}

const AddAudioBuffered = (payload) => {
    return {
        type: ACTION_TYPES.ADD_AUDIO_BUFFERED,
        payload: payload
    }
}

const AddCurrentSource = (payload) => {
    return {
        type: ACTION_TYPES.ADD_CURRENT_TRACKS,
        payload: payload
    }
}

const SetPitch = (payload) => {
    return {
        type: ACTION_TYPES.SET_PITCH,
        payload: payload
    }
}

const Offset = (payload) => {
    return {
        type: ACTION_TYPES.OFFSET,
        payload: payload
    }
}

const PlayState = (payload) => {
    return {
        type: ACTION_TYPES.PLAY_STATE,
        payload: payload
    }
}  

export {
    ACTION_TYPES,
    SetAllMultitracks,
    ListSelection,
    ListAudioBuffered,
    AddAudioBuffered,
    AddCurrentSource,
    Offset,
    SetPitch,
    PlayState,
}