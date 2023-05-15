<template>
    <div>
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
                <button
                    :class="['control-shuffle', shuffled ? 'active' : '']"
                    @click="shuffle"
                >
                </button>
                <button
                    :class="['control-repeat', repeated ? 'active' : '']"
                    @click="repeat"
                >
                </button>
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

export default defineComponent({
    data() {
        return {
            audio: null as HTMLAudioElement | null,
            isPlaying: false,
            timer: '00:00',
            timerInterval: null,
            muted: false,
            shuffled: false,
            repeated: false,
            duration: 0,
            progress: 0,
        };
    },
    mounted() {
        this.audio = new Audio();
        this.audio.addEventListener('playing', () => {
            this.isPlaying = true;
        });

        this.audio.addEventListener('pause', () => {
            this.isPlaying = false;
        });

        this.audio.addEventListener('ended', () => {
            this.isPlaying = false;
        });

        this.audio.addEventListener('timeupdate', () => {
            if (this.audio) {
                this.duration = this.audio.duration;
                this.timer = this.secondsToMinutes(this.audio.currentTime);
                this.progress = Math.round((this.audio.currentTime * 100) / this.duration);
            }
        });
    },
    computed: {
        ...mapState(['playbackSong', 'playbackIndex', 'songs']),
    },
    methods: {
        ...mapMutations(['SET_PLAYBACK', 'SET_NEXT', 'SET_PREW']),
        start() {
            if (this.audio) {
                this.audio.src = this.playbackSong.song;
                this.audio.currentTime = 0;
                this.audio.play();
            }
        },
        play() {
            if (this.audio && this.audio.src) {
                this.audio.play();
            } else {
                this.SET_PLAYBACK(0);
                this.start();
            }
        },
        pause() {
            if (this.audio) {
                this.audio.pause();
            }
        },
        moveTo(event: MouseEvent) {
            if (this.audio) {
                const container: HTMLElement = this.$refs.container as HTMLElement;
                const containerWidth = container.clientWidth;
                const clickPosition = event.clientX - container.getBoundingClientRect().left;
                const clickPositionPercentage = (clickPosition / containerWidth) * 100;
                this.audio.currentTime = (clickPositionPercentage / 100) * this.duration;
            }
        },
        mute() {
            if (this.audio) {
                if (!this.muted) {
                    this.audio.muted = true;
                } else {
                    this.audio.muted = false;
                }
                this.muted = !this.muted;
            }
        },
        secondsToMinutes(seconds: number) {
            const minutes = Math.round(seconds / 60);
            const remainderSeconds = Math.round(seconds % 60);
            const formattedMinutes = `${minutes.toString().padStart(3, '0').slice(-2)}`;
            const formattedSeconds = `${remainderSeconds.toString().padStart(3, '0').slice(-2)}`;
            return `${formattedMinutes}:${formattedSeconds}`;
        },
        backward() {
            this.SET_PREW();
            this.start();
        },
        forward() {
            this.SET_NEXT();
            this.start();
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
