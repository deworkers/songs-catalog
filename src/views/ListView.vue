<template>
    <main>
        <SongList />
    </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SongList from '../components/SongList.vue';

export default defineComponent({
    name: 'HomeView',
    components: {
        SongList,
    },
});

</script>

<style lang="less">
    @import '../styles/main.less';

    .main-body {
        display: flex;
        height: calc(100vh - 70px);
    }

</style>
