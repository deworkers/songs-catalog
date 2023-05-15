<template>
    <div class="song-details">
        <div class="song-details-back" @click="SET_ACTIVE(null)">
            {{ activeSong.name }}
        </div>
        <div class="song-details-body">
            <div class="song-details-left">
                <div class="song-details-cover" v-if="activeSong.cover">
                    <img :src="activeSong.cover" alt="">
                </div>
                <div class="song-details-cover" v-if="activeSong.clip">
                    <img :src="`https://img.youtube.com/vi/${activeSong.clip}/0.jpg`" alt="">
                </div>
            </div>
            <div class="song-details-right">
                <PlaybackPanel />
                <div class="song-one__date"><b>Добавлено:</b> {{ dateFormat }}</div>
                <div class="song-one__composer" v-if="activeSong.composer">
                    <b>Музыка: </b>{{ activeSong.composer }}
                </div>
                <div class="song-one__author" v-if="activeSong.author">
                    <b>Слова: </b>{{ activeSong.author }}
                </div>
                <div class="song-one__singer" v-if="activeSong.singer">
                    <b>Исполняет: </b>{{ activeSong.singer }}
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapMutations, mapState } from 'vuex';
import PlaybackPanel from './song-one-components/PlaybackPanel.vue';

export default defineComponent({
    name: 'SongOne',
    components: {
        PlaybackPanel,
    },
    computed: {
        ...mapState(['activeSong']),
        dateFormat() {
            const date = new Date(this.activeSong.date_create);
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear();

            return `${day}.${month}.${year}`;
        },
    },
    methods: {
        ...mapMutations(['SET_ACTIVE']),
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
    margin-bottom: 10px;
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

.song-details-left {
    width: calc(50% - 15px);
    margin-right: 30px;
}

.song-details-right {
    width: calc(50% - 15px);
}
</style>
