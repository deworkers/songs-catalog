<template>
    <Header />
    <div class="main-body">
        <Side />
        <Body />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapMutations, mapState } from 'vuex';
import { ISong } from '@/store';

import Side from './components/Side.vue';
import Header from './components/Header.vue';
import Body from './components/Body.vue';

export default defineComponent({
    name: 'App',
    components: {
        Header,
        Side,
        Body,
    },
    computed: {
        ...mapState(['songs']),
    },
    methods: {
        ...mapActions(['getList']),
        ...mapMutations(['SET_IS_ADMIN', 'SET_ACTIVE']),
    },
    mounted() {
        document.title = '🎵 Живая музыка и хорошие песни';
        this.getList().then(() => {
            if (window.location.hash) {
                const id = parseInt(window.location.hash.slice(1), 10);
                const song = this.songs.find((el: ISong) => el.id === id);
                this.SET_ACTIVE(song);
            }
        })
    },
});

</script>

<style lang="less">
@import './styles/main.less';
.main-body {
    display: flex;
    height: calc(100vh - 70px);
}
</style>
