<template>
    <div
        class="song-list"
    >
        <AddSong
            v-if="isAdmin"
        />
        <SongListOne
            v-for="song in songs"
            :key="song.id"
            :song="song"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapState } from 'vuex';
import SongListOne from './song-list-components/SongListOne.vue';
import AddSong from './AddSong.vue';

export default defineComponent({
    name: 'SongListView',
    components: {
        SongListOne,
        AddSong,
    },
    computed: {
        ...mapState(['songs', 'isAdmin']),
    },
});
</script>

<style lang="less">
.song-list {
    display: flex;
    flex-wrap: wrap;
}
</style>
