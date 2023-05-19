<template>
    <div class="playback" v-if="activeSong.song">
        <button class="playback-backward" @click="backward"></button>
        <button
            class="playback-pause"
            @click="pause"
            v-if="isPlaying && activeSong.id === playbackSong.id"
        ></button>
        <button class="playback-play" @click="play" v-else></button>
        <button class="playback-forward" @click="forward"></button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapMutations, mapState } from 'vuex';
import { RouteLocationRaw } from 'vue-router';
import { ISong } from '@/store';

function switchObject(objectArray: ISong[], currentObjectId: number, direction: 'next' | 'prev') : number | void {
    const currentIndex = objectArray.findIndex((obj) => obj.id === currentObjectId);
    let switchedIndex = -1;

    if (direction === 'next') {
        switchedIndex = currentIndex + 1;
        if (switchedIndex >= objectArray.length) switchedIndex = 0;
    } else if (direction === 'prev') {
        switchedIndex = currentIndex - 1;
        if (switchedIndex < 0) switchedIndex = objectArray.length - 1;
    }

    const switchedObject = objectArray[switchedIndex];
    return switchedObject.id;
}

export default defineComponent({
    name: 'PlaybackPanel',
    components: {
    },
    computed: {
        ...mapState(['isAdmin', 'playbackSong', 'isPlaying', 'songs', 'activeSong']),
    },
    methods: {
        ...mapMutations(['SET_ACTIVE', 'SET_PLAY', 'SET_PAUSE']),
        backward() {
            const id = switchObject(this.songs, this.activeSong.id, 'prev');
            const song = this.songs.find((el: ISong) => el.id === id);
            this.SET_ACTIVE(song);
            this.$router.push({
                name: 'song', params: { id },
            } as RouteLocationRaw)
        },
        forward() {
            const id = switchObject(this.songs, this.activeSong.id, 'next');
            const song = this.songs.find((el: ISong) => el.id === id);
            this.SET_ACTIVE(song);
            this.$router.push({
                name: 'song', params: { id },
            } as RouteLocationRaw)
        },
        play() {
            const index = this.songs.findIndex((el: ISong) => el.id === this.activeSong.id);
            this.SET_PLAY(index);
        },
        pause() {
            this.SET_PAUSE();
        },
    },
});
</script>

<style lang="less">
.playback {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 50px 0px;
}

.playback-play {
    position: relative;
    width: 50px;
    height: 50px;
    cursor: pointer;
    margin: 0 10px;
    &::before {
        content: '';
        width: 40px;
        height: 49px;
        background: url('/src/assets/play-black.png') no-repeat;
        background-size: contain;
        display: block;
        position: absolute;
        top: 1px;
        left: 8px;
    }
    transition: opacity 0.1s ease-in;
    &:hover {
        opacity: 0.7;
    }
}

.playback-pause {
    position: relative;
    width: 50px;
    height: 50px;
    cursor: pointer;
    margin: 0 10px;
    &::before {
        content: '';
        width: 28px;
        height: 34px;
        background: url('/src/assets/pause-black.png') no-repeat;
        background-size: contain;
        display: block;
        position: absolute;
        top: 8px;
        left: 10px;
    }
    transition: opacity 0.1s ease-in;
    &:hover {
        opacity: 0.7;
    }
}

.playback-backward {
    position: relative;
    width: 50px;
    height: 50px;
    cursor: pointer;
    &::before {
        content: '';
        width: 44px;
        height: 35px;
        background: url('/src/assets/backward-black.png') no-repeat;
        background-size: contain;
        display: block;
        position: absolute;
        top: 8px;
        left: 6px;
    }
    transition: opacity 0.1s ease-in;
    &:hover {
        opacity: 0.7;
    }
    &:active {
        &::before {
            width: 43px;
            height: 35px;
            top: 8px;
            left: 6px;
        }
    }
}

.playback-forward {
    position: relative;
    width: 50px;
    height: 50px;
    cursor: pointer;
    &::before {
        content: '';
        width: 44px;
        height: 35px;
        background: url('/src/assets/forward-black.png') no-repeat;
        background-size: contain;
        display: block;
        position: absolute;
        top: 8px;
        left: 6px;
    }
    transition: opacity 0.1s ease-in;
    &:hover {
        opacity: 0.7;
    }
    &:active {
        &::before {
            width: 43px;
            height: 35px;
            top: 8px;
            left: 6px;
        }
    }
}
</style>
