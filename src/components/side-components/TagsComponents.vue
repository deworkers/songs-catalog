<template>
    <div class="tag-list">
        <div
            :class="['tag-one', activeTag === key ? 'active' : '']"
            v-for="(tag, key, index) in tags"
            :key="index"
            @click="filterBy(key)"
        >
            {{tag}}
        </div>
    </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import { mapActions, mapMutations, mapState } from 'vuex';

export default defineComponent({
    name: 'TagsComponents',
    components: {
    },
    data() {
        return {
            active: 'new',
            tags: {
                new: 'Сначала новые',
                popular: 'Популярные',
                withClip: 'С клипами',
            },
        }
    },
    computed: {
        ...mapState(['activeTag']),
    },
    methods: {
        ...mapActions(['getSongs']),
        ...mapMutations(['SET_ACTIVE_TAG']),
        filterBy(param:string) {
            this.active = param;
            this.SET_ACTIVE_TAG(param);
            this.getSongs({
                order: param,
            }).then(() => {
                this.$router.push({
                    name: 'list',
                });
            });
        },
    },
});
</script>

<style lang="less">
    .tag-list {
        padding: 15px;
    }
    .tag-one {
        cursor: pointer;
        background: #D0E1E3;
        margin-bottom: 10px;
        font-size: 18px;
        padding: 15px;
        border-radius: 5px;
        &.active {
            background: #0F87DE;
            color: #fff;
        }
    }
</style>
