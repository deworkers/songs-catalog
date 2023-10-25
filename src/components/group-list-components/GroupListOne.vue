<template>
    <div class="group-one">
        <div
            v-if="isAdmin"
            class="group-one-edit"
            @click="setShowPanel(true)"
        >
            <EditPanel
                v-if="showPanel"
                :set-show-panel="setShowPanel"
                :show-panel="showPanel"
                :group="group"
            />
        </div>
        <div @click="openGroup(group.id)">
            <div class="group-one__cover">
                <img
                    v-if="group.cover"
                    :src="group.cover"
                    alt=""
                >
            </div>
            <div class="group-one__name">
                {{ group.name }}
            </div>
            <div class="group-one__description">
                {{ group.description }}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { mapState } from 'vuex';
import { IGroup } from '@/store/types';
import EditPanel from './EditPanel.vue';

export default defineComponent({
    name: 'HomeView',
    components: {
        EditPanel,
    },
    props: {
        group: {
            type: Object as PropType<IGroup>,
            default: {} as IGroup,
        },
    },
    data() {
        return {
            showPanel: false,
        };
    },
    computed: {
        ...mapState(['isAdmin']),
    },
    methods: {
        openGroup(id: number) {
            this.$router.push({
                name: 'group',
                params: { id },
            });
        },
        setShowPanel(show: boolean) {
            this.showPanel = show;
        },
    },
});

</script>

<style lang="less">
.group-one-edit {
    position: relative;
    background: url('/src/assets/edit.svg') no-repeat 50% #F5F5F5;
    height: 30px;
    width: 100%;
    margin: 0 0 10px;
    border-radius: 5px;
}
</style>
