<template>
    <div
        :class="[
            'song-one', isCover ? 'song-one--cover' : '',
            activeSong && activeSong.id === song.id ? 'active' : ''
        ]"
    >
        <div v-if="!song.clip && (isGroupSong || song.originalId)">
            <div
                v-if="playbackSong && playbackSong.id == song.id && isPlaying"
                class="song-one-pause"
                @click="pause"
            />
            <div
                v-else
                class="song-one-play"
                @click="play"
            />
        </div>
        <div
            v-if="song.cover_small && !song.clip"
            class="song-one-cover"
            @click="openSong"
        >
            <img
                :src="song.cover_small"
                alt=""
            >
        </div>
        <div
            v-if="song.clip"
            class="song-one-cover"
            @click="openSong"
        >
            <div
                v-if="song.originalId || isGroupSong"
                class="song-one-video"
                @click="showClipHandler"
            />
            <img
                :src="`https://img.youtube.com/vi/${clipId}/0.jpg`"
                alt=""
            >
            <ShowClip
                v-if="showClip"
                :clip="song.clip"
                :hide-clip="hideClip"
            />
        </div>
        <div class="song-one-right">
            <router-link
                v-if="!song.originalId && !isGroupSong"
                class="song-one__title"
                :to="{ name: 'song', params: { id: song.id }}"
            >
                {{ song.name }}
            </router-link>
            <div
                v-else
                class="song-one__title"
            >
                {{ song.name }}
            </div>
            <div class="song-one__date">
                {{ dateFormat }}
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
        <div
            v-if="isAdmin"
            class="song-one-edit"
            @click="setShowPanel(true)"
        >
            <EditPanel
                v-if="showPanel"
                :set-show-panel="setShowPanel"
                :show-panel="showPanel"
                :song="song"
            />
        </div>
    </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import { ISong } from '@/store/types';
import { mapMutations, mapState } from 'vuex';
import EditPanel from './EditPanel.vue';
import ShowClip from '../song-one-components/ShowClip.vue';

export default defineComponent({
    name: 'SongListOne',
    components: {
        EditPanel,
        ShowClip,
    },
    props: {
        song: {
            type: Object as () => ISong,
            required: true,
        },
        isCover: {
            type: Boolean,
            default: false,
        },
        isGroupSong: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            showPanel: false,
            showClip: false,
        };
    },
    computed: {
        ...mapState(['isAdmin', 'playbackSong', 'isPlaying', 'playList', 'activeSong']),
        dateFormat() : string {
            const date = new Date(this.song.date_modify * 1000);
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
        ...mapMutations(['SET_PLAY', 'SET_PAUSE', 'SET_PLAY_COVER']),
        setShowPanel(show: boolean) {
            this.showPanel = show;
        },
        pause() {
            this.SET_PAUSE();
        },
        play() {
            const index = this.playList.findIndex((el: ISong) => el.id === this.song.id);
            if (index > -1) {
                this.SET_PLAY(index, 'list');
            } else {
                this.SET_PLAY_COVER({
                    sondg: this.song,
                    source: 'list',
                });
            }
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
        openSong() {
            if (!this.song.originalId && !this.isGroupSong) {
                this.$router.push({
                    name: 'song',
                    params: { id: this.song.id },
                });
            }
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

    &--cover {
        width: 100%;
        margin: 15px 0;
    }

    &.active {
        background: #ddd;

        .song-one-edit {
            background: url('/src/assets/edit-active.svg') no-repeat 50%;
        }
    }
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
    cursor: pointer;

    img {
        height: 100%;
    }
}

.song-one-video {
    position: absolute;
    background: #0F87DE;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    top: 25px;
    left: 25px;
    cursor: pointer;
    &::before {
        content: "";
        background: url('/src/assets/has-video-white.png') no-repeat 55% 50%;
        background-size: 16px;
        width: 100%;
        height: 100%;
        display: block;
    }
}

.song-one-right {
    width: calc(100% - 140px);
}

.song-one__title {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 5px;
}

a.song-one__title {
    display: block;
    text-decoration: underline !important;
    margin-bottom: 5px;
    color: #000;
    cursor: pointer;
}

.song-one__date {
    font-size: 14px;
    margin-bottom: 5px;
}

.song-one__listening {
    font-size: 15px;
    margin-bottom: 5px;
}

.song-one__composer {
    color: #707070;
    font-size: 15px;
}

.song-one__author {
    color: #707070;
    font-size: 15px;
}

.song-one__singer {
    color: #707070;
    font-size: 15px;
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
    cursor: pointer;
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
    cursor: pointer;
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
