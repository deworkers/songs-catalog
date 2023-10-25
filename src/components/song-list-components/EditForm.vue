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
                Редактирование песни
            </h2>
            <div>
                <div class="edit-form-input">
                    <label>Название песни</label>
                    <input
                        v-model="localForm.name"
                        name="name"
                        type="text"
                    >
                </div>
                <div class="edit-form-input">
                    <label>Файл песни</label>
                    <input
                        name="song"
                        type="file"
                        @change="selectFile($event)"
                    >
                </div>
                <div class="edit-form-input">
                    <label>Подборка</label>
                    <Multiselect
                        v-model="selectedGroups"
                        :options="groups"
                        :multiple="true"
                        :searchable="false"
                        track-by="id"
                        placeholder="Выберите подборки"
                        label="name"
                    />
                </div>
                <div class="edit-form-input">
                    <label>Ссылка на клип</label>
                    <input
                        v-model="localForm.clip"
                        name="cover"
                        type="text"
                    >
                </div>
                <div class="edit-form-input">
                    <label>Обложка</label>
                    <input
                        name="clip"
                        type="file"
                        @change="selectCover($event)"
                    >
                </div>
                <div class="edit-form-input">
                    <label>Автор слов</label>
                    <input
                        v-model="localForm.author"
                        name="author"
                        type="text"
                    >
                </div>
                <div class="edit-form-input">
                    <label>Композитор</label>
                    <input
                        v-model="localForm.composer"
                        name="composer"
                        type="text"
                    >
                </div>
                <div class="edit-form-input">
                    <label>Исполняет</label>
                    <input
                        v-model="localForm.singer"
                        name="singer"
                        type="text"
                    >
                </div>
                <div class="edit-form-input">
                    <label>Описание</label>
                    <textarea
                        v-model="localForm.description"
                        name="description"
                        type="text"
                    />
                </div>
                <div class="edit-form-input">
                    <label>Ссылка на оригинал песни</label>
                    <input
                        v-model="localForm.original_file_url"
                        name="singer"
                        type="text"
                    >
                </div>
                <div class="edit-form-input">
                    <label>Файл текста песни и табулатуры</label>
                    <input
                        name="text"
                        type="file"
                        @change="selectText($event)"
                    >
                </div>
                <div class="edit-form-input">
                    <label>ID оригинала</label>
                    <input
                        v-model="localForm.originalId"
                        name="originalId"
                        type="text"
                    >
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
import Multiselect from 'vue-multiselect';
import { ISong, IGroup } from '@/store/types';
import { mapActions, mapState } from 'vuex';

export default defineComponent({
    name: 'EditForm',
    components: {
        Multiselect,
    },
    props: {
        setShowForm: {
            type: Function,
            default: () => {},
        },
        song: {
            type: Object as PropType<ISong>,
            default: () => {},
        },
    },
    data() {
        return {
            localForm: {} as ISong,
            formData: new FormData(),
            selectedGroups: [] as IGroup[],
        };
    },
    computed: {
        ...mapState(['groups']),
    },
    watch: {
        selectedGroups() {
            // this.localForm.groups = [];
            this.formData.delete('Song[groups]');
            const groups: number[] = [];
            this.selectedGroups.forEach((group: IGroup) => {
                groups.push(group.id);
            });
            this.formData.append('Song[groups]', JSON.stringify(groups));
        },
    },
    mounted() {
        if (this.song) {
            this.localForm = JSON.parse(JSON.stringify(this.song));
            this.selectedGroups = this.song.groups;
        }
    },
    methods: {
        ...mapActions(['getSongs', 'edit']),
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
        selectText(event: Event) {
            const element = event.target as HTMLInputElement;
            if (element.files) {
                const textFile = element.files[0];
                this.formData.append('Song[textFile]', textFile);
            } else {
                this.formData.delete('Song[textFile]');
            }
        },
        submit() {
            if (this.song) {
                this.formData.append('Song[name]', this.localForm.name);
                this.formData.append('Song[composer]', this.localForm.composer ? this.localForm.composer : '');
                this.formData.append('Song[author]', this.localForm.author ? this.localForm.author : '');
                this.formData.append('Song[singer]', this.localForm.singer ? this.localForm.singer : '');
                this.formData.append('Song[clip]', this.localForm.clip ? this.localForm.clip : '');
                this.formData.append('Song[description]', this.localForm.description ? this.localForm.description : '');
                this.formData.append('Song[originalId]', this.localForm.originalId ? this.localForm.originalId : '');
                this.formData.append('Song[original_file_url]', this.localForm.original_file_url ? this.localForm.original_file_url : '');

                this.edit({
                    formData: this.formData,
                    id: this.song.id,
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

    textarea {
        border: 1px solid #D9D9D9;
        width: calc(100% - 140px);
        border-radius: 5px;
        padding: 10px;
        height: 120px;
    }
}

.form-bottom {
    display: flex;
    justify-content: space-between;
    padding: 20px 0 0;
    border-top: 1px solid #ddd;
}

.multiselect * {
    box-sizing: border-box;
}

.multiselect {
    box-sizing: content-box;
    display: block;
    position: relative;
    width: calc(100% - 140px);
    min-height: 40px;
    text-align: left;
    color: #35495e;

    &--active {
        .multiselect__select {
            transform: rotate(180deg);
        }
    }
}

.multiselect__tags {
    min-height: 35px;
    display: block;
    padding: 7px 40px 0 10px;
    border-radius: 5px;
    border: 1px solid #e8e8e8;
    background: #fff;
    font-size: 14px;
}

.multiselect__tags-wrap {
    display: inline;
}

.multiselect__tag {
    position: relative;
    display: inline-block;
    padding: 4px 26px 4px 10px;
    border-radius: 5px;
    margin-right: 10px;
    color: #fff;
    line-height: 1;
    background: #0F87DE;
    margin-bottom: 5px;
    white-space: nowrap;
    overflow: hidden;
    max-width: 100%;
    text-overflow: ellipsis;
}

.multiselect__content-wrapper {
    position: absolute;
    display: block;
    background: #fff;
    width: 100%;
    max-height: 240px;
    overflow: auto;
    border: 1px solid #e8e8e8;
    border-top: none;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    z-index: 3;
    -webkit-overflow-scrolling: touch;
}

.multiselect__content {
    list-style: none;
    display: inline-block;
    padding: 0;
    margin: 0;
    min-width: 100%;
    vertical-align: top;
}

.multiselect__option {
    display: block;
    padding: 12px;
    min-height: 40px;
    line-height: 16px;
    text-decoration: none;
    text-transform: none;
    vertical-align: middle;
    position: relative;
    cursor: pointer;
    white-space: nowrap;
}

.multiselect__option--selected {
    background: #ddd;
}

.multiselect__select {
    position: absolute;
    width: 35px;
    height: 33px;
    right: 1px;
    top: 1px;
    padding: 4px 8px;
    text-align: center;
    transition: transform .2s ease;

    &::before {
        position: relative;
        right: 0;
        top: 65%;
        color: #999;
        margin-top: 4px;
        border-style: solid;
        border-width: 5px 5px 0;
        border-color: #999 transparent transparent;
        content: "";
    }
}

.multiselect__tag-icon {
    cursor: pointer;
    margin-left: 7px;
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    font-weight: 700;
    font-style: normal;
    width: 22px;
    text-align: center;
    line-height: 22px;
    transition: all .2s ease;
    border-radius: 5px;
}

.multiselect__tag-icon:after {
    content: "\D7";
    color: #fff;
    font-size: 14px;
}
</style>
