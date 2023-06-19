<template>
    <main>
        <div class="song-one-body">
            <div class="song-one-list">
                <SongListOne
                    v-for="song in songs"
                    :key="song.id"
                    :song="song"
                />
            </div>
            <SongOne v-if="activeSong" />
        </div>
    </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapState } from 'vuex';
import SongOne from '../layouts/SongOne.vue';
import SongListOne from '../components/song-list-components/SongListOne.vue';

export default defineComponent({
    name: 'HomeView',
    components: {
        SongOne,
        SongListOne,
    },
    computed: {
        ...mapState(['activeSong', 'songs']),
        songID() {
            return this.$route.params.id;
        },
    },
    methods: {
        ...mapActions(['getSong']),
    },
    mounted() {
        if (this.songs.length > 0) {
            this.getSong(this.$route.params.id).then(() => {
                const element = document.querySelector('.song-one.active');
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
    },
    watch: {
        songs() {
            if (this.songs.length > 0) {
                this.getSong(this.$route.params.id);
            }
        },
        songID() {
            this.getSong(this.$route.params.id).then(() => {
                const element = document.querySelector('.song-one.active');
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            });
        },
    },
});
</script>

<style lang="less">
.song-one-body {
    display: flex;
    height: 100%;
}

.song-one-list {
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    width: 30%;

    .song-one {
        width: 100%;
        margin: 0;
        padding: 10px;
    }

    .song-one-cover {
        width: 60px;
        height: 60px;
    }

    .song-one__date {
        display: none;
    }

    .song-one__composer,
    .song-one__author,
    .song-one__singer {
        font-size: 12px;
    }

    .song-one-play,
    .song-one-pause {
        top: 27px;
        left: 27px;
    }
}
</style>
