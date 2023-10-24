<template>
    <div class="add-song-form" @click.stop="hideForm">
        <div class="delete-song-body">
            <div class="close-popup" @click.stop="hideForm"></div>
            <h2 class="add-song-title">{{ title }}</h2>
            <div class="form-bottom">
                <button
                    class="add-song-prev"
                    @click="hideForm"
                    >
                    Отменить
                </button>
                <button
                    class="add-song-next"
                    @click="actionHandler"
                >
                    {{ actionTitle}}
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'EditForm',
    components: {
    },
    props: {
        setShowConfirm: {
            type: Function,
        },
        action: {
            type: Function,
        },
        title: {
            type: String,
            default: 'Подтвердите это действие',
        },
        actionTitle: {
            type: String,
            default: 'Подтвердить',
        },
    },
    methods: {
        hideForm(event:Event) {
            const element = event.target as HTMLElement;
            if (this.setShowConfirm && (element.classList.contains('add-song-form') || element.classList.contains('close-popup') || element.classList.contains('add-song-prev'))) {
                this.setShowConfirm(false);
            }
        },
        actionHandler() {
            if (this.action) {
                this.action();
            }
        },
    },
})
</script>

<style lang="less">
.delete-song-body {
    background: #fff;
    padding: 20px;
    border-radius: 10px;
    width: 650px;
    position: relative;
}
</style>
