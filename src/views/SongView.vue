<template>
    <main>
        <SongOne />
    </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SongOne from '../components/SongOne.vue';

export default defineComponent({
    name: 'HomeView',
    components: {
        SongOne,
    },
    data() {
        return {
            song: null,
        }
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
