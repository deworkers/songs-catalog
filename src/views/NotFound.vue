<template>
    <main>
        <div class="page-error">
            <div class="page-error-title">404</div>
            <div class="page-error-descr">Страница не найдена</div>
            <router-link
                class="page-error-button"
                :to="{ name: 'list' }">
                Вернуться на главную
            </router-link>
        </div>
    </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'HomeView',
    components: {
    },
    computed: {
    },
    methods: {
    },
});

</script>

<style lang="less">
.page-error {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
}

.page-error-title {
    font-size: 80px;
    font-weight: 700;
    color: #0f87de;
}

.page-error-descr {
    font-size: 24px;
    margin-bottom: 20px;
}

.page-error-button {
    background: #0F87DE;
    font-size: 18px;
    color: #fff;
    border-radius: 5px;
    height: 40px;
    display: block;
    line-height: 40px;
    padding: 0 15px;
}
</style>
