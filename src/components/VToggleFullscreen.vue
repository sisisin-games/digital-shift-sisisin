<template>
  <v-icon v-if="isFullscreen" class="mr-2 cursor-pointer" title="フルスクリーン解除" @click.stop="exitFullscreen">
    fullscreen_exit
  </v-icon>
  <v-icon v-else class="mr-2 cursor-pointer" title="フルスクリーン" @click.stop="enterFullscreen">fullscreen</v-icon>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      isFullscreen: false,
      onFullscreenChange: null,
    }
  },
  mounted() {
    this.onFullscreenChange = () => {
      this.isFullscreen = !!document.fullscreenElement
    }
    document.addEventListener('fullscreenchange', this.onFullscreenChange)
  },
  destroyed() {
    document.removeEventListener('fullscreenchange', this.onFullscreenChange)
  },
  methods: {
    enterFullscreen() {
      document.querySelector('.main-container')?.requestFullscreen()
    },
    exitFullscreen() {
      document.exitFullscreen()
    },
  },
})
</script>
