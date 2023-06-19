<template>
    <div class="edit-panel" v-click-outside="clickOutside">
        <div @click="setShowConfirm(true)" class="edit-panel-elem">Удалить</div>
        <div @click="setShowForm(true)" class="edit-panel-elem">Редактировать</div>
        <EditForm
            v-if="showForm"
            :setShowForm="setShowForm"
            :song="song"
        />
        <ConfirmDelete
            v-if="showConfirm"
            :setShowConfirm="setShowConfirm"
            :delete="deleteHandler"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { ISong } from '@/store/index'
import vClickOutside from '@baiguangteng/vue3-click-outside';
import { mapActions } from 'vuex';
import EditForm from './EditForm.vue'
import ConfirmDelete from './ConfirmDelete.vue'

export default defineComponent({
    name: 'EditPanel',
    props: {
        setShowPanel: {
            type: Function,
        },
        showPanel: {
            type: Boolean,
            default: false,
        },
        song: {
            type: Object as PropType<ISong>,
        },
    },
    directives: {
        clickOutside: vClickOutside,
    },
    components: {
        EditForm,
        ConfirmDelete,
    },
    data() {
        return {
            mounted: false,
            showForm: false,
            showConfirm: false,
        }
    },
    computed: {
    },
    methods: {
        ...mapActions(['delete']),
        clickOutside() {
            if (this.setShowPanel && this.mounted) {
                this.setShowPanel(false);
            } else {
                this.mounted = true;
            }
        },
        deleteHandler() {
            if (this.song) {
                this.delete(this.song.id);
            }
        },
        showFormHandler() {
            if (this.setShowForm && this.setShowPanel) {
                this.setShowPanel(false);
                this.setShowForm(true);
            }
        },
        setShowForm(show: boolean) {
            this.showForm = show;
        },
        setShowConfirm(show: boolean) {
            this.showConfirm = show;
        },
    },
});
</script>

<style lang="less">
.edit-panel {
    position: absolute;
    background: #fff;
    top: 0;
    right: 0;
    border-radius: 5px;
    box-shadow: 0 0 5px rgba(0,0,0,0.5);
}

.edit-panel-elem {
    padding: 10px;
    border-bottom: 1px solid #ddd;
    &:hover {
        background: #ddd;
    }
    &:last-child {
        border: none;
    }
}
</style>
