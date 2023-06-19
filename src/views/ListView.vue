<template>
    <main>
        <SongList />
        <Pagination />
    </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapMutations, mapState } from 'vuex';
import SongList from '../layouts/SongList.vue';
import Pagination from '../components/song-list-components/Pagination.vue';

export default defineComponent({
    name: 'HomeView',
    components: {
        SongList,
        Pagination,
    },
    computed: {
        ...mapState(['searchRequest']),
    },
    methods: {
        ...mapMutations(['SET_ACTIVE']),
    },
    mounted() {
        this.SET_ACTIVE(null);
        if (this.searchRequest) {
            this.$router.push('search');
        }
    },
});

</script>

<style lang="less">
</style>
