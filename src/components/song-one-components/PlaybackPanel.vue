<template>
    <div class="playback">
        <button
            :class="['playback-pause', scrollTop > 290 ? 'fixed' : '',]"
            @click="pause"
            v-if="isPlaying && activeSong.id === playbackSong.id">
        </button>
        <button
            :class="['playback-play', scrollTop > 290 ? 'fixed' : '',]"
            @click="play"
            v-else
            :disabled="!activeSong.song">
        </button>
        <h2 class="playback-title">Слушать</h2>
        <ShowClip
            v-if="showClip"
            :clip="activeSong.clip"
            :hideClip="hideClip"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapMutations, mapState } from 'vuex';
import { RouteLocationRaw } from 'vue-router';
import * as amplitude from '@amplitude/analytics-browser';
import { ISong } from '@/store/types';
import ShowClip from './ShowClip.vue';

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
        ShowClip,
    },
    props: {
        scrollTop: {
            type: Number,
            default: 0,
        },
    },
    data() {
        return {
            showClip: false,
        }
    },
    computed: {
        ...mapState(['isAdmin', 'playbackSong', 'isPlaying', 'songs', 'activeSong']),
    },
    methods: {
        ...mapMutations(['SET_ACTIVE', 'SET_PLAY', 'SET_PAUSE']),
        ...mapActions(['getSong']),
        backward() {
            const id = switchObject(this.songs, this.activeSong.id, 'prev');
            this.getSong(id).then(() => {
                this.$router.push({
                    name: 'song', params: { id },
                } as RouteLocationRaw)
            });
        },
        forward() {
            const id = switchObject(this.songs, this.activeSong.id, 'next');
            this.getSong(id).then(() => {
                this.$router.push({
                    name: 'song', params: { id },
                } as RouteLocationRaw)
            });
        },
        play() {
            if (!this.activeSong.clip) {
                const index = this.songs.findIndex((el: ISong) => el.id === this.activeSong.id);
                this.SET_PLAY(index, 'song_card');
            } else {
                this.showClipHandler();
                amplitude.track('Show clip', {
                    source: 'song_card',
                    songName: this.activeSong.name,
                });
            }
        },
        pause() {
            this.SET_PAUSE();
        },
        showClipHandler() {
            this.showClip = true;
            this.SET_PAUSE();
        },
        hideClip(event:Event) {
            const element = event.target as HTMLElement;
            if (element.classList.contains('add-song-form') || element.classList.contains('close-popup')) {
                this.showClip = false;
            }
        },
    },
});
</script>

<style lang="less">
.playback {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    padding: 30px 0px;
    border-radius: 8px;
    margin-top: 25px;
}

.playback-title {
    width: 100%;
    text-align: center;
    padding-top: 10px;
    font-size: 14px;
}

.playback-play {
    position: relative;
    width: 65px;
    height: 65px;
    cursor: pointer;
    margin: 0 10px;
    border-radius: 50%;
    background: #D0E1E3;
    transition: all 0.3;
    &::before {
        content: '';
        width: 25px;
        height: 25px;
        background: url('/src/assets/play-black.png') no-repeat;
        background-size: contain;
        display: block;
        position: absolute;
        top: 21px;
        left: 27px;
    }
    transition: opacity 0.1s ease-in;
    &:hover {
        opacity: 0.7;
    }
    &:disabled {
        opacity: 0.2;
        cursor: default;
    }
}

.playback-pause {
    position: relative;
    width: 65px;
    height: 65px;
    cursor: pointer;
    margin: 0 10px;
    border-radius: 50%;
    background: #D0E1E3;
    transition: all 0.3;
    &::before {
        content: '';
        width: 20px;
        height: 20px;
        background: url('/src/assets/pause-black.png') no-repeat;
        background-size: contain;
        display: block;
        position: absolute;
        top: 23px;
        left: 26px;
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
