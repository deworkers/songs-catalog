<template>
    <main>
        <div class="auth">
            <div class="auth-body">
                <h2 class="add-song-title">
                    Авторизация
                </h2>
                <div class="edit-form-input">
                    <label>Логин</label>
                    <input
                        v-model="username"
                        name="username"
                        type="text"
                        @input="valid"
                    >
                </div>
                <div class="edit-form-input">
                    <label>Пароль</label>
                    <input
                        v-model="password"
                        name="password"
                        type="password"
                        @input="valid"
                    >
                </div>
                <div
                    v-if="errorMessage"
                    class="error-message"
                >
                    {{ errorMessage }}
                </div>
                <div class="form-bottom form-bottom--login">
                    <button
                        class="add-song-next"
                        :disabled="!isValid"
                        @click="submit"
                    >
                        Авторизоваться
                    </button>
                </div>
            </div>
        </div>
    </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions } from 'vuex';

export default defineComponent({
    name: 'LoginView',
    data() {
        return {
            username: '',
            password: '',
            isValid: false,
            errorMessage: '',
        };
    },
    methods: {
        ...mapActions(['login']),
        submit() {
            this.errorMessage = '';
            const formData = new FormData();
            formData.append('LoginForm[username]', this.username);
            formData.append('LoginForm[password]', this.password);
            this.login({ formData }).then(({ status }) => {
                if (status === '200') {
                    this.$router.push('/');
                } else {
                    this.errorMessage = 'Неверная пара логин/пароль';
                }
            });
        },
        valid() {
            if (this.username.length > 2 && this.password.length) {
                this.isValid = true;
            } else {
                this.isValid = false;
            }
        },
    },
});
</script>

<style lang="less">
.auth {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}

.auth-body {
    width: 550px;
}

.form-bottom--login {
    justify-content: center;
}

.error-message {
    padding: 10px;
    color: #721c24;
    background-color: #f8d7da;
    border: 1px solid #f5c6cb;
    text-align: center;
    border-radius: 5px;
    margin-bottom: 15px;
}
</style>
