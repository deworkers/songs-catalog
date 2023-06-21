<template>
    <main v-if="activeGroup">
        <div class="song-details">
            <div
                @click="clickToListHandler()"
                class="song-details-back"
                >
                К списку песен
            </div>
        </div>
        <div
            class="group-view"
        >
        <div class="group-view-about">
                <div class="group-cover">
                    <img :src="activeGroup.cover" alt="">
                </div>
                <div class="group-about">
                    <div class="group-title">{{ activeGroup.name }}</div>
                    <div class="group-description">{{ activeGroup.description }}</div>
                </div>
            </div>
            <div class="group-view-list">
                <SongListOne
                    v-for="song in activeGroup.items"
                    :key="song.id"
                    :song="song"
                    :isGroupSong="true"
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
    computed: {
        ...mapState(['activeGroup', 'songs']),
        groupID() {
            return this.$route.params.id;
        },
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
    mounted() {
        if (this.songs.length > 0) {
            this.getGroup(this.$route.params.id).then(() => {
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
                this.getGroup(this.$route.params.id);
            }
        },
        groupID() {
            this.getGroup(this.$route.params.id);
        },
    },
});

</script>

<style lang="less">
.group-view {
    height: calc(100% - 60px);
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

    img {
        display: block;
        height: 250px;
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
</style>
