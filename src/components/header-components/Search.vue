<template>
    <div class="search">
        <div class="search-panel">
            <input
                id="search-request"
                v-model="request"
                class="search-input"
                type="text"
                placeholder="Искать песню"
                @keypress.enter="search(request)"
            />
            <button
                @click="search(request)"
                class="search-button">
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
    mapActions,
    mapMutations,
    mapState,
} from 'vuex';

export default defineComponent({
    name: 'SearchPage',
    data() {
        return {
            request: '',
        };
    },
    computed: {
        ...mapState(['searchRequest']),
    },
    methods: {
        ...mapActions(['getSongs']),
        ...mapMutations(['SET_SEARCH_REQUEST']),
        search(request: string): void {
            this.SET_SEARCH_REQUEST(request);
            this.$router.push({
                name: 'search',
            });
        },
    },
    watch: {
        searchRequest(newValue) {
            if (!newValue) {
                this.request = '';
            }
        },
    },
});
</script>

<style lang="less">
.search {
    width: 70%;
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

.search-input::placeholder {
   color:    #fff;
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
