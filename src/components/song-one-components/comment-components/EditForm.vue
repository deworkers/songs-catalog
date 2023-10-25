<template>
    <div
        class="add-song-form"
        @click="hideForm"
    >
        <div class="add-song-body">
            <div
                class="close-popup"
                @click="hideForm"
            />
            <h2 class="add-song-title">
                Редактирование комментария #{{ localForm.id }}
            </h2>
            <div>
                <div
                    v-if="isAdmin"
                    class="edit-form-input"
                >
                    <label>Статус</label>
                    <select v-model="localForm.status">
                        <option value="active">
                            Активен
                        </option>
                        <option value="moderation">
                            На модерации
                        </option>
                        <option value="reject">
                            Скрыт
                        </option>
                    </select>
                </div>
                <div class="edit-form-input">
                    <label>Описание</label>
                    <textarea
                        v-model="localForm.text"
                        name="description"
                        type="text"
                    />
                </div>
            </div>
            <div class="form-bottom">
                <button
                    class="add-song-prev"
                    @click="hideForm"
                >
                    Отменить
                </button>
                <button
                    class="add-song-next"
                    @click="submitHandler"
                >
                    Сохранить
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { IComment } from '@/store/types';
import {
    defineComponent,
    ref,
    onMounted,
    PropType,
    computed,
} from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
    props: {
        setShowForm: {
            type: Function,
            default: () => {},
        },
        comment: {
            type: Object as PropType<IComment>,
            default: () => {},
        },
        edit: {
            type: Function,
            default: () => {},
        },
    },
    setup(props) {
        const store = useStore();
        const isAdmin = computed(() => store.state.isAdmin);

        const localForm = ref({} as IComment);

        const hideForm = (event:Event) : void => {
            const element = event.target as HTMLElement;
            if (props.setShowForm && (element.classList.contains('add-song-form') || element.classList.contains('close-popup') || element.classList.contains('add-song-prev'))) {
                props.setShowForm(false);
            }
        };

        const submitHandler = () : void => {
            if (props.edit) {
                props.edit({
                    'Comment[text]': localForm.value.text,
                    'Comment[status]': localForm.value.status,
                });
            }
        };

        onMounted(() => {
            localForm.value = JSON.parse(JSON.stringify(props.comment));
        });
        return {
            localForm,
            hideForm,
            submitHandler,
            isAdmin,
        };
    },
});
</script>

<style lang="less">

</style>
