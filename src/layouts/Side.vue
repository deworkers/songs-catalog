<template>
    <aside />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapState } from 'vuex';

export default defineComponent({
    name: 'SideComponent',
    components: {
    },
    computed: {
        ...mapState(['isAdmin']),
    },
});
</script>

<style lang="less">
aside {
    width: 25%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
}
</style>
