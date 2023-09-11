<template>
    <div class="edit-panel" v-click-outside="clickOutside">
        <div @click="setShowConfirm(true)" class="edit-panel-elem">Удалить</div>
        <div @click="setShowForm(true)" class="edit-panel-elem">Редактировать</div>
        <EditForm
            v-if="showForm"
            :setShowForm="setShowForm"
            :group="group"
        />
        <ConfirmComponent
            v-if="showConfirm"
            :setShowConfirm="setShowConfirm"
            :action="deleteHandler"
            :actionTitle="'Удалить'"
            :title="'Уверены что хотите удалить эту подборку?'"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { IGroup } from '@/store/types';
import vClickOutside from '@baiguangteng/vue3-click-outside';
import { mapActions } from 'vuex';
import EditForm from './EditForm.vue';
import ConfirmComponent from '../common-components/ConfirmComponent.vue';

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
        group: {
            type: Object as PropType<IGroup>,
        },
    },
    directives: {
        clickOutside: vClickOutside,
    },
    components: {
        EditForm,
        ConfirmComponent,
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
        ...mapActions(['deleteGroup']),
        clickOutside() {
            if (this.setShowPanel && this.mounted) {
                this.setShowPanel(false);
            } else {
                this.mounted = true;
            }
        },
        deleteHandler() {
            if (this.group) {
                this.deleteGroup(this.group.id);
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
    z-index: 10;
}

.edit-panel-elem {
    padding: 10px;
    border-bottom: 1px solid #ddd;
    cursor: pointer;

    &:hover {
        background: #ddd;
    }
    &:last-child {
        border: none;
    }
}
</style>
