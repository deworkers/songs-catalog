<template>
    <div
        class="song-list"
    >
        <AddSong v-if="isAdmin" />
        <SongListOne
            v-for="song in searchResult"
            :key="song.id"
            :song="song"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapState, mapGetters } from 'vuex';
import SongListOne from '../components/song-list-components/SongListOne.vue';
import AddSong from './AddSong.vue';

export default defineComponent({
    name: 'SongListView',
    components: {
        SongListOne,
        AddSong,
    },
    computed: {
        ...mapState(['songs', 'groups', 'isAdmin', 'searchRequest']),
        ...mapGetters(['searchResult']),
    },
});
</script>

<style lang="less">
.song-list {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
}
</style>
