<template>
    <div class="tag-list">
        <div
            :class="['tag-one', active === key ? 'active' : '']"
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
import { mapActions } from 'vuex';

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
    methods: {
        ...mapActions(['getList']),
        filterBy(param:string) {
            this.active = param;
            this.getList({
                order: param,
            }).then(() => {
                console.log('load');
            })
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
