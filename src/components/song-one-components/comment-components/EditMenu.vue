<template>
    <div class="edit-panel" v-click-outside="clickOutside">
        <div class="edit-panel-elem">Удалить</div>
        <div class="edit-panel-elem">Редактировать</div>
        <div
            class="edit-panel-elem"
            v-if="statusProp === 'moderation' || statusProp === 'reject'"
        >
            Опубликовать
        </div>
        <div
            class="edit-panel-elem"
            v-if="statusProp === 'active'"
        >
            Скрыть
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import vClickOutside from '@baiguangteng/vue3-click-outside';

export default defineComponent({
    props: {
        statusProp: {
            type: String,
        },
        setShowMenu: {
            type: Function as PropType<(show: boolean) => void>,
            required: true,
        },
        showMenu: {
            type: Boolean,
        },
    },
    directives: {
        clickOutside: vClickOutside,
    },
    setup(props) {
        const mounted = ref(false);

        const clickOutside = () => {
            if (mounted.value) {
                props.setShowMenu(false);
            } else {
                mounted.value = true;
            }
        }
        return {
            clickOutside,
            mounted,
        }
    },
})
</script>

<style scoped>

</style>
