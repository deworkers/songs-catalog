<template>
    <main v-if="activeGroup">
        <div class="song-details">
            <div
                :class="[
                    'song-details-back',
                    scrollTop > 0 ? 'fixed' : '',
                    scrollTop > 180 ? 'fixed-bg': ''
                ]"
                @click="clickToListHandler()"
            >
                К списку песен
            </div>
        </div>
        <div
            class="group-view"
        >
            <div class="group-view-about">
                <div class="group-cover">
                    <img
                        :src="activeGroup.cover"
                        alt=""
                    >
                </div>
                <div class="group-about">
                    <div class="group-title">
                        {{ activeGroup.name }}
                    </div>
                    <div class="group-description">
                        {{ activeGroup.description }}
                    </div>
                    <a
                        v-if="activeGroup.playlist"
                        target="_blank"
                        :href="activeGroup.playlist"
                        class="youtube-button"
                    >
                        Открыть плейлист на YouTube
                    </a>
                </div>
            </div>
            <div class="group-view-list">
                <SongListOne
                    v-for="song in activeGroup.songs"
                    :key="song.id"
                    :song="song"
                    :is-group-song="true"
                />
            </div>
        </div>
    </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapMutations, mapActions, mapState } from 'vuex';
import SongListOne from '../components/song-list-components/SongListOne.vue';

export default defineComponent({
    name: 'GroupView',
    components: {
        SongListOne,
    },
    data() {
        return {
            scrollTop: 0,
        };
    },
    computed: {
        ...mapState(['activeGroup', 'songs']),
        groupID() {
            return this.$route.params.id;
        },
    },
    watch: {
        songs() {
            if (this.songs.length > 0) {
                this.getGroup(this.$route.params.id);
            }
        },
        groupID() {
            this.getGroup(this.$route.params.id);
        },
    },
    mounted() {
        window.addEventListener('scroll', () => {
            this.scrollTop = document.documentElement.scrollTop;
        });
        if (this.songs.length > 0) {
            this.getGroup(this.$route.params.id).then(() => {
                const element = document.querySelector('.song-one.active');
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
    },
    methods: {
        ...mapMutations(['SET_ACTIVE_GROUP']),
        ...mapActions(['getGroup']),
        clickToListHandler() {
            this.SET_ACTIVE_GROUP(null);
            this.$router.push({
                name: 'list',
            });
        },
    },
});

</script>

<style lang="less">
.group-view {
    height: calc(100% - 50px);
    overflow-y: auto;
}

.group-view-about {
    padding: 0 15px;
    display: flex;
    margin-bottom: 30px;
}

.group-cover {
    overflow: hidden;
    height: 250px;
    width: 250px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
    background: #0F87DE;

    img {
        display: block;
        height: 110%;
    }
}

.group-about {
    width: calc(100% - 270px);
}

.group-title {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 5px;
}

.group-description {
    font-size: 18px;
}

.group-view-list {
    display: flex;
    flex-wrap: wrap;
}

.youtube-button {
    font-size: 20px;
    line-height: 16px;
    border-radius: 10px;
    height: 40px;
    padding: 25px 10px;
    margin-right: 15px;
    display: inline-flex;
    color: #ff0000;
    border: 2px solid #ff0000;
    align-items: center;
    &::before {
        content: "";
        background: url('/src/assets/youTube.png') no-repeat;
        width: 46px;
        height: 32px;
        background-size: contain;
        display: block;
        margin-right: 10px;
    }
}
</style>
