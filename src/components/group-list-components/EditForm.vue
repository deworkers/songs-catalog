<template>
    <div class="add-song-form" @click="hideForm">
        <div class="add-song-body">
            <div class="close-popup" @click="hideForm"></div>
            <h2 class="add-song-title">Редактирование подборки</h2>
            <div>
                <div class="edit-form-input">
                    <label>Название подборки</label>
                    <input name="name" type="text" v-model="localForm.name">
                </div>
                <div class="edit-form-input">
                    <label>Описание</label>
                    <textarea
                        name="description"
                        type="text"
                        v-model="localForm.description"
                    ></textarea>
                </div>
                <div class="edit-form-input">
                    <label>Обложка</label>
                    <input name="text" type="file" v-on:change="selectCover($event)">
                </div>
                <div class="edit-form-input">
                    <label>Ссылка на плейлист</label>
                    <input name="name" type="text" v-model="localForm.playlist">
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
import { IGroup } from '@/store/types';
import { mapActions, mapState } from 'vuex';

export default defineComponent({
    name: 'EditForm',
    props: {
        setShowForm: {
            type: Function,
        },
        group: {
            type: Object as PropType<IGroup>,
        },
    },
    data() {
        return {
            localForm: {} as IGroup,
            formData: new FormData(),
        }
    },
    computed: {
        ...mapState(['groups']),
    },
    methods: {
        ...mapActions(['getSongs', 'editGroup']),
        hideForm(event:Event) {
            const element = event.target as HTMLElement;
            if (this.setShowForm && (element.classList.contains('add-song-form') || element.classList.contains('close-popup') || element.classList.contains('add-song-prev'))) {
                this.setShowForm(false);
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
            if (this.group) {
                this.formData.append('Group[name]', this.localForm.name);
                this.formData.append('Group[description]', this.localForm.description ? this.localForm.description : '');
                this.formData.append('Group[playlist]', this.localForm.playlist ? this.localForm.playlist : '');

                this.editGroup({
                    formData: this.formData,
                    id: this.group.id,
                })
                    .then(() => {
                        this.getSongs();
                        if (this.setShowForm) {
                            this.setShowForm(false);
                        }
                    });
            }
        },
    },
    mounted() {
        if (this.group) {
            this.localForm = JSON.parse(JSON.stringify(this.group))
        }
    },
});
</script>
