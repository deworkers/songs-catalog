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
                Добавить подборку
            </h2>
            <div class="steps">
                <div :class="['steps-marker', step >= 0 ? 'active' : '']" />
                <div :class="['steps-marker', step >= 1 ? 'active' : '']" />
                <div :class="['steps-marker', step >= 2 ? 'active' : '']" />
            </div>
            <div class="steps-tabs">
                <div
                    v-if="step == 0"
                    class="steps-tab"
                >
                    <div class="steps-tab-title">
                        1. Введите название подборки
                    </div>
                    <div class="steps-tab-body">
                        <input
                            v-model="form.name"
                            type="text"
                        >
                        <div
                            v-if="!valid"
                            class="error"
                        >
                            Введите название подборки
                        </div>
                    </div>
                </div>
                <div
                    v-if="step == 1"
                    class="steps-tab"
                >
                    <div class="steps-tab-title">
                        2. Загрузите файл обложки
                    </div>
                    <div class="steps-tab-body">
                        <div
                            v-if="!cover"
                            class="song-upload"
                        >
                            <input
                                type="file"
                                @change="selectCover($event)"
                            >
                            <div class="song-upload-label">
                                Перетащите сюда или
                            </div>
                            <button class="add-song-next">
                                Выберете файл
                            </button>
                        </div>
                        <div
                            v-else
                            class="song-info"
                        >
                            <div class="song-info-left">
                                {{ cover.name }}
                            </div>
                            <div class="song-info-right">
                                {{ byteToMegabyte(cover.size) }} мб
                                <button
                                    class="trash"
                                    @click="removeCover"
                                />
                            </div>
                        </div>
                        <div
                            v-if="!valid"
                            class="error"
                        >
                            Загрузите песню чтобы продолжить
                        </div>
                    </div>
                </div>
                <div
                    v-if="step == 2"
                    class="steps-tab"
                >
                    <div class="steps-tab-title">
                        3. Введите описание
                    </div>
                    <div class="steps-tab-body">
                        <input
                            v-model="form.description"
                            name="singer"
                            type="text"
                        >
                    </div>
                </div>
            </div>
            <div class="add-song-bottom">
                <button
                    v-if="step < maxSteps"
                    class="add-song-next"
                    @click="next"
                >
                    Дальше
                </button>
                <button
                    v-if="step == maxSteps"
                    class="add-song-next"
                    @click="submit"
                >
                    Добавить подборку
                </button>
                <button
                    v-if="step > 0"
                    class="add-song-prev"
                    @click="prev"
                >
                    Назад
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue';
import { mapActions } from 'vuex';

interface IFile {
    name: string,
    size: number,
    type: string
}

export default defineComponent({
    name: 'AddGroupForm',
    components: {
    },
    props: {
        setShowForm: {
            type: Function,
            default: () => {},
        },
    },
    data() {
        return {
            step: 0,
            maxSteps: 2,
            form: {
                name: '' as string,
                description: '' as string,
            },
            cover: null as IFile | null,
            formData: new FormData(),
            valid: true,
        };
    },
    computed: {
    },
    watch: {
        form: {
            deep: true,
            handler() {
                this.valid = true;
            },
        },
    },
    methods: {
        ...mapActions(['getSongs']),
        hideForm(event:Event) {
            const element = event.target as HTMLElement;
            if (this.setShowForm && (element.classList.contains('add-song-form') || element.classList.contains('close-popup'))) {
                this.setShowForm(false);
            }
        },
        validate() {
            if (this.step === 0) {
                if (this.form.name.length > 2) {
                    this.valid = true;
                } else {
                    this.valid = false;
                }
            } else if (this.step === 1) {
                if (this.cover) {
                    this.valid = true;
                } else {
                    this.valid = false;
                }
            } else {
                this.valid = true;
            }
        },
        next() {
            this.validate();
            if (this.step < this.maxSteps && this.valid) {
                this.step += 1;
            }
        },
        prev() {
            if (this.step > 0) {
                this.valid = true;
                this.step -= 1;
            }
        },
        toFormData() {
            this.formData.delete('Group[name]');
            this.formData.delete('Group[description]');

            this.formData.append('Group[name]', this.form.name);
            this.formData.append('Group[description]', this.form.description);
        },
        submit() {
            this.validate();
            if (this.valid) {
                this.toFormData();
                axios.post('/group/', this.formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                    .then(() => {
                        if (this.setShowForm) {
                            this.setShowForm(false);
                            this.getSongs().then(() => {
                                console.log('load');
                            });
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        },
        selectCover(event: Event) {
            const element = event.target as HTMLInputElement;
            if (element.files) {
                const cover = element.files[0];
                this.cover = {
                    name: cover.name,
                    size: cover.size,
                    type: cover.type,
                };
                this.valid = true;
                this.formData.append('Group[coverFile]', cover);
            } else {
                this.cover = null;
                this.formData.delete('Group[coverFile]');
            }
        },
        byteToMegabyte(byte: number) : string {
            return (byte / 1024 / 1024).toFixed(2);
        },
        removeCover() {
            this.cover = null;
            this.formData.delete('Group[coverFile]');
        },
    },
});
</script>
