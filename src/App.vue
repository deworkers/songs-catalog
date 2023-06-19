<template>
    <Header />
    <div class="main-body">
        <router-view/>
        <PlayerComponent />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions } from 'vuex';

import Header from './layouts/Header.vue';
import PlayerComponent from './components/side-components/PlayerComponent.vue';

export default defineComponent({
    name: 'HomeView',
    components: {
        Header,
        PlayerComponent,
    },
    methods: {
        ...mapActions(['getSongs']),
    },
    mounted() {
        this.getSongs().then(() => {
            document.title = 'Живая музыка и хорошие песни';
        })
    },
});
</script>

<style lang="less">
@import './styles/font-family.less';
@import './styles/main.less';
@import './styles/responsive.less';
main {
    height: 100%;
    overflow: auto;
    display: flex;
    flex-direction: column;
    &.space-between {
        justify-content: space-between;
    }
}
.main-body {
    display: flex;
    height: calc(100vh - 70px);
    flex-direction: column;
    justify-content: space-between;
}
</style>
