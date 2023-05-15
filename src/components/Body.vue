<template>
    <main>
        <SongList v-if="!activeSong" />
        <SongOne v-else />
    </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapState } from 'vuex';
import SongList from './SongList.vue';
import SongOne from './SongOne.vue';

export default defineComponent({
    name: 'BodyComponent',
    components: {
        SongList,
        SongOne,
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
}
</style>
