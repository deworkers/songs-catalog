import { createStore } from 'vuex';
import axios from 'axios';
// eslint-disable-next-line
import audio from './audio';
import { IGroup, ISong, State } from './types';

const isProduction = process.env.NODE_ENV === 'production';

const apiClient = axios.create({
    baseURL: isProduction ? '/' : 'http://localhost:3000',
});
declare global {
    interface Window {
      isAdmin: boolean;
      userId: string;
    }
}

const store = createStore({
    state():State {
        return {
            songs: [],
            groups: [],
            playList: [],
            page: null,
            allPages: null,
            activeTag: 'new',
            isAdmin: window.isAdmin,
            userID: window.userId,
            activeSong: null, // показываем подробную информацию
            activeGroup: null,
            playbackSong: null, // проигрывается
            playbackIndex: 0,
            isPlaying: false,
            muted: false,
            volume: 0.5,
            duration: 0,
            timer: '00:00',
            progress: '0',
            searchRequest: null,
            scrollPosition: 0,
        }/* eslint-disable */
    },
    getters: {
        searchResult(state:State) {
            if (!state.searchRequest) {
                return state.songs;
            } else {
                const regexp = new RegExp(state.searchRequest, 'i');
                return state.songs.filter((song:ISong) => song.name.match(regexp));
            }
        }
    },
    mutations: {
        SET_SONGS(state:State, payload:ISong[]) {
            state.songs = payload;
        },
        SET_PLAY_LIST(state:State, payload:ISong[]) {
            state.playList = payload;
            state.playbackIndex = -99;
        },
        SET_GROUPS(state:State, payload:IGroup[]) {
            state.groups = payload;
        },
        SET_ACTIVE(state:State, payload:ISong | null) {
            state.activeSong = payload;
        },
        SET_ACTIVE_GROUP(state:State, payload:IGroup | null) {
            state.activeGroup = payload;
        },
        SET_PLAY(state:State, index: number) {
            if (state.playbackSong && audio.paused
                && (state.playbackIndex === -1 || state.playbackSong.id === state.songs[index].id)) {
                audio.play();
            } else {
                state.playbackIndex = index;
                state.playbackSong = state.playList[index];
                if (state.playbackSong.song) {
                    audio.src = state.playbackSong.song;
                    audio.currentTime = 0;
                    audio.volume = state.volume;
                    audio.play();
                    store.dispatch('setListening', state.playbackSong.id);
                } else {
                    store.commit('SET_NEXT');
                }
            }
        },
        SET_PLAY_COVER(state:State, song: ISong) {
            state.playbackIndex = -1;
            state.playbackSong = song;
            if (state.playbackSong.song) {
                audio.src = state.playbackSong.song;
                audio.currentTime = 0;
                audio.play();
                store.dispatch('setListening', state.playbackSong.id);
            }
        },
        SET_PAUSE(state:State) {
            audio.pause();
            setTimeout(() => {
                if (state.playbackSong) {
                    document.title = `⏸ ${state.playbackSong.name}`;
                }
            }, 100);
        },
        MOVE_TO(state:State, currentTime: number) {
            audio.currentTime = currentTime;
        },
        MUTE(state:State) {
            if (!state.muted) {
                state.muted = true;
                audio.muted = true;
            } else {
                state.muted = false;
                audio.muted = false;
            }
        },
        SET_VOLUME(state:State, volume: number) {
            state.volume = volume;
            audio.volume = volume;
        },
        SET_NEXT(state:State) {
            if (state.playbackIndex < state.playList.length - 1 && state.playbackIndex > -1) {
                state.playbackIndex++;
            } else {
                state.playbackIndex = 0;
            }

            state.playbackSong = state.playList[state.playbackIndex];
            if (state.playbackSong.song) {
                audio.src = state.playbackSong.song;
                audio.currentTime = 0;
                audio.play();
                store.dispatch('setListening', state.playbackSong.id);
            } else {
                store.commit('SET_NEXT');
            }
        },
        SET_PREW(state:State) {
            if (state.playbackIndex > 0) {
                state.playbackIndex--;
            } else {
                state.playbackIndex = state.playList.length - 1;
            }
            state.playbackSong = state.playList[state.playbackIndex];
            if (state.playbackSong.song) {
                audio.src = state.playbackSong.song;
                audio.currentTime = 0;
                audio.play();
                store.dispatch('setListening', state.playbackSong.id);
            } else {
                store.commit('SET_PREW');
            }
        },
        SET_IS_ADMIN(state:State, payload: boolean) {
            state.isAdmin = payload;
        },
        SET_SEARCH_REQUEST(state:State, payload: string | null) {
            state.searchRequest = payload;
        },
        SET_PAGE(state:State, payload: number | null) {
            state.page = payload;
        },
        SET_ALL_PAGES(state:State, payload: number | null) {
            state.allPages = payload;
        },
        SET_ACTIVE_TAG(state:State, payload: string | null) {
            state.activeTag = payload;
        },
        SET_SCROLL_POSITION(state:State, payload: number) {
            state.scrollPosition = payload;
        }
    },
    actions: {
        getSongs({ commit }, params) {
            if (store.state.activeSong) {
                commit('SET_ACTIVE', null);
            }
            return apiClient.get('/songs/', {
                    params: params
                })
                .then(({data}) => {
                    commit('SET_SONGS', data.items);
                    commit('SET_PLAY_LIST', data.items);
                    commit('SET_GROUPS', data.groups);
                    commit('SET_PAGE', data.page);
                    commit('SET_ALL_PAGES', data.allPages);
                })
                .catch(function (error) {
                    console.log(error);
                })
        },
        getSong({ commit }, id: number) {
            return apiClient.get(`/song/${id}`)
                .then(({data}) => {
                    commit('SET_ACTIVE', data);
                })
                .catch(function (error) {
                    console.log(error);
                })
        },
        getGroup({ commit }, id: number) {
            return apiClient.get(`/group/${id}`)
                .then(({data}) => {
                    commit('SET_ACTIVE_GROUP', data);
                    commit('SET_PLAY_LIST', data.songs);
                })
                .catch(function (error) {
                    console.log(error);
                })
        },
        delete({ commit, state }, id : number) {
            return apiClient.get('/song/delete/', {
                    params: {
                        id: id
                    }
                })
                .then(() => {
                    const songs = state.songs.filter((elem:ISong) => {
                        return elem.id !== id
                    });
                    commit('SET_SONGS', songs);
                })
                .catch(function (error) {
                    console.log(error);
                })
        },
        edit({ commit, state }, payload: {formData : FormData, id : number}) {
            return apiClient.post(`/song/${payload.id}`, payload.formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        setListening({ commit, state }, id: number) {
            return apiClient.get(`/songListening/${id}`)
                .then((response) => {
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        sendForm({ commit, state }, payload: {formData : FormData}) {
            return apiClient.post(`/site/contact/`, payload.formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then((response) => {
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        login({ commit, state }, payload: {formData : FormData}) {
            return new Promise((resolve, reject) => {
                apiClient.post(`/site/login/`, payload.formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                    .then((response) => {
                        resolve(response.data);
                        commit('SET_IS_ADMIN', true);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            });
        },
        deleteGroup({ commit, state }, id : number) {
            return apiClient.get('/group/delete/', {
                    params: {
                        id: id
                    }
                })
                .then(() => {
                    const groups = state.groups.filter((elem:IGroup) => {
                        return elem.id !== id
                    });
                    commit('SET_GROUPS', groups);
                })
                .catch(function (error) {
                    console.log(error);
                })
        },
        editGroup({ commit, state }, payload: {formData : FormData, id : number}) {
            return apiClient.post(`/group/${payload.id}`, payload.formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    }
});

export default store;