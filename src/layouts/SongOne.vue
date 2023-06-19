<template>
    <div class="song-details">
        <router-link
            class="song-details-back"
            :to="{ name: 'list' }">
            К списку песен
        </router-link>
        <div class="song-details-body">
            <div class="song-details-top">
                <div class="request-block">
                    <button
                        class="request-button"
                        @click="showForm = true"
                    >
                        Запрос прав для трансляции
                    </button>
                    <RequestForm :hideRequestForm="hideRequestForm" v-if="showForm" />
                </div>
                <div class="request-block" v-if="isAdmin">
                    <button
                        class="request-button"
                        @click="showAddCover = true"
                    >
                        Добавить другую версию песни
                    </button>
                    <AddSongForm
                        v-if="showAddCover"
                        :originalId="activeSong.id"
                        :setShowForm="setShowAddCover"
                    />
                </div>
            </div>
            <div class="song-details-title">
                {{ activeSong.name }}
            </div>
            <div class="song-details-grid">
                <div class="song-details-left">
                    <div class="song-details-cover" v-if="activeSong.cover && !activeSong.clip">
                        <img :src="activeSong.cover" alt="">
                    </div>
                    <div class="song-details-clip" v-if="activeSong.clip" @click="showClipHandler">
                        <img :src="`https://img.youtube.com/vi/${getClipID(activeSong.clip)}/0.jpg`" alt="">
                    </div>
                    <ShowClip
                        v-if="showClip"
                        :clip="activeSong.clip"
                        :hideClip="hideClip"
                    />
                </div>
                <div class="cover-list" v-if="activeSong.covers">
                    <h2>Эта песня в другом исполнении:</h2>
                    <SongListOne
                        v-for="song in activeSong.covers"
                        :key="song.id"
                        :song="song"
                        :isCover="true"
                    />
                </div>
                <div class="song-details-right">
                    <PlaybackPanel />
                    <div
                        class="song-one__date"
                        v-if="activeSong">
                        <b>Добавлено:</b> {{ dateFormat(activeSong.date_modify) }}
                    </div>
                    <div class="song-one__date">
                        <b>Прослушиваний:</b> {{ activeSong.listeningCnt }}
                    </div>
                    <div class="song-one__composer" v-if="activeSong.composer">
                        <b>Музыка: </b>{{ activeSong.composer }}
                    </div>
                    <div class="song-one__author" v-if="activeSong.author">
                        <b>Слова: </b>{{ activeSong.author }}
                    </div>
                    <div class="song-one__singer" v-if="activeSong.singer">
                        <b>Исполняет: </b>{{ activeSong.singer }}
                    </div>
                    <div class="song-one__text" v-if="activeSong.text">
                        <a :href="activeSong.text" download>Скачать текст песни</a>
                    </div>
                </div>
            </div>
            <div
                class="song-one-description" v-if="activeSong.description"
                v-html="activeSong.description"
            ></div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapMutations, mapState, mapActions } from 'vuex';
import PlaybackPanel from '../components/song-one-components/PlaybackPanel.vue';
import RequestForm from '../components/song-one-components/RequestForm.vue';
import ShowClip from '../components/song-one-components/ShowClip.vue';
import AddSongForm from '../components/add-song-components/AddSongForm.vue';
import SongListOne from '../components/song-list-components/SongListOne.vue';

export default defineComponent({
    name: 'SongOne',
    components: {
        PlaybackPanel,
        RequestForm,
        AddSongForm,
        SongListOne,
        ShowClip,
    },
    data() {
        return {
            showClip: false,
            showForm: false,
            showAddCover: false,
            loading: false,
        }
    },
    computed: {
        ...mapState(['activeSong', 'isAdmin']),
    },
    methods: {
        ...mapMutations(['SET_ACTIVE', 'SET_PAUSE']),
        ...mapActions(['getSong']),
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
        hideRequestForm(event:Event) {
            const element = event.target as HTMLElement;
            if (element.classList.contains('add-song-form') || element.classList.contains('close-popup')) {
                this.showForm = false;
            }
        },
        dateFormat(dateCreate: number) {
            if (this.activeSong) {
                const date = new Date(dateCreate * 1000);
                const day = date.getDate().toString().padStart(2, '0');
                const month = (date.getMonth() + 1).toString().padStart(2, '0');
                const year = date.getFullYear();
                return `${day}.${month}.${year}`;
            }
            return false;
        },
        getClipID(url: string) {
            const regex = /v=([a-zA-Z0-9_-]{11})/;
            const match = url.match(regex);
            if (match) {
                return match[1];
            }
            return null;
        },
        setShowAddCover(show: boolean) {
            this.showAddCover = show;
        },
    },
});
</script>

<style lang="less">
.song-details {
    width: 70%;
    padding: 15px;
    overflow-y: auto;
}

.song-details-back,
a.song-details-back  {
    cursor: pointer;
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 15px;
    display: flex !important;
    align-items: center;
    color: #000 !important;

    &::before {
        content: "";
        width: 10px;
        height: 15px;
        display: block;
        background: url('/src/assets/arrow.png') no-repeat;
        background-size: contain;
        margin-right: 5px;
    }
}

.song-details-grid {
    display: grid;
    grid-template-columns:  1fr 1fr;
    grid-template-rows: auto auto;
    gap: 15px;
}

.song-details-top {
    width: 100%;
    display: flex;
    padding-bottom: 15px;
    border-bottom: 1px solid #ddd;
    margin-bottom: 15px;
    flex-wrap: wrap;
}

.song-details-title {
    font-size: 24px;
    font-weight: 700;
    padding-bottom: 15px;
    width: 100%;
}

.song-details-cover {
    img {
        width: 100%;
    }
}

.song-details-clip {
    cursor: pointer;
    position: relative;
    img {
        width: 100%;
    }
    &::before {
        content: "";
        background: url('/src/assets/youTube.png') no-repeat;
        width: 72px;
        height: 50px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -36px;
        margin-top: -25px;
    }
}

.song-details-left {
    order: 0;
}

.song-details-right {
    order: 1;
}

.cover-list {
    order: 2;
}

.song-one-description {
    width: 100%;
    padding: 20px 0;
}

.request-button {
    background: #0F87DE;
    font-size: 18px;
    color: #fff;
    border-radius: 5px;
    height: 40px;
    padding: 10px 20px;
    margin-right: 15px;
}

.clip-popup {
    position: relative;
    width: 900px;
    height: 600px;
}

.cover-list {
    padding-top: 20px;

    h2 {
        font-size: 18px;
        margin-bottom: 15px;
        font-weight: 700;
    }
}

.song-one__text {
    margin-top: 10px;
    a {
        font-size: 14px;
        text-decoration: underline;
        color: #0F87DE;
    }
}
</style>
