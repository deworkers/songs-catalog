<template>
    <div class="comments">
        <div class="comments-top">
            <div class="comments-top-count">
                {{ comments.length }}
                {{ declOfNum(comments.length, ['комментарий', 'комментария', 'комментариев']) }}
            </div>
            <div
                v-if="comments.length > 1"
                class="comments-top-sort"
            >
                <select v-model="sort">
                    <option value="date_create">
                        Сначала новые
                    </option>
                    <option value="vote_count">
                        Сначала популярные
                    </option>
                </select>
            </div>
        </div>
        <CommentForm :song-id="songId" />
        <div>
            <div
                v-for="comment in sortedList"
                :key="comment.id"
            >
                <CommentOne
                    :comment="comment"
                />
                <CommentReplace
                    :replays="comment.replays_list"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { IComment } from '@/store/types';
import declOfNum from '@/utils/declOfNum';
import CommentOne from './comment-components/CommentOne.vue';
import CommentReplace from './comment-components/CommentReplace.vue';
import CommentForm from './comment-components/CommentForm.vue';

export default defineComponent({
    name: 'CommentsComponent',
    components: {
        CommentOne,
        CommentForm,
        CommentReplace,
    },
    props: {
        comments: {
            type: Array as ()=> IComment[],
            required: true,
        },
        songId: {
            type: Number,
            required: true,
        },
    },
    setup(props) {
        const sort = ref('date_create');
        const message = ref('');

        const sortedList = computed(() => {
            const commentsCopy = [...props.comments];
            return commentsCopy.sort((a:IComment, b:IComment) => {
                if (sort.value === 'date_create') {
                    return b.date_create - a.date_create;
                }
                if (sort.value === 'vote_count') {
                    return b.vote_count - a.vote_count;
                }
                return 1;
            });
        });

        return {
            sort,
            message,
            sortedList,
            declOfNum,
        };
    },
});
</script>

<style lang="less">
.comments-top {
    display: flex;
    align-items: center;
    padding: 20px 0;
}

.comments-top-count {
    margin-right: 30px;
    font-size: 20px;
}

.comments-top-sort {
    font-size: 18px;
    select {
        padding: 5px;
        background: #ddd;
        border-radius: 5px;
    }

    option {
        background: #fff;
    }
}
</style>
