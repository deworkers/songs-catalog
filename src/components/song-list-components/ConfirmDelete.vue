<template>
    <div class="add-song-form" @click="hideForm">
        <div class="delete-song-body">
            <div class="close-popup" @click="hideForm"></div>
            <h2 class="add-song-title">Уверены что хотите удалить эту песню?</h2>
            <div class="form-bottom">
                <button
                    class="add-song-prev"
                    @click="hideForm"
                    >
                    Отменить
                </button>
                <button
                    class="add-song-next"
                    @click="deleteHandler"
                >
                    Удалить
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
        delete: {
            type: Function,
        },
    },
    methods: {
        hideForm(event:Event) {
            const element = event.target as HTMLElement;
            if (this.setShowConfirm && (element.classList.contains('add-song-form') || element.classList.contains('close-popup') || element.classList.contains('add-song-prev'))) {
                this.setShowConfirm(false);
            }
        },
        deleteHandler() {
            if (this.delete) {
                this.delete();
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
    width: 600px;
    position: relative;
}
</style>
