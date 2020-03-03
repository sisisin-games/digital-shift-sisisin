<template>
  <main class="main relative flex justify-center items-center m-auto select-none">
    <v-document-event @keydown.shift="shift" />
    <v-layer />
    <v-sisisin />
    <v-quote-container />
    <div class="score absolute top-0 leading-none text-4xl text-center font-audiowide">
      {{ $state.score }}
    </div>
  </main>
</template>

<script>
import Vue from 'vue'
import { events } from '@/lib/events'
import { state } from '@/lib/state'
import { startUpdate } from '@/lib/loop'

export default Vue.extend({
  methods: {
    shift({ code }) {
      const { scene } = state

      if (scene !== 'gameReady' && scene !== 'game') {
        return
      }

      events.$emit('jump')
      state.dy = 60
      state.dx = code === 'ShiftLeft' ? -30 : 30

      if (scene === 'gameReady') {
        events.$emit('game')
        startUpdate()
      }
    },
  },
})
</script>

<style lang="scss" scoped>
@import '../styles/variables';

.main {
  width: 100vh * $main_aspect;
  height: 100vh;
  max-width: 100vw;
  max-height: 100vw / $main_aspect;
  cursor: none;
}

.score {
  text-shadow: 1px 2px #000;
}
</style>
