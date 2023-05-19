<template>
    <div class="song-details">
        <div class="song-details-back" @click="SET_ACTIVE(null)">
            {{ activeSong.name }}
        </div>
        <div class="song-details-body">
            <div class="song-details-left">
                <div class="song-details-cover" v-if="activeSong.cover && !activeSong.clip">
                    <img :src="activeSong.cover" alt="">
                </div>
                <div class="song-details-clip" v-if="activeSong.clip" @click="showClip = true">
                    <img :src="`https://img.youtube.com/vi/${getClipID(activeSong.clip)}/0.jpg`" alt="">
                </div>
                <div v-if="showClip" class="add-song-form" @click="hideForm">
                    <div class="clip-popup">
                        <div class="close-popup" @click="hideForm"></div>
                        <iframe width="800" height="500" :src="`https://www.youtube.com/embed/${getClipID(activeSong.clip)}`" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                    </div>
                </div>
            </div>
            <div class="song-details-right">
                <PlaybackPanel />
                <div
                    class="song-one__date"
                    v-if="activeSong">
                    <b>Добавлено:</b> {{ dateFormat(activeSong.date_create) }}
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
                <div class="song-one__singer" v-if="activeSong.description">
                    <p>{{ activeSong.description }}</p>
                </div>
                <div class="requst-block">
                    <button
                        class="requst-button"
                        @click="showForm = true"
                    >
                        Запрос прав для трансляции
                    </button>
                    <RequestForm :hideRequestForm="hideRequestForm" v-if="showForm" />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapMutations, mapState } from 'vuex';
import PlaybackPanel from './song-one-components/PlaybackPanel.vue';
import RequestForm from './song-one-components/RequestForm.vue';

export default defineComponent({
    name: 'SongOne',
    components: {
        PlaybackPanel,
        RequestForm,
    },
    data() {
        return {
            showClip: false,
            showForm: false,
        }
    },
    computed: {
        ...mapState(['activeSong']),
    },
    methods: {
        ...mapMutations(['SET_ACTIVE']),
        hideForm(event:Event) {
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
    },
});
</script>

<style lang="less">
.song-details {
    padding: 15px;
}

.song-details-back {
    cursor: pointer;
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 15px;
    display: flex;
    align-items: center;

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

.song-details-body {
    display: flex;
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
    width: calc(50% - 15px);
    margin-right: 30px;
}

.song-details-right {
    width: calc(50% - 15px);
}

.requst-block {
    margin-top: 20px;
    display: flex;
    justify-content: center;
}

.requst-button {
    background: #0F87DE;
    font-size: 18px;
    color: #fff;
    border-radius: 5px;
    height: 40px;
    padding: 0 20px;
}
</style>
