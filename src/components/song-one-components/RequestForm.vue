<template>
    <div
        class="add-song-form"
        @click="hideFormHandler"
    >
        <div class="add-song-body">
            <div
                ref="close"
                class="close-popup"
                @click="hideFormHandler"
            />
            <h2 class="add-song-title">
                Запрос прав для трансляции
            </h2>
            <div v-if="!isSend">
                <div class="edit-form-input">
                    <label>Ваше имя</label>
                    <input
                        v-model="form.name"
                        name="name"
                        type="text"
                        @input="valid"
                    >
                </div>
                <div class="edit-form-input">
                    <label>Телефон для связи</label>
                    <input
                        v-model="form.phone"
                        v-mask="{ mask: '+7(###)### ####', options: { guide: true} }"
                        name="phone"
                        type="text"
                        placeholder="+7(911)1234567"
                        @input="valid"
                    >
                </div>
            </div>
            <div
                v-if="!isSend"
                class="form-bottom"
            >
                <button
                    class="add-song-prev"
                    @click="hideFormHandler"
                >
                    Отменить
                </button>
                <button
                    class="add-song-next"
                    :disabled="!isValid"
                    @click="submit"
                >
                    Отправить
                </button>
            </div>
            <div
                v-if="isSend"
                class="request-after"
            >
                <div class="request-after-message">
                    Запрос прав на трансляцию успешно оправлен,<br>
                    мы свяжемся с вами в ближайшее время
                </div>
                <a
                    :href="fileUrl"
                    download
                >Скачать песню в высоком качестве</a>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { vMask } from '@bardoui/vmask';
import { mapActions } from 'vuex';

export default defineComponent({
    name: 'RequestForm',
    directives: {
        mask: vMask,
    },
    props: {
        hideRequestForm: {
            type: Function,
            default: () => {},
        },
        songId: {
            type: Number,
            default: () => {},
        },
        fileUrl: {
            type: String,
            default: null,
        },
    },
    data() {
        return {
            form: {
                name: '',
                phone: '',
            },
            isValid: false,
            phoneReg: /^\+7\(\d{3}\)\d{3}\s?\d{2}\s?\d{2}$/,
            isSend: false,
        };
    },
    methods: {
        ...mapActions(['sendForm']),
        hideFormHandler(event:MouseEvent) {
            if (this.hideRequestForm) {
                this.hideRequestForm(event);
            }
        },
        valid() {
            if (this.phoneReg.test(this.form.phone) && this.form.name.length > 2) {
                this.isValid = true;
            } else {
                this.isValid = false;
            }
        },
        submit() {
            const formData = new FormData();
            formData.append('ContactForm[name]', this.form.name);
            formData.append('ContactForm[phone]', this.form.phone);
            formData.append('ContactForm[songId]', String(this.songId));
            this.sendForm({ formData }).then(() => {
                this.isSend = true;
            });
        },
    },
});
</script>

<style lang="less">
.add-song-next {
    &:disabled {
        opacity: 0.5;
    }
}

.request-after {
    text-align: center;

    a {
        text-decoration: underline;
    }
}

.request-after-message {
    font-size: 20px;
    margin-bottom: 20px;
}
</style>
