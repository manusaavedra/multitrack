import { createStore } from 'redux'
import {ACTION_TYPES} from './actions'

const initialState = {
    offset: 0,
    isPlaying: false,
    timeline: 0,
    allMultitracks: [],
    currentSource: [],
    listAudioBuffered: [],
    selection: []
}

function reducer(state, actions) {
    
    switch(actions.type) {
        
        case ACTION_TYPES.SET_ALL_MULTITRACK: {
            return {...state, allMultitracks: actions.payload }
        }

        case ACTION_TYPES.LIST_SELECTION: {
            return {...state, selection: actions.payload }
        }

        case ACTION_TYPES.LIST_AUDIO_BUFFERED: {
            return {...state, listAudioBuffered: actions.payload}
        }

        case ACTION_TYPES.ADD_AUDIO_BUFFERED: {
            return {...state, listAudioBuffered: state.listAudioBuffered.concat(actions.payload)}
        }

        case ACTION_TYPES.ADD_CURRENT_TRACKS: {
            return {...state, currentSource: actions.payload}
        }

        case ACTION_TYPES.OFFSET: {
            return {...state, offset: actions.payload}
        }

        case ACTION_TYPES.SET_TIME: {
            return {...state, timeline: actions.payload}
        }

        case ACTION_TYPES.PLAY_STATE: {
            return {...state, isPlaying: actions.payload}
        }

        default: {
            return state
        }
    }

}

export default createStore(reducer, initialState)
