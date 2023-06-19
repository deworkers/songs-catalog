<template>
    <div class="add-song">
        <div class="add-song-button" @click="setShowForm(true)">
            <img src="../assets/add-song.svg" alt="">
            <span>Добавить песню</span>
        </div>
        <AddSongForm
            v-if="showForm"
            :setShowForm="setShowForm"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AddSongForm from '../components/add-song-components/AddSongForm.vue';

export default defineComponent({
    name: 'AddSong',
    data() {
        return {
            showForm: false,
        }
    },
    components: {
        AddSongForm,
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
.add-song {
    margin: 15px;
    width: 100%;
}

.add-song-button {
    height: 90px;
    border: 2px solid #D9D9D9;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    img {
        margin-right: 25px;
    }

    span {
        font-size: 24px;
        font-weight: 700;
        color: #707070;

    }
}
</style>
