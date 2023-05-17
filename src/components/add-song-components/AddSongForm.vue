<template>
    <div class="add-song-form" @click="hideForm">
        <div class="add-song-body">
            <div class="close-popup" @click="hideForm"></div>
            <h2 class="add-song-title">Добавить песню</h2>
            <div class="steps">
                <div :class="['steps-marker', step >= 0 ? 'active' : '']"></div>
                <div :class="['steps-marker', step >= 1 ? 'active' : '']"></div>
                <div :class="['steps-marker', step >= 2 ? 'active' : '']"></div>
                <div :class="['steps-marker', step >= 3 ? 'active' : '']"></div>
                <div :class="['steps-marker', step >= 4 ? 'active' : '']"></div>
                <div :class="['steps-marker', step >= 5 ? 'active' : '']"></div>
            </div>
            <div class="steps-tabs">
                <div class="steps-tab" v-if="step == 0">
                    <div class="steps-tab-title">1. Введите название песни</div>
                    <div class="steps-tab-body">
                        <input type="text" v-model="form.name">
                        <div
                            v-if="!valid"
                            class="error"
                        >
                            Введите название песни чтобы продолжить
                        </div>
                    </div>
                </div>
                <div class="steps-tab" v-if="step == 1">
                    <div class="steps-tab-title">2. Загрузите файл песни</div>
                    <div class="steps-tab-body">
                        <div v-if="!song" class="song-upload">
                            <input type="file" v-on:change="selectFile($event)">
                            <div class="song-upload-label">Перетащите сюда или </div>
                            <button class="add-song-next">Выберете файл</button>
                        </div>
                        <div v-else class="song-info">
                            <div class="song-info-left">
                                {{ song.name }}
                            </div>
                            <div class="song-info-right">
                                {{ byteToMegabyte(song.size) }} мб
                                <button @click="removeSong" class="trash"></button>
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
                <div class="steps-tab" v-if="step == 2">
                    <div class="steps-tab-title">3. Введите композитора</div>
                    <div class="steps-tab-body">
                        <input type="text" v-model="form.composer">
                    </div>
                </div>
                <div class="steps-tab" v-if="step == 3">
                    <div class="steps-tab-title">4. Введите автора слов</div>
                    <div class="steps-tab-body">
                        <input type="text" v-model="form.author">
                    </div>
                </div>
                <div class="steps-tab" v-if="step == 4">
                    <div class="steps-tab-title">5. Введите исполнителя</div>
                    <div class="steps-tab-body">
                        <input type="text" v-model="form.singer">
                    </div>
                </div>
                <div class="steps-tab" v-if="step == 5">
                    <div class="steps-tab-title">6. Вставьте ссылку на клип</div>
                    <div class="steps-tab-body">
                        <div class="clip-form">
                            <input type="text" v-model="form.clip">
                            <div class="clip-form-bottom">или добавьте изображение для обложки</div>
                        </div>
                        <div v-if="!cover" class="song-upload">
                            <input type="file" v-on:change="selectCover($event)">
                            <div class="song-upload-label">Перетащите сюда или </div>
                            <button class="add-song-next">Выберете файл</button>
                        </div>
                        <div v-else class="song-info">
                            <div class="song-info-left">
                                {{ cover.name }}
                            </div>
                            <div class="song-info-right">
                                {{ byteToMegabyte(cover.size) }} мб
                                <button @click="removeCover" class="trash"></button>
                            </div>
                        </div>
                        <div
                            v-if="!valid"
                            class="error"
                        >
                            Вставьте ссылку на клип или загрузите обложку чтобы продолжить
                        </div>
                        <a class="generate-song" href="https://fusionbrain.ai/diffusion" target="_black">Сгенерировать изображение</a>
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

interface IFile {
    name: string,
    size: number,
    type: string
}

export default defineComponent({
    name: 'AddSong',
    props: {
        setShowForm: {
            type: Function,
        },
    },
    components: {
    },
    data() {
        return {
            step: 0,
            maxSteps: 5,
            form: {
                name: '' as string,
                composer: '' as string,
                author: '' as string,
                singer: '' as string,
                clip: '' as string,
            },
            song: null as IFile | null,
            cover: null as IFile | null,
            formData: new FormData(),
            valid: true,
        }
    },
    computed: {
    },
    methods: {
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
                if (this.song) {
                    this.valid = true;
                } else {
                    this.valid = false;
                }
            } else if (this.step === 5) {
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
                this.step -= 1;
            }
        },
        toFormData() {
            this.formData.delete('name');
            this.formData.delete('composer');
            this.formData.delete('author');
            this.formData.delete('singer');
            this.formData.delete('clip');

            this.formData.append('name', this.form.name);
            this.formData.append('composer', this.form.composer);
            this.formData.append('author', this.form.author);
            this.formData.append('singer', this.form.singer);
            this.formData.append('clip', this.form.clip);
        },
        submit() {
            this.validate();
            if (this.valid) {
                this.toFormData();
                axios.post('/songs/', this.formData)
                    .then((response) => {
                        console.log(response);
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
                this.formData.append('song', song);
            } else {
                this.song = null;
                this.formData.delete('song');
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
                this.formData.append('cover', cover);
            } else {
                this.cover = null;
                this.formData.delete('cover');
            }
        },
        byteToMegabyte(byte: number) : string {
            return (byte / 1024 / 1024).toFixed(2);
        },
        removeCover() {
            this.cover = null;
            this.formData.delete('cover');
        },
        removeSong() {
            this.song = null;
            this.formData.delete('song');
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
}

.add-song-body {
    background: #fff;
    padding: 20px;
    border-radius: 10px;
    width: 800px;
    position: relative;
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
    background: url('/src/assets/close.svg') no-repeat 50%;
    width: 35px;
    height: 35px;
    cursor: pointer;
}

.error {
    padding-top: 10px;
    color: #E20000;
    font-size: 14px;
}
</style>
