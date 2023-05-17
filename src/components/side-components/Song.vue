<template>
    <div class="song-one-playback">
        <div class="song-one-cover" v-if="song.cover">
            <img :src="song.cover" alt="">
        </div>
        <div class="song-one-cover" v-if="song.clip">
            <img :src="`https://img.youtube.com/vi/${getClipID(song.clip)}/0.jpg`" alt="">
        </div>
        <div class="song-one-right">
            <div
                class="song-one__title"
            >
                {{ song.name }}
            </div>
            <div class="song-one__date">{{ dateFormat(song.date_create) }}</div>
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
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ISong } from '@/store';

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
    },
});
</script>

<style lang="less">
.song-one-playback {
    display: flex;
    padding: 15px;
    height: 105px;
    overflow: hidden;
    position: relative;
    background: #F5F5F5;

    .song-one-right {
        width: calc(100% - 90px);
    }

    &::before {
        content: "";
        height: 15px;
        background: linear-gradient(to bottom, transparent, #F5F5F5);
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
    }
}
</style>
