import { createStore } from 'vuex';
import axios from 'axios';

export interface ISong {
    id: string
    name: string,
    song: string,
    composer: string | null,
    author: string | null,
    singer: string | null,
    clip: string | null,
    cover: string | null,
    description: string | null,
    'date_create': number,
    'date_modify': number,
    listeningCnt: number,
    originalId: string | null,
}

export interface State {
    songs: ISong[],
    isAdmin: boolean,
    activeSong: ISong | null,
    playbackSong: ISong | null,
    playbackIndex: number
}

declare global {
    interface Window {
      isAdmin: boolean;
    }
}

export default createStore({
    state():State {
        return {
            songs: [],
            isAdmin: window.isAdmin,
            activeSong: null, // показываем подробную информацию
            playbackSong: null, // проигрывается
            playbackIndex: 0,
        }/* eslint-disable */
    },
    getters: {
    },
    mutations: {
        SET_SONGS(state:State, payload:ISong[]) {
            state.songs = payload;
        },
        SET_ACTIVE(state:State, payload:ISong) {
            state.activeSong = payload;
        },
        SET_PLAYBACK(state:State, index: number) {
            state.playbackIndex = index;
            state.playbackSong = state.songs[index];
        },
        SET_NEXT(state:State) {
            if (state.playbackIndex < state.songs.length - 1) {
                state.playbackIndex++;
            } else {
                state.playbackIndex = 0;
            }
            state.playbackSong = state.songs[state.playbackIndex];
        },
        SET_PREW(state:State) {
            if (state.playbackIndex > 0) {
                state.playbackIndex--;
            } else {
                state.playbackIndex = state.songs.length - 1;
            }
            state.playbackSong = state.songs[state.playbackIndex];
        },
        SET_IS_ADMIN(state:State, payload: boolean) {
            state.isAdmin = payload;
        }
    },
    actions: {
        async getList({ commit }, params) {
            axios.get('/songs/', {
                    params: params
                })
                .then(({data}) => {
                    commit('SET_SONGS', data)
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
    }
});
