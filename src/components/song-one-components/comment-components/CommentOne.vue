<template>
    <div v-if="comment" class="comment-one">
        <div class="comment-one-body">
            <div class="comment-one__date">
                {{ timeAgo(comment.date_create) }}
            </div>
            <div class="comment-one__text">
                {{ comment.text }}
            </div>
            <div class="comment-one__vote">
                <button class="comment-one__vote-button" @click="voteHandler"></button>
                {{ comment.vote_count }}
                <button class="comment-one__answer">Ответить</button>
            </div>
        </div>
        <div class="comment-one-edit" v-if="isAdmin">
            <div :class="['comment-one-status', comment.status]">
                {{ showStatus(comment.status) }}
            </div>
            <div class="song-one-edit" @click="setShowMenu(true)"></div>
            <EditMenu
                v-if="showMenu"
                :statusProp="comment.status"
                :setShowMenu="setShowMenu"
                :showMenu="showMenu"
            />
        </div>
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

export const showStatus = (status: string): string => {
    switch (status) {
        case 'active':
            return 'Активен';

        case 'moderation':
            return 'На модерации';

        case 'inactive':
            return 'Скрыт';

        default:
            return 'Нет статуса'
    }
}

export default defineComponent({
    props: {
        comment: {
            type: Object as ()=> IComment,
        },
    },
    components: {
        EditMenu,
    },
    setup(props) {
        const { comment } = toRefs(props)
        const store = useStore();
        const isAdmin = computed(() => store.state.isAdmin);
        const userID = computed(() => store.state.userID);

        const voteHandler = () => {
            axios.post('/vote/', {
                '[Vote]author': userID.value,
                '[Vote]comment_id': comment.value?.id,
            }, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then(() => {
                    if (comment.value) {
                        comment.value.vote_count += 1
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }

        const showMenu = ref(false);
        const setShowMenu = (show: boolean):void => {
            showMenu.value = show;
        }

        return {
            timeAgo,
            showStatus,
            isAdmin,
            voteHandler,
            userID,
            showMenu,
            setShowMenu,
        };
    },
})
</script>

<style lang="less">
.comments-add {
    padding-bottom: 15px;
}

.comment-one {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;

    &__date {
        font-size: 16px;
        margin-bottom: 10px;
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
}

.comment-one-edit {
    display: flex;
    align-items: center;
    position: relative;

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
    &.inactive {
        background: #d0e1e3;
        color: #6f7f81;
    }
}
</style>
