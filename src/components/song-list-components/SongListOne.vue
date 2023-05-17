<template>
    <div class="song-one">
        <div
            class="song-one-pause"
            v-if="playbackSong && playbackSong.id == song.id && isPlaying"
            @click="pause"
        ></div>
        <div class="song-one-play" @click="play" v-else></div>
        <div class="song-one-cover" v-if="song.cover">
            <img :src="song.cover" alt="">
        </div>
        <div class="song-one-cover" v-if="clipId">
            <img :src="`https://img.youtube.com/vi/${clipId}/0.jpg`" alt="">
        </div>
        <div class="song-one-right">
            <div class="song-one__title" @click="SET_ACTIVE(song)">{{ song.name }}</div>
            <div class="song-one__date">{{ dateFormat }}</div>
            <div class="song-one__composer" v-if="song.composer">
                <b>Музыка: </b>{{ song.composer }}
            </div>
            <div class="song-one__author" v-if="song.author">
                <b>Слова: </b>{{ song.author }}
            </div>
            <div class="song-one__singer" v-if="song.singer">
                <b>Исполняет: </b>{{ song.singer }}
            </div>
        </div>
        <div class="song-one-edit" @click="setShowPanel(true)">
            <EditPanel
                v-if="showPanel"
                :setShowPanel="setShowPanel"
                :showPanel="showPanel"
                :song="song"
            />
        </div>
    </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import { ISong } from '@/store';
import { mapMutations, mapState } from 'vuex';
import EditPanel from './EditPanel.vue'

export default defineComponent({
    name: 'SongListOne',
    components: {
        EditPanel,
    },
    props: {
        song: {
            type: Object as () => ISong,
            required: true,
        },
    },
    data() {
        return {
            showPanel: false,
        }
    },
    computed: {
        ...mapState(['isAdmin', 'playbackSong', 'isPlaying', 'songs']),
        dateFormat() : string {
            const date = new Date(this.song.date_create * 1000);
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear();

            return `${day}.${month}.${year}`;
        },
        clipId() {
            if (this.song.clip) {
                const regex = /v=([a-zA-Z0-9_-]{11})/;
                const match = this.song.clip.match(regex);
                if (match) {
                    return match[1];
                }
            }
            return null;
        },
    },
    methods: {
        ...mapMutations(['SET_ACTIVE', 'SET_PLAY', 'SET_PAUSE']),
        setShowPanel(show: boolean) {
            this.showPanel = show;
        },
        pause() {
            this.SET_PAUSE();
        },
        play() {
            const index = this.songs.findIndex((el: ISong) => el.id === this.song.id);
            this.SET_PLAY(index);
        },
    },
});
</script>

<style lang="less">
.song-one {
    display: flex;
    margin: 15px;
    width: calc(50% - 30px);
    position: relative;
}

.song-one-cover {
    width: 75px;
    height: 75px;
    margin-right: 15px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;

    img {
        height: 100%;
    }
}

.song-one-right {
    width: calc(100% - 140px);
}

.song-one__title {
    font-size: 18px;
    font-weight: 700;
    text-decoration: underline;
    margin-bottom: 5px;
    cursor: pointer;
}

.song-one__date {
    font-size: 12px;
    margin-bottom: 5px;
}

.song-one__composer {
    color: #707070;
    font-size: 14px;
}

.song-one__author {
    color: #707070;
    font-size: 14px;
}

.song-one__singer {
    color: #707070;
    font-size: 14px;
}

.song-one-edit {
    width: 50px;
    background: url('/src/assets/edit.svg') no-repeat 50%;
    cursor: pointer;
    position: relative;
}

.song-one-pause {
    position: absolute;
    background: #0F87DE;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    top: 25px;
    left: 25px;
    &::before {
        content: "";
        background: url('/src/assets/pause.png') no-repeat 55% 50%;
        background-size: 8px;
        width: 100%;
        height: 100%;
        display: block;
    }
}

.song-one-play {
    position: absolute;
    background: #0F87DE;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    top: 25px;
    left: 25px;
    &::before {
        content: "";
        background: url('/src/assets/play.png') no-repeat 65% 50%;
        background-size: 10px;
        width: 100%;
        height: 100%;
        display: block;
    }
}
</style>
