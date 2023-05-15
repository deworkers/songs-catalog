<template>
    <aside>
        <TagsComponents />
        <PlayerComponent />
    </aside>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PlayerComponent from './side-components/PlayerComponent.vue';
import TagsComponents from './side-components/TagsComponents.vue';

export default defineComponent({
    name: 'SideComponent',
    components: {
        PlayerComponent,
        TagsComponents,
    },
});
</script>

<style lang="less">
aside {
    width: 25%;
}
</style>
