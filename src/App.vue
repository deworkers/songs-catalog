<template>
    <Header />
    <div class="main-body">
        <Side />
        <router-view/>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions } from 'vuex';

import Side from './components/Side.vue';
import Header from './components/Header.vue';

export default defineComponent({
    name: 'HomeView',
    components: {
        Header,
        Side,
    },
    methods: {
        ...mapActions(['getList']),
    },
    mounted() {
        document.title = '🎵 Живая музыка и хорошие песни';
        this.getList().then()
    },
});
</script>

<style lang="less">
</style>
