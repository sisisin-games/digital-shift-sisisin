<template>
  <div
    class="start-button flex flex-col items-center mt-20 py-4 px-40 font-audiowide text-2xl text-black cursor-pointer"
    tabindex="1"
    @click="start"
  >
    <template v-if="$state.tutorialCompleted">Start</template>
    <template v-else>Tutorial</template>
    <v-press-enter-key class="text-xs opacity-50" @enter="start" />
  </div>
</template>

<script>
import Vue from 'vue'
import { events } from '@/lib/events'
import { state } from '@/lib/state'

export default Vue.extend({
  methods: {
    start() {
      events.$emit(state.tutorialCompleted ? 'gameReady' : 'tutorial')
    },
  },
})
</script>

<style lang="scss" scoped>
.start-button {
  background-color: #fff6;

  &:hover {
    background-color: #fff7;
  }
}
</style>
