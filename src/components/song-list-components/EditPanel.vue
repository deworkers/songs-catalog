<template>
    <div
        v-click-outside="clickOutside"
        class="edit-panel"
    >
        <div
            class="edit-panel-elem"
            @click="setShowConfirm(true)"
        >
            Удалить
        </div>
        <div
            class="edit-panel-elem"
            @click="setShowForm(true)"
        >
            Редактировать
        </div>
        <EditForm
            v-if="showForm"
            :set-show-form="setShowForm"
            :song="song"
        />
        <ConfirmComponent
            v-if="showConfirm"
            :set-show-confirm="setShowConfirm"
            :action="deleteHandler"
            :action-title="'Удалить'"
            :title="'Уверены что хотите удалить эту песню?'"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { ISong } from '@/store/types';
import vClickOutside from '@baiguangteng/vue3-click-outside';
import { mapActions } from 'vuex';
import EditForm from './EditForm.vue';
import ConfirmComponent from '../common-components/ConfirmComponent.vue';

export default defineComponent({
    name: 'EditPanel',
    directives: {
        clickOutside: vClickOutside,
    },
    components: {
        EditForm,
        ConfirmComponent,
    },
    props: {
        setShowPanel: {
            type: Function,
            default: () => {},
        },
        showPanel: {
            type: Boolean,
            default: false,
        },
        song: {
            type: Object as PropType<ISong>,
            default: () => {},
        },
    },
    data() {
        return {
            mounted: false,
            showForm: false,
            showConfirm: false,
        };
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
