<template>
    <div class="add-song-form" @click="hideFormHandler">
        <div class="add-song-body">
            <div
                class="close-popup"
                @click="hideFormHandler"
                ref="close"
            ></div>
            <h2 class="add-song-title">Запрос прав для трансляции</h2>
            <div>
                <div class="edit-form-input">
                    <label>Ваше имя</label>
                    <input
                        name="name"
                        type="text"
                        v-model="form.name"
                        @input="valid"
                    >
                </div>
                <div class="edit-form-input">
                    <label>Телефон для связи</label>
                    <input
                        name="phone"
                        v-mask="{ mask: '+7(###)### ####', options: { guide: true} }"
                        type="text"
                        v-model="form.phone"
                        placeholder="+7(911)1234567"
                        @input="valid"
                    >
                </div>
            </div>
            <div class="form-bottom">
                <button
                    class="add-song-prev"
                    @click="hideFormHandler"
                    >
                    Отменить
                </button>
                <button
                    class="add-song-next"
                    @click="submit"
                    :disabled="!isValid"
                >
                    Отправить
                </button>
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
    props: {
        hideRequestForm: {
            type: Function,
        },
    },
    directives: {
        mask: vMask,
    },
    data() {
        return {
            form: {
                name: '',
                phone: '',
            },
            isValid: false,
            phoneReg: /^\+7\(\d{3}\)\d{3}\s?\d{2}\s?\d{2}$/,
        }
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
            this.sendForm({ formData }).then(() => {
                const { close } = this.$refs as { close: HTMLButtonElement };
                close.click();
            });
        },
    },
    components: {
    },
    computed: {
    },
});
</script>

<style lang="less">
.add-song-next {
    &:disabled {
        opacity: 0.5;
    }
}
</style>
