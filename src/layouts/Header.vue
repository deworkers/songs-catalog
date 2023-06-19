<template>
    <header>
        <div class="logo">
            <div
                :class="['logo-title', !isAdmin ? 'logo-title__full' : '']"
                @click="toMainPage"
            >VLPV.ru</div>
            <div class="logout" v-if="isAdmin" @click="logoutHandler">Выйти</div>
        </div>
        <Search />
    </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapState, mapMutations } from 'vuex';
import Search from '../components/header-components/Search.vue';

export default defineComponent({
    name: 'SearchPage',
    components: {
        Search,
    },
    computed: {
        ...mapState(['isAdmin']),
    },
    methods: {
        ...mapMutations(['SET_SEARCH_REQUEST']),
        ...mapActions(['logout']),
        toMainPage() {
            this.SET_SEARCH_REQUEST(null);
            this.$router.push('/');
        },
        logoutHandler() {
            window.location.replace('/site/logout')
        },
    },
});
</script>

<style lang="less">
header {
    display: flex;

    .logo {
        width: 30%;
        background: #394546;
        color: #fff;
        padding: 10px 10px;
        text-align: center;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .logo-title {
        cursor: pointer;
        font-size: 36px;
        font-family: 'Viga';
        text-align: center;
        width: calc(100% - 40px);
    }

    .logo-title__full {
        width: 100%;
    }

    .logout {
        font-size: 14px;
        text-decoration: underline;
        cursor: pointer;
    }
}
</style>
