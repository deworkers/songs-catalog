<template>
    <div class="search">
        <div class="search-panel">
            <input
                id="search-request"
                v-model="searchRequest"
                class="search-input"
                type="text"
                placeholder="Искать песню"
                @keypress.enter="search(searchRequest)"
            />
            <button
                @click="search(searchRequest)"
                class="search-button">
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'SearchPage',
    data() {
        return {
            searchRequest: '',
        };
    },
    methods: {
        search(searchRequest: string): void {
            if (searchRequest.length > 2) {
                console.log(searchRequest);
            }
        },
    },
});
</script>

<style lang="less">
.search {
    width: 75%;
    background: #d0e1e3;
}

.search-panel {
    padding: 15px;
    position: relative;
}

.search-input {
    height: 40px;
    border-radius: 20px;
    width: 100%;
    background: #394546;
    color: #fff;
    padding: 0 20px;
}

.search-button {
    width: 40px;
    height: 40px;
    background: #0f87de;
    border-radius: 20px;
    position: absolute;
    top: 15px;
    right: 14px;
    &::before {
        content: '';
        width: 24px;
        height: 24px;
        background: url('/src/assets/search.png');
        background-size: contain;
        display: block;
        position: absolute;
        top: 7px;
        left: 8px;
    }
}
</style>
