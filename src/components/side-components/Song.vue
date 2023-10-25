<template>
    <div
        class="song-one-playback"
        @click="openSong"
    >
        <div
            v-if="song.cover && !song.clip"
            class="song-one-cover"
        >
            <img
                :src="song.cover"
                alt=""
            >
        </div>
        <div
            v-if="song.clip"
            class="song-one-cover"
        >
            <img
                :src="`https://img.youtube.com/vi/${getClipID(song.clip)}/0.jpg`"
                alt=""
            >
        </div>
        <div class="song-one-right">
            <div
                class="song-one__title"
            >
                {{ song.name }}
            </div>
            <div
                v-if="song.composer"
                class="song-one__composer"
            >
                <b>Музыка: </b>{{ song.composer }}
            </div>
            <div
                v-if="song.author"
                class="song-one__author"
            >
                <b>Слова: </b>{{ song.author }}
            </div>
            <div
                v-if="song.singer"
                class="song-one__singer"
            >
                <b>Исполняет: </b>{{ song.singer }}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ISong } from '@/store/types';

export default defineComponent({
    name: 'SongInfo',
    components: {
    },
    props: {
        song: {
            type: Object as () => ISong,
            required: true,
        },
    },
    methods: {
        dateFormat(dateCreate: number) {
            const date = new Date(dateCreate * 1000);
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear();
            return `${day}.${month}.${year}`;
        },
        getClipID(url: string) {
            const regex = /v=([a-zA-Z0-9_-]{11})/;
            const match = url.match(regex);
            if (match) {
                return match[1];
            }
            return null;
        },
        openSong() {
            this.$router.push({
                name: 'song',
                params: { id: this.song.id },
            });
        },
    },
});
</script>

<style lang="less">
.song-one-playback {
    display: flex;
    padding: 10px;
    height: 80px;
    overflow: hidden;
    position: relative;
    background: #F5F5F5;
    cursor: pointer;

    .song-one-cover {
        width: 60px;
        height: 60px;
    }

    .song-one-right {
        width: calc(100% - 80px);
    }
}
</style>
