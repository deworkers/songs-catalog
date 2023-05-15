import { createStore } from 'vuex';
import axios from 'axios';

const data = {
    items: [
        {
            id: '1',
            name: 'Сумасшедший февраль',
            song: 'https://www.avtoall.ru/upload/iblock/7d2/FEVRAL-DUET-MIX-04.mp3',
            composer: 'Рустам Неврединов',
            author: 'Валерий Парфёнов и Олеся Борисова',
            singer: 'Валерий Парфёнов и Олеся Борисова.',
            clip: null,
            cover: 'https://bigpicture.ru/wp-content/uploads/2021/12/bigpicture_ru_music-people-girl-sunshine-scaled.jpg',
            description: null,
            date_create: 1674241200000,
            date_modify: 1674241200000,
            listeningCnt: 0,
            originalId: null,
        },
        {
            id: '2',
            name: 'Орёл и Орлица',
            song: 'https://www.avtoall.ru/upload/iblock/368/SUDBI-DUET-MIX-01.mp3',
            composer: 'Рустам Неврединов',
            author: 'Валерий Парфёнов и Олеся Борисова',
            singer: 'Валерий Парфёнов и Олеся Борисова.',
            clip: '0XiLHYrmAbc',
            cover: null,
            description: null,
            date_create: 1642878000000,
            date_modify: 1642878000000,
            listeningCnt: 0,
            originalId: null,
        },
        {
            id: '3',
            name: 'Белые голуби',
            song: 'https://www.avtoall.ru/upload/iblock/438/MARSEL-DUET-MIX-03.mp3',
            composer: 'Рустам Неврединов',
            author: 'Валерий Парфёнов и Олеся Борисова',
            singer: 'Валерий Парфёнов и Олеся Борисова.',
            clip: null,
            cover: 'https://bigpicture.ru/wp-content/uploads/2021/12/bigpicture_ru_music-people-girl-sunshine-scaled.jpg',
            description: null,
            date_create: 1648321200000,
            date_modify: 1648321200000,
            listeningCnt: 0,
            originalId: null,
        },
    ],
    pages: 1,
}

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

export default createStore({
    state():State {
        return {
            songs: data.items,
            isAdmin: false,
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
