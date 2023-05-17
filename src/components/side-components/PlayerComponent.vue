<template>
    <div>
        <Song v-if="playbackSong" :song="playbackSong" />
        <div class="progress" ref="container" @click="moveTo">
            <div class="progress-line" :style="{ width: progress + '%' }"></div>
        </div>
        <div class="control">
            <div class="control-left">
                <button class="control-backward" @click="backward"></button>
                <button class="control-play" @click="play" v-if="!isPlaying"></button>
                <button class="control-pause" @click="pause" v-if="isPlaying"></button>
                <button class="control-forward" @click="forward"></button>
            </div>
            <div class="progress-timer">
                {{ timer }}
            </div>
            <div class="control-right">
                <!-- <button
                    :class="['control-shuffle', shuffled ? 'active' : '']"
                    @click="shuffle"
                >
                </button>
                <button
                    :class="['control-repeat', repeated ? 'active' : '']"
                    @click="repeat"
                >
                </button> -->
                <button
                    :class="['control-mute', muted ? 'active' : '']"
                    @click="mute"
                >
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapMutations, mapState } from 'vuex';
import Song from './Song.vue'

export default defineComponent({
    components: {
        Song,
    },
    data() {
        return {
            shuffled: false,
            repeated: false,
        };
    },
    computed: {
        ...mapState(['playbackSong', 'playbackIndex', 'songs', 'isPlaying', 'muted', 'duration', 'timer', 'progress']),
    },
    methods: {
        ...mapMutations(['SET_NEXT', 'SET_PREW', 'SET_PLAY', 'SET_PAUSE', 'MOVE_TO', 'MUTE']),
        play() {
            this.SET_PLAY(0);
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
</style>
