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
                Добавить {{ originalId ? 'другую версию песни' : 'песню' }}
            </h2>
            <div class="steps">
                <div :class="['steps-marker', step >= 0 ? 'active' : '']" />
                <div :class="['steps-marker', step >= 1 ? 'active' : '']" />
                <div :class="['steps-marker', step >= 2 ? 'active' : '']" />
                <div :class="['steps-marker', step >= 3 ? 'active' : '']" />
                <div :class="['steps-marker', step >= 4 ? 'active' : '']" />
                <div :class="['steps-marker', step >= 5 ? 'active' : '']" />
                <div :class="['steps-marker', step >= 6 ? 'active' : '']" />
            </div>
            <div class="steps-tabs">
                <div
                    v-if="step == 0"
                    class="steps-tab"
                >
                    <div class="steps-tab-title">
                        1. Введите название песни
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
                            Введите название песни чтобы продолжить
                        </div>
                    </div>
                </div>
                <div
                    v-if="step == 1"
                    class="steps-tab"
                >
                    <div class="steps-tab-title">
                        2. Загрузите файл песни
                    </div>
                    <div class="steps-tab-body">
                        <div
                            v-if="!song"
                            class="song-upload"
                        >
                            <input
                                type="file"
                                @change="selectFile($event)"
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
                                {{ song.name }}
                            </div>
                            <div class="song-info-right">
                                {{ byteToMegabyte(song.size) }} мб
                                <button
                                    class="trash"
                                    @click="removeSong"
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
                        3. Введите композитора
                    </div>
                    <div class="steps-tab-body">
                        <input
                            v-model="form.composer"
                            name="composer"
                            type="text"
                        >
                    </div>
                </div>
                <div
                    v-if="step == 3"
                    class="steps-tab"
                >
                    <div class="steps-tab-title">
                        4. Введите автора слов
                    </div>
                    <div class="steps-tab-body">
                        <input
                            v-model="form.author"
                            name="author"
                            type="text"
                        >
                    </div>
                </div>
                <div
                    v-if="step == 4"
                    class="steps-tab"
                >
                    <div class="steps-tab-title">
                        5. Введите исполнителя
                    </div>
                    <div class="steps-tab-body">
                        <input
                            v-model="form.singer"
                            name="singer"
                            type="text"
                        >
                    </div>
                </div>
                <div
                    v-if="step == 5"
                    class="steps-tab"
                >
                    <div class="steps-tab-title">
                        6. Введите описание
                    </div>
                    <div class="steps-tab-body">
                        <input
                            v-model="form.description"
                            name="singer"
                            type="text"
                        >
                    </div>
                </div>
                <div
                    v-if="step == 6"
                    class="steps-tab"
                >
                    <div class="steps-tab-title">
                        7. Вставьте ссылку на клип
                    </div>
                    <div class="steps-tab-body">
                        <div class="clip-form">
                            <input
                                v-model="form.clip"
                                type="text"
                            >
                            <div class="clip-form-bottom">
                                или добавьте изображение для обложки
                            </div>
                        </div>
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
                            Вставьте ссылку на клип или загрузите обложку чтобы продолжить
                        </div>
                        <a
                            class="generate-song"
                            href="https://fusionbrain.ai/diffusion"
                            target="_black"
                        >Сгенерировать изображение</a>
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
                    Добавить песню
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
    name: 'AddSong',
    components: {
    },
    props: {
        setShowForm: {
            type: Function,
            default: () => {}
        },
        originalId: {
            type: Number,
            default: null,
        },
    },
    data() {
        return {
            step: 0,
            maxSteps: 6,
            form: {
                name: '' as string,
                composer: '' as string,
                author: '' as string,
                singer: '' as string,
                clip: '' as string,
                description: '' as string,
                originalId: null as number | null,
            },
            song: null as IFile | null,
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
                if (this.song || this.originalId) {
                    this.valid = true;
                } else {
                    this.valid = false;
                }
            } else if (this.step === 6) {
                if (this.cover || this.form.clip) {
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
            this.formData.delete('Song[name]');
            this.formData.delete('Song[composer]');
            this.formData.delete('Song[author]');
            this.formData.delete('Song[singer]');
            this.formData.delete('Song[clip]');
            this.formData.delete('Song[description]');
            this.formData.delete('Song[originalId]');

            this.formData.append('Song[name]', this.form.name);
            this.formData.append('Song[composer]', this.form.composer);
            this.formData.append('Song[author]', this.form.author);
            this.formData.append('Song[singer]', this.form.singer);
            this.formData.append('Song[clip]', this.form.clip);
            this.formData.append('Song[description]', this.form.description);
            if (this.originalId) {
                this.formData.append('Song[originalId]', this.originalId.toString());
            }
        },
        submit() {
            this.validate();
            if (this.valid) {
                this.toFormData();
                axios.post('/song/', this.formData, {
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
        selectFile(event: Event) {
            const element = event.target as HTMLInputElement;
            if (element.files) {
                const song = element.files[0];
                this.song = {
                    name: song.name,
                    size: song.size,
                    type: song.type,
                };
                this.formData.append('Song[songFile]', song);
                this.valid = true;
            } else {
                this.song = null;
                this.formData.delete('Song[songFile]');
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
                this.formData.append('Song[coverFile]', cover);
            } else {
                this.cover = null;
                this.formData.delete('Song[coverFile]');
            }
        },
        byteToMegabyte(byte: number) : string {
            return (byte / 1024 / 1024).toFixed(2);
        },
        removeCover() {
            this.cover = null;
            this.formData.delete('Song[cover]');
        },
        removeSong() {
            this.song = null;
            this.formData.delete('Song[songFile]');
        },
    },
});
</script>

<style lang="less">
.add-song-form {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    background: rgba(0, 0, 0, 0.7);
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: auto;
}

.add-song-body {
    background: #fff;
    padding: 20px;
    border-radius: 10px;
    width: 800px;
    position: relative;
    max-height: 100%;
    overflow: auto;
}

.add-song-title {
    font-size: 24px;
    font-weight: 700;
    text-align: center;
    margin-bottom: 20px;
}

.add-song-bottom {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    padding: 30px 7.5% 0;
}

.steps {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 30px;
}

.steps-marker {
    position: relative;
    flex-grow: 1;
    display: flex;
    justify-content: center;
    &:after {
        content: "";
        display: block;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background: #D9D9D9;
        z-index: 1;
    }
    &::before {
        content: "";
        width: 100%;
        height: 3px;
        background: #D9D9D9;
        display: block;
        position: absolute;
        top: 6px;
        z-index: 0;
        left: -50%;
    }

    &:first-child {
        &::before {
            display: none;
        }
    }

    &.active {
        &:after {
            background: #0F87DE;
        }
        &::before {
            background: #0F87DE;
        }
    }
}

.add-song-next {
    background: #0F87DE;
    font-size: 18px;
    color: #fff;
    border-radius: 5px;
    height: 40px;
    width: 180px;
}

.add-song-prev {
    background: #D9D9D9;
    font-size: 18px;
    color: #000;
    border-radius: 5px;
    height: 40px;
    width: 180px;
}

.steps-tab {
    padding: 0 7.5%;
}

.steps-tab-title {
    font-size: 18px;
    margin-bottom: 10px;
}

.steps-tab-body {
    input {
        width: 100%;
        height: 35px;
        border-radius: 5px;
        border: 1px solid #D9D9D9;
        padding: 0 10px;
    }
}

.song-upload {
    width: 100%;
    height: 130px;
    border: 2px dashed #B8B8B8;
    background: #F5F5F5;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    position: relative;

    input {
        opacity: 0;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        cursor: pointer;
    }
}

.song-upload-label {
    font-size: 24px;
    font-weight: 700;
    color: #707070;
    margin-right: 10px;
}

.song-info {
    display: flex;
    width: 100%;
    justify-content: space-between;
}

.song-info-left {
    font-size: 16px;
    line-height: 35px;
}

.song-info-right {
    display: flex;
    align-items: center;
    font-size: 16px;
    line-height: 35px;
}

.trash {
    background: url('/src/assets/trash.svg') no-repeat 50%;
    width: 35px;
    height: 35px;
    margin-left: 10px;
}

.clip-form-bottom {
    text-align: center;
    font-size: 18px;
    font-weight: 700;
    padding: 20px 0 ;
}

.generate-song {
    display: block;
    text-align: center;
    margin: 10px 0 0;
    text-decoration: underline !important;
    color: #0F87DE;
    font-size: 18px;
}

.close-popup {
    position: absolute;
    top: 0;
    right: 0;
    background: url('/src/assets/close.svg') no-repeat 8px 8px #fff;
    width: 35px;
    height: 35px;
    cursor: pointer;
    border-radius: 10px;
}

.error {
    padding-top: 10px;
    color: #E20000;
    font-size: 14px;
}
</style>
