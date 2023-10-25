<template>
    <div
        v-click-outside="clickOutside"
        class="edit-panel"
    >
        <div
            class="edit-panel-elem"
            @click="setShowForm(true)"
        >
            Редактировать
        </div>
        <div
            v-if="isAdmin && statusProp === 'moderation' || statusProp === 'reject'"
            class="edit-panel-elem"
            @click="editHandler({
                'Comment[status]': 'active',
            })"
        >
            Опубликовать
        </div>
        <div
            v-if="isAdmin && statusProp === 'moderation' || statusProp === 'active'"
            class="edit-panel-elem"
            @click="editHandler({
                'Comment[status]': 'reject',
            })"
        >
            Скрыть
        </div>
        <div
            class="edit-panel-elem"
            @click="setShowConfirm(true)"
        >
            Удалить
        </div>
        <ConfirmComponent
            v-if="showConfirm"
            :set-show-confirm="setShowConfirm"
            :action="deleteHandler"
            :action-title="'Удалить'"
            :title="'Уверены что хотите удалить этoт комментарий?'"
        />
        <EditForm
            v-if="showForm"
            :set-show-form="setShowForm"
            :comment="comment"
            :edit="editHandler"
        />
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    PropType,
    ref,
    toRefs,
    computed,
} from 'vue';
import { useStore } from 'vuex';
import { IComment } from '@/store/types';
import vClickOutside from '@baiguangteng/vue3-click-outside';
import ConfirmComponent from '../../common-components/ConfirmComponent.vue';
import EditForm from './EditForm.vue';

export default defineComponent({
    components: {
        ConfirmComponent,
        EditForm,
    },
    directives: {
        clickOutside: vClickOutside,
    },
    props: {
        statusProp: {
            type: String,
            default: '',
            
        },
        setShowMenu: {
            type: Function as PropType<(show: boolean) => void>,
            required: true,
        },
        showMenu: {
            type: Boolean,
        },
        comment: {
            type: Object as ()=> IComment,
            require: true,
            default: () => {},
        },
    },
    setup(props) {
        const { comment } = toRefs(props);
        const store = useStore();
        const isAdmin = computed(() => store.state.isAdmin);

        const mounted = ref(false);

        const clickOutside = () => {
            if (mounted.value) {
                props.setShowMenu(false);
            } else {
                mounted.value = true;
            }
        };

        const showConfirm = ref(false);
        const setShowConfirm = (show: boolean) : void => {
            showConfirm.value = show;
        };

        const showForm = ref(false);
        const setShowForm = (show: boolean) : void => {
            showForm.value = show;
        };

        const deleteHandler = () => {
            if (comment.value) {
                store.dispatch('deleteComment', {
                    id: comment.value.id,
                    song_id: comment.value.song_id,
                });
            }
        };

        const editHandler = (data : object) => {
            if (comment.value) {
                store.dispatch('editComment', {
                    id: comment.value.id,
                    song_id: comment.value.song_id,
                    data,
                }).then(() => {
                    setShowForm(false);
                    props.setShowMenu(false);
                });
            }
        };

        return {
            clickOutside,
            mounted,
            showConfirm,
            setShowConfirm,
            deleteHandler,
            editHandler,
            showForm,
            setShowForm,
            isAdmin,
        };
    },
});
</script>

<style scoped>

</style>
