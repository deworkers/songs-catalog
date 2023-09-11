<template>
    <div class="comments-add">
        <textarea
            v-model="message"
            type="text"
            :class="['comments-add__input', active ? 'active' : '']"
            @focus="setActive(true)"
            @input="adjustTextareaHeight"
            placeholder="Введите комментарий"
            ref="textarea"
        ></textarea>
        <button
            v-if="active"
            type="button"
            class="comments-add__confirm"
            @click="submitForm"
        >Оставить комментарий</button>
        <button
            v-if="active"
            type="button"
            class="comments-add__abort"
            @click="clearInput()"
        >Отмена</button>
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    ref,
    watch,
    toRefs,
    computed,
} from 'vue';
import { useStore } from 'vuex';
import axios from 'axios';

export default defineComponent({
    name: 'CommentForm',
    props: {
        songId: {
            type: Number,
            required: true,
        },
        setShowForm: {
            type: Function,
        },
        parentID: {
            type: Number,
            default: 0,
        },
    },
    setup(props) {
        const store = useStore();

        const userID = computed(() => store.state.userID);

        const active = ref(false);
        const setActive = (boolean: boolean): void => {
            active.value = boolean;
        }

        const message = ref('');
        const clearInput = (): void => {
            message.value = '';
            setActive(false);
            if (props.setShowForm) {
                props.setShowForm(false);
            }
        }

        const textarea = ref<null | HTMLTextAreaElement>(null);
        const adjustTextareaHeight = () => {
            if (textarea.value) {
                textarea.value.style.minHeight = '0';
                textarea.value.style.height = 'auto';
                if (textarea.value.scrollHeight > 70) {
                    textarea.value.style.height = `${textarea.value.scrollHeight}px`
                } else {
                    textarea.value.style.height = '40px';
                }
            }
        };

        const { songId } = toRefs(props)
        watch(songId, () => {
            setActive(false);
        })

        const submitForm = () => {
            if (message.value.length > 2) {
                axios.post('/comment/', {
                    'Comment[author]': userID.value,
                    'Comment[text]': message.value,
                    'Comment[song_id]': songId.value,
                    'Comment[parent_id]': props.parentID ? props.parentID : null,
                }, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                    .then(() => {
                        clearInput();
                        store.dispatch('getSong', songId.value);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        }

        return {
            message,
            active,
            userID,
            textarea,
            clearInput,
            setActive,
            adjustTextareaHeight,
            submitForm,
        }
    },
})
</script>

<style lang="less">
.comments-add {
    display: flex;
    position: relative;
    &__input {
        border-radius: 5px;
        border: 1px solid #D9D9D9;
        padding: 10px;
        margin-right: 10px;
        width: 100%;
        resize: none;
        overflow: hidden;
        height: 40px;
        min-height: 40px;

        &.active {
            width: calc(100% - 370px);
        }
    }

    &__abort {
        background: #D9D9D9;
        font-size: 18px;
        color: #000;
        border-radius: 5px;
        height: 40px;
        width: 120px;
    }

    &__confirm {
        background: #0F87DE;
        font-size: 18px;
        color: #fff;
        border-radius: 5px;
        height: 40px;
        width: 230px;
        margin-right: 10px;
    }
}

</style>
