<template>
    <main>
        <GroupList v-if="isAdmin || groups.length > 0" />
        <SongList />
        <Pagination />
    </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapMutations, mapState } from 'vuex';
import SongList from '../layouts/SongList.vue';
import GroupList from '../layouts/GroupList.vue';

import Pagination from '../components/song-list-components/Pagination.vue';

export default defineComponent({
    name: 'HomeView',
    components: {
        SongList,
        Pagination,
        GroupList,
    },
    computed: {
        ...mapState(['searchRequest', 'groups', 'isAdmin']),
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
