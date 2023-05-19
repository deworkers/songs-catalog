<template>
    <div class="add-song-form" @click="hideForm">
        <div class="add-song-body">
            <div class="close-popup" @click="hideForm"></div>
            <h2 class="add-song-title">Редактирование песни</h2>
            <div>
                <div class="edit-form-input">
                    <label>Название песни</label>
                    <input name="name" type="text" v-model="localForm.name">
                </div>
                <div class="edit-form-input">
                    <label>Файл песни</label>
                    <input name="song" type="file" v-on:change="selectFile($event)">
                </div>
                <div class="edit-form-input">
                    <label>Автор слов</label>
                    <input name="author" type="text" v-model="localForm.author">
                </div>
                <div class="edit-form-input">
                    <label>Композитор</label>
                    <input name="composer" type="text" v-model="localForm.composer">
                </div>
                <div class="edit-form-input">
                    <label>Исполняет</label>
                    <input name="singer" type="text" v-model="localForm.singer">
                </div>
                <div class="edit-form-input">
                    <label>Ссылка на клип</label>
                    <input name="cover" type="text" v-model="localForm.clip">
                </div>
                <div class="edit-form-input">
                    <label>Обложка</label>
                    <input name="clip" type="file" v-on:change="selectCover($event)">
                </div>
                <div class="edit-form-input">
                    <label>Описание</label>
                    <input
                        name="description"
                        type="text"
                        v-model="localForm.description"
                    >
                </div>
            </div>
            <div class="edit-form-bottom">
                <button
                    class="add-song-prev"
                    @click="hideForm"
                    >
                    Отменить
                </button>
                <button
                    class="add-song-next"
                    @click="submit"
                >
                    Сохранить
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { ISong } from '@/store/index';
import { mapActions } from 'vuex';

export default defineComponent({
    name: 'EditForm',
    components: {
    },
    props: {
        setShowForm: {
            type: Function,
        },
        song: {
            type: Object as PropType<ISong>,
        },
    },
    data() {
        return {
            localForm: {} as ISong,
            formData: new FormData(),
        }
    },
    methods: {
        ...mapActions(['getList', 'edit']),
        hideForm(event:Event) {
            const element = event.target as HTMLElement;
            if (this.setShowForm && (element.classList.contains('add-song-form') || element.classList.contains('close-popup') || element.classList.contains('add-song-prev'))) {
                this.setShowForm(false);
            }
        },
        selectFile(event: Event) {
            const element = event.target as HTMLInputElement;
            if (element.files) {
                const songFile = element.files[0];
                this.formData.append('Song[songFile]', songFile);
            } else {
                this.formData.delete('Song[songFile]');
            }
        },
        selectCover(event: Event) {
            const element = event.target as HTMLInputElement;
            if (element.files) {
                const coverFile = element.files[0];
                this.formData.append('Song[coverFile]', coverFile);
            } else {
                this.formData.delete('Song[coverFile]');
            }
        },
        submit() {
            if (this.song) {
                this.formData.append('Song[name]', this.localForm.name);
                if (this.localForm.composer) {
                    this.formData.append('Song[composer]', this.localForm.composer);
                }
                if (this.localForm.author) {
                    this.formData.append('Song[author]', this.localForm.author);
                }
                if (this.localForm.singer) {
                    this.formData.append('Song[singer]', this.localForm.singer);
                }
                if (this.localForm.clip) {
                    this.formData.append('Song[clip]', this.localForm.clip);
                }
                if (this.localForm.description) {
                    this.formData.append('Song[description]', this.localForm.description);
                }
                this.edit({
                    formData: this.formData,
                    id: this.song.id,
                })
                    .then(() => {
                        this.getList();
                        if (this.setShowForm) {
                            this.setShowForm(false);
                        }
                    });
            }
        },
    },
    mounted() {
        if (this.song) {
            this.localForm = JSON.parse(JSON.stringify(this.song))
        }
    },
});
</script>

<style lang="less">
.edit-form-input {
    display: flex;
    align-items: center;
    margin-bottom: 15px;

    label {
        width: 150px;
        text-align: right;
        font-size: 16px;
        margin-right: 10px;
    }

    input {
        width: calc(100% - 140px);
        height: 35px;
        border-radius: 5px;
        border: 1px solid #D9D9D9;
        padding: 0 10px;
    }

    input[type="file"] {
        padding: 5px;
    }
}

.edit-form-bottom {
    display: flex;
    justify-content: space-between;
    padding: 20px 0 0;
    border-top: 1px solid #ddd;
}
</style>
