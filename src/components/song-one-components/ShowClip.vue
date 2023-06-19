<template>
    <div class="add-song-form" @click="hideClipHandler">
        <div class="clip-popup">
            <div class="close-popup" @click="hideClipHandler"></div>
            <iframe width="100%" height="100%" :src="`https://www.youtube.com/embed/${getClipID(clip)}?autoplay=1`" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'ShowClip',
    props: {
        clip: {
            type: String,
            default: '',
        },
        hideClip: {
            type: Function,
        },
    },
    data() {
        return {}
    },
    methods: {
        hideClipHandler(event:MouseEvent) {
            if (this.hideClip) {
                this.hideClip(event);
            }
        },
        getClipID(url: string) {
            const regex = /v=([a-zA-Z0-9_-]{11})/;
            const match = url.match(regex);
            if (match) {
                return match[1];
            }
            return null;
        },
    },
});
</script>

<style lang="less"></style>
