<template>
    <div class="groups">
        <div class="groups-title">Подборки</div>
        <div class="group-list">
            <div
                v-for="group in groups"
                :key="group.id"
                class="group-one"
                @click="openGroup(group.id)"
            >
                <div class="group-one__cover">
                    <img :src="group.cover" alt="">
                </div>
                <div class="group-one__name">
                    {{ group.name }}
                </div>
                <div class="group-one__description">
                    {{ group.description }}
                </div>
            </div>
            <AddGroup/>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapState } from 'vuex';
import AddGroup from '../components/group-list-components/AddGroup.vue';

export default defineComponent({
    name: 'GroupOne',
    components: {
        AddGroup,
    },
    computed: {
        ...mapState(['groups']),
    },
    methods: {
        openGroup(id: number) {
            this.$router.push({
                name: 'group',
                params: { id },
            });
        },
    },
});
</script>

<style lang="less">
.groups {
    padding: 20px 15px;
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

    img {
        display: block;
        height: 150px;
    }
}

.group-one__name {
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 5px;
}

.group-one__description {
    font-size: 14px;
}
</style>
