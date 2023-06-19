<template>
    <ul v-if="allPages && allPages > 1" class="pagination">
        <li
            :class="['pagination-one', page === i ? 'active' : '']"
            v-for="i in allPages"
            :key="i"
            @click="goToPage(i)"
        >
            {{ i }}
        </li>
    </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapState } from 'vuex';

export default defineComponent({
    name: 'PaginationComponents',
    computed: {
        ...mapState(['page', 'allPages', 'activeTag', 'searchRequest']),
    },
    methods: {
        ...mapActions(['getSongs']),
        goToPage(page: number) {
            const params = this.searchRequest
                ? { page, search: this.searchRequest }
                : { page };
            this.getSongs(params).then(() => {
                const list = document.querySelector('.song-list');
                if (list) {
                    list.scrollTo({
                        behavior: 'smooth',
                        top: 0,
                    });
                }
                const main = document.querySelector('html');
                if (main) {
                    main.scrollTo({
                        behavior: 'smooth',
                        top: 0,
                    });
                }
            });
        },
    },
})
</script>

<style lang="less">
.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 60px;
}

.pagination-one {
    padding: 7px 5px;
    width: 30px;
    text-align: center;
    font-size: 14px;
    background: #D0E1E3;
    display: block;
    margin: 0 5px;
    cursor: pointer;
    font-weight: 700;
    border-radius: 5px;

    &.active {
        background: #0F87DE;
        color: #fff;
    }
}
</style>
