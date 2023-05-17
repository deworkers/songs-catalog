<template>
    <Header />
    <div class="main-body">
        <Side />
        <Body />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapMutations } from 'vuex';

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
    methods: {
        ...mapActions(['getList']),
        ...mapMutations(['SET_IS_ADMIN']),
    },
    mounted() {
        document.title = '🎵 Живая музыка и хорошие песни';
        this.getList().then(() => {
            console.log('load');
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
