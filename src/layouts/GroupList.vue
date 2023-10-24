<template>
    <div class="groups">
        <div class="groups-title">Подборки</div>
        <div class="group-list">
            <GroupListOne
                v-for="group in groups"
                :key="group.id"
                :group="group"
            />
            <AddGroup v-if="isAdmin"/>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapState } from 'vuex';
import AddGroup from '../components/group-list-components/AddGroup.vue';
import GroupListOne from '../components/group-list-components/GroupListOne.vue';

export default defineComponent({
    name: 'GroupOne',
    components: {
        AddGroup,
        GroupListOne,
    },
    computed: {
        ...mapState(['groups', 'isAdmin']),
    },
    methods: {
    },
});
</script>

<style lang="less">
.groups {
    padding: 15px 20px 15px;
    border-bottom: 1px solid #ddd;
}

.groups-title {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 15px;
}

.group-list {
    display: flex;
    overflow-x: auto;
}

.group-one {
    width: 150px;
    margin-right: 15px;
    cursor: pointer;
    position: relative;

    &:last-child {
        margin-right: 0;
    }
}

.group-one__cover {
    overflow: hidden;
    height: 150px;
    width: 150px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
    background: #0f87de;

    img {
        display: block;
        height: 150px;
    }
}

.group-one__name {
    font-size: 18px;
    font-weight: 700;
}

.group-one__description {
    font-size: 14px;
}

.group-edit-panel {
    font-size: 14px;
    padding: 10px;
    background: #ddd;
    border-radius: 8px;
}

.group-edit-one {
    text-decoration: underline;
    cursor: pointer;
    padding: 5px 0;
}
</style>
