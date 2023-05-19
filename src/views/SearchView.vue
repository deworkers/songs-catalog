<template>
    <main>
        <div class="song-details">
            <div
                @click="clickToListHandler()"
                class="song-details-back"
                >
                Результаты поиска по запросу: {{ searchRequest }}
            </div>
        </div>
        <SongList />
    </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapState, mapMutations, mapActions } from 'vuex';
import SongList from '../components/SongList.vue';

export default defineComponent({
    name: 'SearchView',
    components: {
        SongList,
    },
    computed: {
        ...mapState(['searchRequest']),
    },
    methods: {
        ...mapMutations(['SET_SEARCH_REQUEST']),
        ...mapActions(['getList']),
        clickToListHandler() {
            this.SET_SEARCH_REQUEST(null);
            this.getList().then(() => {
                this.$router.push({
                    name: 'list',
                });
            })
        },
    },
    mounted() {
        if (!this.searchRequest) {
            this.$router.push({
                name: 'list',
            });
        }
    },
});

</script>

<style lang="less">
.song-details {
    padding: 15px 15px 0;
}

.song-details-back {
    cursor: pointer;
    font-size: 18px;
    font-weight: 700;
    display: flex !important;
    align-items: center;
    color: #000 !important;

    &::before {
        content: "";
        width: 10px;
        height: 15px;
        display: block;
        background: url('/src/assets/arrow.png') no-repeat;
        background-size: contain;
        margin-right: 5px;
    }
}
</style>
