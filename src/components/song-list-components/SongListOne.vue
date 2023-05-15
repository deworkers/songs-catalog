<template>
    <div class="song-one">
        <div class="song-one-cover" v-if="song.cover">
            <img :src="song.cover" alt="">
        </div>
        <div class="song-one-cover" v-if="song.clip">
            <img :src="`https://img.youtube.com/vi/${song.clip}/0.jpg`" alt="">
        </div>
        <div class="song-one-right">
            <div class="song-one__title" @click="SET_ACTIVE(song)">{{ song.name }}</div>
            <div class="song-one__date">{{ song.date_create }}</div>
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
import { mapMutations } from 'vuex';

export default defineComponent({
    name: 'SongListOne',
    components: {
    },
    props: {
        song: {
            type: Object as () => ISong,
            required: true,
        },
    },
    methods: {
        ...mapMutations(['SET_ACTIVE']),
    },
});
</script>

<style lang="less">
.song-one {
    display: flex;
    margin: 15px;
    width: calc(50% - 30px);
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
    width: calc(100% - 90px);
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
</style>
