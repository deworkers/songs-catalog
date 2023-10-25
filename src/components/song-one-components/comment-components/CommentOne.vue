<template>
    <div
        v-if="comment"
        :class="['comment-one', comment.status]"
    >
        <div class="comment-one-body">
            <div class="comment-one__date">
                {{ timeAgo(comment.date_create) }}
            </div>
            <div class="comment-one__text">
                {{ comment.text }}
            </div>
            <div class="comment-one__vote">
                <button
                    class="comment-one__vote-button"
                    @click="voteHandler"
                />
                {{ comment.vote_count }}
                <button
                    v-if="comment.parent_id === 0"
                    class="comment-one__answer"
                    @click="setShowForm(true)"
                >
                    Ответить
                </button>
            </div>
        </div>
        <div
            v-if="isAdmin || comment.author === userID"
            class="comment-one-edit"
        >
            <div :class="['comment-one-status', comment.status]">
                {{ showStatus(comment.status) }}
            </div>
            <div
                class="song-one-edit"
                @click="setShowMenu(true)"
            />
            <EditMenu
                v-if="showMenu"
                :status-prop="comment.status"
                :set-show-menu="setShowMenu"
                :show-menu="showMenu"
                :comment="comment"
            />
        </div>

        <CommentForm
            v-if="showForm && comment.parent_id === 0"
            :parent-i-d="comment.id"
            :song-id="comment.song_id"
            :set-show-form="setShowForm"
        />
    </div>
</template>

<script lang="ts">
import { IComment } from '@/store/types';
import timeAgo from '@/utils/timeAgo';
import {
    computed,
    defineComponent,
    toRefs,
    ref,
} from 'vue';
import { useStore } from 'vuex';
import axios from 'axios';
import EditMenu from './EditMenu.vue';
import CommentForm from './CommentForm.vue';

export const showStatus = (status: string): string => {
    switch (status) {
        case 'active':
            return 'Активен';

        case 'moderation':
            return 'На модерации';

        case 'reject':
            return 'Скрыт';

        default:
            return 'Нет статуса';
    }
};

export default defineComponent({
    components: {
        EditMenu,
        CommentForm,
    },
    props: {
        comment: {
            type: Object as ()=> IComment,
            default: () => {}
        },
    },
    setup(props) {
        const { comment } = toRefs(props);
        const store = useStore();
        const isAdmin = computed(() => store.state.isAdmin);
        const userID = computed(() => store.state.userID);

        const voteHandler = () => {
            axios.get(`/comment/vote/${comment.value?.id}/`)
                .then(({ data }) => {
                    if (data.status === 200) {
                        if (comment.value) {
                            comment.value.vote_count += 1;
                        }
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        };

        const showMenu = ref(false);
        const setShowMenu = (show: boolean):void => {
            showMenu.value = show;
        };

        const showForm = ref(false);
        const setShowForm = (show: boolean):void => {
            showForm.value = show;
        };

        return {
            timeAgo,
            showStatus,
            isAdmin,
            voteHandler,
            userID,
            showMenu,
            setShowMenu,
            showForm,
            setShowForm,
        };
    },
});
</script>

<style lang="less">
.comments-add {
    padding-bottom: 15px;
}

.comment-one {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    flex-wrap: wrap;

    &.reject {
        .comment-one-body {
            opacity: 0.3;
        }
    }

    &__date {
        font-size: 16px;
        margin-bottom: 10px;
        color: #6f7f81;
    }

    &__text {
        font-size: 18px;
        margin-bottom: 10px;
    }

    &__vote {
        display: flex;
        align-items: center;
    }

    &__vote-button {
        width: 25px;
        height: 25px;
        background: #D0E1E3;
        border-radius: 50%;
        cursor: pointer;
        margin-right: 10px;
        position: relative;
        &::before {
            content: '';
            width: 18px;
            height: 18px;
            background: url('/src/assets/thumb.png') no-repeat;
            background-size: contain;
            display: block;
            position: absolute;
            top: 3px;
            left: 4px;
        }
    }

    &__answer {
        margin-left: 30px;
        font-weight: 700;
        height: 30px;
        padding: 0 10px;
        border-radius: 5px;
        &:hover {
            background: #D0E1E3;
        }
    }

    .comments-add {
        width: 100%;
        padding: 15px 0 0;
    }
}

.comment-one-body {
    width: calc(100% - 185px);
}

.comment-one-edit {
    display: flex;
    align-items: center;
    position: relative;
    width: 185px;

    .song-one-edit {
        height: 100%;
    }
}

.comment-one-status {
    padding: 5px 10px;
    border-radius: 5px;
    width: 135px;
    text-align: center;

    &.active {
        background: #0f87de;
        color: #fff;
    }
    &.moderation {
        background: #f9bb03;
    }
    &.reject {
        background: #d0e1e3;
        color: #6f7f81;
    }
}
</style>
