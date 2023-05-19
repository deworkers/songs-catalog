import { createStore } from 'vuex';
import axios from 'axios';

const data = {
    items: [
        {
            id: 1,
            name: 'Сумасшедший февраль',
            song: 'https://www.avtoall.ru/upload/iblock/7d2/FEVRAL-DUET-MIX-04.mp3',
            composer: 'Рустам Неврединов',
            author: 'Валерий Парфёнов и Олеся Борисова',
            singer: 'Валерий Парфёнов и Олеся Борисова.',
            clip: null,
            cover: 'https://bigpicture.ru/wp-content/uploads/2021/12/bigpicture_ru_music-people-girl-sunshine-scaled.jpg',
            description: null,
            date_create: 1684307885,
            date_modify: 1684307885,
            listeningCnt: 0,
            originalId: null,
        },
        {
            id: 2,
            name: 'Орёл и Орлица',
            song: 'https://www.avtoall.ru/upload/iblock/368/SUDBI-DUET-MIX-01.mp3',
            composer: 'Рустам Неврединов',
            author: 'Валерий Парфёнов и Олеся Борисова',
            singer: 'Валерий Парфёнов и Олеся Борисова.',
            clip: 'https://www.youtube.com/watch?v=XXYlFuWEuKI',
            cover: null,
            description: null,
            date_create: 1684307885,
            date_modify: 1684307885,
            listeningCnt: 0,
            originalId: null,
        },
        {
            id: 3,
            name: 'Белые голуби',
            song: 'https://www.avtoall.ru/upload/iblock/438/MARSEL-DUET-MIX-03.mp3',
            composer: 'Рустам Неврединов',
            author: 'Валерий Парфёнов и Олеся Борисова',
            singer: 'Валерий Парфёнов и Олеся Борисова.',
            clip: null,
            cover: 'https://bigpicture.ru/wp-content/uploads/2021/12/bigpicture_ru_music-people-girl-sunshine-scaled.jpg',
            description: null,
            date_create: 1684307885,
            date_modify: 1684307885,
            listeningCnt: 0,
            originalId: null,
        },
    ],
    pages: 1,
}

const audio = new Audio();

export interface ISong {
    id: number
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

export interface IPlayer {
    activeSong: ISong | null,
    playbackSong: ISong | null,
    playbackIndex: number,
    isPlaying: boolean,
    muted: boolean,
    duration: number,
    timer: string,
    progress: number,
}

export interface State extends IPlayer {
    songs: ISong[],
    isAdmin: boolean,
}

declare global {
    interface Window {
      isAdmin: boolean;
    }
}

const store = createStore({
    state():State {
        return {
            songs: data.items,
            isAdmin: window.isAdmin,
            activeSong: null, // показываем подробную информацию
            playbackSong: null, // проигрывается
            playbackIndex: 0,
            isPlaying: false,
            muted: false,
            duration: 0,
            timer: '00:00',
            progress: 0,
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
            if (payload) {
                window.location.hash = `${payload.id}`;
            } else {
                window.location.hash = '';
            }
        },
        SET_PLAY(state:State, index: number) {
            if (!state.playbackSong || state.playbackIndex != index) {
                state.playbackIndex = index;
                state.playbackSong = state.songs[index];
                if (state.playbackSong.song) {
                    store.dispatch('setListening', state.playbackSong.id);
                    audio.src = state.playbackSong.song;
                    audio.currentTime = 0;
                    audio.play();
                } else {
                    store.commit('SET_NEXT');
                }
            } else {
                audio.play();
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
        SET_NEXT(state:State) {
            if (state.playbackIndex < state.songs.length - 1) {
                state.playbackIndex++;
            } else {
                state.playbackIndex = 0;
            }
            state.playbackSong = state.songs[state.playbackIndex];
            if (state.playbackSong.song) {
                audio.src = state.playbackSong.song;
                audio.currentTime = 0;
                audio.play();
            } else {
                store.commit('SET_NEXT');
            }
        },
        SET_PREW(state:State) {
            if (state.playbackIndex > 0) {
                state.playbackIndex--;
            } else {
                state.playbackIndex = state.songs.length - 1;
            }
            state.playbackSong = state.songs[state.playbackIndex];
            if (state.playbackSong.song) {
                audio.src = state.playbackSong.song;
                audio.currentTime = 0;
                audio.play();
            } else {
                store.commit('SET_PREW');
            }
        },
        SET_IS_ADMIN(state:State, payload: boolean) {
            state.isAdmin = payload;
        }
    },
    actions: {
        async getList({ commit }, params) {
            if (store.state.activeSong) {
                commit('SET_ACTIVE', null);
            }
            await axios.get('/songs/', {
                    params: params
                })
                .then(({data}) => {
                    commit('SET_SONGS', data.items);
                })
                .catch(function (error) {
                    console.log(error);
                })
        },
        async delete({ commit, state }, id : number) {
            await axios.get('/song/delete/', {
                    params: {
                        id: id
                    }
                })
                .then(() => {
                    const songs = state.songs.filter((elem) => {
                        return elem.id !== id
                    });
                    commit('SET_SONGS', songs);
                })
                .catch(function (error) {
                    console.log(error);
                })
        },
        
        async setListening({ commit, state }, id: number) {
            await axios.get(`/songListening/${id}`)
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        async sendForm({ commit, state }, payload: {formData : FormData}) {
            await axios.post(`/site/contact/`, payload.formData, {
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

audio.addEventListener('playing', () => {
    store.state.isPlaying = true;
});

audio.addEventListener('pause', () => {
    store.state.isPlaying = false;
});

audio.addEventListener('ended', () => {
    store.state.isPlaying = false;
});

audio.addEventListener('timeupdate', () => {
    if (audio) {
        store.state.duration = audio.duration;
        store.state.timer = secondsToMinutes(audio.currentTime);
        if (store.state.isPlaying && store.state.playbackSong) {
            store.state.progress = Math.round((audio.currentTime * 100) / store.state.duration);
            document.title = `${store.state.timer} - ${store.state.playbackSong.name}`;
        }
    }
});

audio.addEventListener("ended", function(){
    store.commit('SET_NEXT');
});

function secondsToMinutes(seconds: number) {
    const minutes = Math.round(seconds / 60);
    const remainderSeconds = Math.round(seconds % 60);
    const formattedMinutes = `${minutes.toString().padStart(3, '0').slice(-2)}`;
    const formattedSeconds = `${remainderSeconds.toString().padStart(3, '0').slice(-2)}`;
    return `${formattedMinutes}:${formattedSeconds}`;
}

export default store;