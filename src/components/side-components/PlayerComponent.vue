<template>
    <div class="player">
        <div
            ref="container"
            class="progress"
            @click="moveTo"
        >
            <div
                class="progress-line"
                :style="{ width: progress + '%' }"
            />
        </div>
        <div class="control">
            <div class="control-left">
                <button
                    class="control-backward"
                    @click="backward"
                />
                <button
                    v-if="!isPlaying"
                    class="control-play"
                    @click="play"
                />
                <button
                    v-if="isPlaying"
                    class="control-pause"
                    @click="pause"
                />
                <button
                    class="control-forward"
                    @click="forward"
                />
            </div>
            <div class="progress-timer">
                {{ timer }}
            </div>
            <div class="control-right">
                <button
                    :class="['control-mute', muted ? 'active' : '']"
                    @click="mute"
                />
            </div>
            <input
                v-show="!isSafari"
                v-model="localVolume"
                type="range"
                step="0.05"
                min="0"
                max="1"
                name="volume"
            >
        </div>
        <Song
            v-if="playbackSong"
            :song="playbackSong"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapMutations, mapState } from 'vuex';
import Song from './Song.vue';

export default defineComponent({
    components: {
        Song,
    },
    data() {
        return {
            shuffled: false,
            repeated: false,
            localVolume: 0.5,
        };
    },
    computed: {
        ...mapState(['playbackSong', 'playbackIndex', 'songs', 'isPlaying', 'muted', 'duration', 'timer', 'progress', 'volume']),
        isSafari() {
            return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        },
    },
    watch: {
        localVolume() {
            this.SET_VOLUME(this.localVolume);
        },
    },
    mounted() {
        this.localVolume = this.volume;
    },
    methods: {
        ...mapMutations(['SET_NEXT', 'SET_PREW', 'SET_PLAY', 'SET_PAUSE', 'MOVE_TO', 'MUTE', 'SET_VOLUME']),
        play() {
            this.SET_PLAY(this.playbackSong ? this.playbackIndex : 0, 'player');
        },
        pause() {
            this.SET_PAUSE();
        },
        moveTo(event: MouseEvent) {
            if (this.isPlaying) {
                const container: HTMLElement = this.$refs.container as HTMLElement;
                const containerWidth = container.clientWidth;
                const clickPosition = event.clientX - container.getBoundingClientRect().left;
                const clickPositionPercentage = (clickPosition / containerWidth) * 100;
                const currentTime = (clickPositionPercentage / 100) * this.duration;
                this.MOVE_TO(currentTime);
            }
        },
        mute() {
            this.MUTE();
        },
        backward() {
            this.SET_PREW();
        },
        forward() {
            this.SET_NEXT();
        },
        shuffle() {
            this.shuffled = !this.shuffled;
            console.log('shuffle');
        },
        repeat() {
            this.repeated = !this.repeated;
            console.log('repeat');
        },
    },
});
</script>

<style lang="less">
.player {
    display: flex;
    flex-wrap: wrap;
    background: #F5F5F5;

    .song-one__title {
        font-size: 16px;
    }

    .song-one__composer,
    .song-one__author,
    .song-one__singer {
        font-size: 12px;
    }

    .song-one-playback {
        padding: 8px;
    }
}

.player-left {
    width: 30%;
}

.song-one-playback {
    width: 70%;
}

.progress {
    width: 100%;
    height: 10px;
    background: #d0e1e3;
}

.progress-line {
    height: 10px;
    background: #0f87de;
}

.progress-timer {
    color: #fff;
    font-size: 20px;
    font-weight: 300;
}

.control {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    background: #394546;
    width: 30%;
    height: 80px;
}

.control-play {
    position: relative;
    width: 30px;
    height: 30px;
    cursor: pointer;
    &::before {
        content: '';
        width: 22.5px;
        height: 27px;
        background: url('/src/assets/play.png') no-repeat;
        background-size: contain;
        display: block;
        position: absolute;
        top: 1px;
        left: 4px;
    }
}

.control-pause {
    position: relative;
    width: 30px;
    height: 30px;
    cursor: pointer;
    &::before {
        content: '';
        width: 16px;
        height: 20px;
        background: url('/src/assets/pause.png') no-repeat;
        background-size: contain;
        display: block;
        position: absolute;
        top: 5px;
        left: 7px;
    }
}

.control-backward {
    position: relative;
    width: 30px;
    height: 30px;
    cursor: pointer;
    &::before {
        content: '';
        width: 25px;
        height: 25px;
        background: url('/src/assets/backward.png') no-repeat;
        background-size: contain;
        display: block;
        position: absolute;
        top: 4px;
        left: 4px;
    }
    &:active {
        &::before {
            width: 23px;
            height: 23px;
            top: 5px;
            left: 5px;
        }
    }
}

.control-forward {
    position: relative;
    width: 30px;
    height: 30px;
    cursor: pointer;
    &::before {
        content: '';
        width: 25px;
        height: 25px;
        background: url('/src/assets/forward.png') no-repeat;
        background-size: contain;
        display: block;
        position: absolute;
        top: 4px;
        left: 4px;
    }
    &:active {
        &::before {
            width: 23px;
            height: 23px;
            top: 5px;
            left: 5px;
        }
    }
}

.control-mute {
    position: relative;
    width: 30px;
    height: 30px;
    cursor: pointer;
    &::before {
        content: '';
        width: 25px;
        height: 25px;
        background: url('/src/assets/mute.png') no-repeat;
        background-size: contain;
        display: block;
        position: absolute;
        top: 4px;
        left: 4px;
    }

    &.active {
        &::before {
            background: url('/src/assets/mute-active.png') no-repeat;
            background-size: contain;
        }
    }
}

.control-shuffle {
    position: relative;
    width: 30px;
    height: 30px;
    cursor: pointer;
    &::before {
        content: '';
        width: 25px;
        height: 25px;
        background: url('/src/assets/shuffle.png') no-repeat;
        background-size: contain;
        display: block;
        position: absolute;
        top: 4px;
        left: 4px;
    }

    &.active {
        &::before {
            background: url('/src/assets/shuffle-active.png') no-repeat;
            background-size: contain;
        }
    }
}

.control-repeat {
    position: relative;
    width: 30px;
    height: 30px;
    cursor: pointer;
    &::before {
        content: '';
        width: 24px;
        height: 24px;
        background: url('/src/assets/repeat.png') no-repeat;
        background-size: contain;
        display: block;
        position: absolute;
        top: 4px;
        left: 4px;
    }

    &.active {
        &::before {
            background: url('/src/assets/repeat-active.png') no-repeat;
            background-size: contain;
        }
    }
}

input[type=range] {
  -webkit-appearance: none;
}
input[type=range]:focus {
  outline: none;
}
input[type=range]::-webkit-slider-runnable-track {
  width: 100%;
  height: 8px;
  cursor: pointer;
  box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
  background: #fff;
  border-radius: 25px;
  border: 0px solid #000101;
}
input[type=range]::-webkit-slider-thumb {
  box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
  border: 0px solid #000000;
  height: 16px;
  width: 16px;
  border-radius: 8px;
  background: #0f87de;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -3.6px;
}
input[type=range]:hover::-webkit-slider-runnable-track {
  background: #ddd;
}
input[type=range]::-moz-range-track {
  width: 100%;
  height: 12.8px;
  cursor: pointer;
  animate: 0.2s;
  box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
  background: #fff;
  border-radius: 25px;
  border: 0px solid #000101;
}
input[type=range]::-moz-range-thumb {
  box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
  border: 0px solid #000000;
  height: 20px;
  width: 39px;
  border-radius: 7px;
  background: #0f87de;
  cursor: pointer;
}
input[type=range]::-ms-track {
  width: 100%;
  height: 12.8px;
  cursor: pointer;
  animate: 0.2s;
  background: transparent;
  border-color: transparent;
  border-width: 39px 0;
  color: transparent;
}
input[type=range]::-ms-fill-lower {
  background: #0f87de;
  border: 0px solid #000101;
  border-radius: 50px;
  box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
}
input[type=range]::-ms-fill-upper {
  background: #fff;
  border: 0px solid #000101;
  border-radius: 50px;
  box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
}
input[type=range]::-ms-thumb {
  box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
  border: 0px solid #000000;
  height: 20px;
  width: 39px;
  border-radius: 7px;
  background: #65001c;
  cursor: pointer;
}
input[type=range]:hover::-ms-fill-lower {
  background: #ddd;
}
input[type=range]:hover::-ms-fill-upper {
  background: #ddd;
}
</style>
