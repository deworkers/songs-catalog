<template>
    <main>
        <SongList />
    </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapState } from 'vuex';
import SongList from './SongList.vue';

export default defineComponent({
    name: 'BodyComponent',
    components: {
        SongList,
    },
    computed: {
        ...mapState(['activeSong']),
    },
});
</script>

<style lang="less">
aside {
    width: 25%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

main {
    width: 75%;
    height: 100%;
    overflow: auto;
}
</style>
