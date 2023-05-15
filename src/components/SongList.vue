<template>
    <div
        class="song-list"
    >
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

export default defineComponent({
    name: 'SongListView',
    components: {
        SongListOne,
    },
    computed: {
        ...mapState(['songs']),
    },
});
</script>

<style lang="less">
.song-list {
    display: flex;
    flex-wrap: wrap;
}
</style>
