<template>
    <div class="replays" v-if="replays && replays.length">
        <div
            :class="['replays-show', show ? 'active' : '']"
            @click="toggleShow"
        >
            {{ replays.length }}
            {{declOfNum(replays.length, ['ответ', 'ответа', 'ответов'])}}
        </div>
        <div class="replays-list" v-if="show">
            <CommentOne
                v-for="replay in replays"
                :key="replay.id"
                :comment="replay"
            />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { IComment } from '@/store/types';
import declOfNum from '@/utils/declOfNum';
import CommentOne from './CommentOne.vue';

export default defineComponent({
    props: {
        replays: {
            type: Object as ()=> IComment[],
        },
    },
    components: {
        CommentOne,
    },
    setup() {
        const show = ref(false);
        const toggleShow = () => {
            show.value = !show.value;
        }

        return {
            show,
            toggleShow,
            declOfNum,
        }
    },
})
</script>

<style lang="less">
.replays {
    margin-bottom: 20px;
}

.replays-show {
    color: #0f87de;
    font-weight: 700;
    position: relative;
    padding: 5px 20px 5px 30px;
    border-radius: 5px;
    cursor: pointer;
    display: inline-block;

    &:hover {
        background: #D0E1E3;
    }

    &:before {
        content: "";
        position: absolute;
        top: 11px;
        left: 12px;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 6px 4.5px 0 4.5px;
        border-color: #0f87de transparent transparent transparent;
    }
    &.active {
        &:before {
            content: "";
            width: 0;
            height: 0;
            border-style: solid;
            border-width: 0 4.5px 6px 4.5px;
            border-color: transparent transparent #0f87de transparent;
        }
    }
}

.replays-list {
    padding: 15px 0 0 50px;
}
</style>
