<template>
    <HeaderComponent v-if="view === 'list' || !isMobile" />
    <div class="main-body">
        <router-view />
        <PlayerComponent />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions } from 'vuex';

import HeaderComponent from './layouts/Header.vue';
import PlayerComponent from './components/side-components/PlayerComponent.vue';

export default defineComponent({
    name: 'HomeView',
    components: {
        HeaderComponent,
        PlayerComponent,
    },
    data() {
        return {
            transitionName: 'slide-right',
        };
    },
    computed: {
        view() {
            return this.$router.currentRoute.value.name;
        },
        isMobile() {
            return window.innerWidth <= 760;
        },
    },
    mounted() {
        this.getSongs().then(() => {
            document.title = 'Живая музыка и хорошие песни';
        });
    },
    methods: {
        ...mapActions(['getSongs']),
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
