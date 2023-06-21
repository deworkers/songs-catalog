<template>
    <div class="add-group">
        <div class="add-group-button" @click="setShowForm(true)">
            <img src="../../assets/add-song.svg" alt="">
            <span>Добавить подборку</span>
        </div>
        <AddGroupForm
            v-if="showForm"
            :setShowForm="setShowForm"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AddGroupForm from './AddGroupForm.vue';

export default defineComponent({
    name: ' AddGroup',
    data() {
        return {
            showForm: false,
        }
    },
    components: {
        AddGroupForm,
    },
    computed: {
    },
    methods: {
        setShowForm(show: boolean) {
            this.showForm = show;
        },
    },
});
</script>

<style lang="less">
.add-group-button {
    height: 150px;
    width: 150px;
    border-radius: 10px;
    border: 2px solid #D9D9D9;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    img {
        margin-bottom: 10px;
    }

    span {
        text-align: center;
        font-size: 14px;
    }
}
</style>
