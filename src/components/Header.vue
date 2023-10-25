<template>
    <header>
        <div class="logo">
            <img
                src="../assets/songs-logo.png"
                alt=""
            >
            Живая музыка и хорошие песни
        </div>
        <Search />
    </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Search from './header-components/Search.vue';

export default defineComponent({
    name: 'SearchPage',
    components: {
        Search,
    },
});
</script>

<style lang="less">
header {
    display: flex;

    .logo {
        width: 25%;
        background: #394546;
        color: #fff;
        font-size: 18px;
        font-weight: 700;
        display: flex;
        align-items: center;
        padding: 16px 10px;

        img {
            margin-right: 10px;
        }
    }
}
</style>
