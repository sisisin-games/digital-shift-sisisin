<template>
  <div
    class="text-effect absolute flex justify-center items-center text-5xl leading-none font-audiowide"
    :style="{ '--x': cssX, '--y': cssY }"
  >
    {{ text }}
  </div>
</template>

<script>
import Vue from 'vue'
import { state } from '@/lib/state'

export default Vue.extend({
  props: {
    text: { type: String, required: true },
    x: { type: Number, required: true },
    y: { type: Number, required: true },
  },
  computed: {
    cssX() {
      return this.x * 0.45
    },
    cssY() {
      return (state.y - this.y) * 0.45
    },
  },
})
</script>

<style lang="scss" scoped>
@import '../styles/variables';

.text-effect {
  left: 50%;
  bottom: 30%;
  width: $sisisin_size;
  height: $sisisin_size * $main_aspect;
  transform: translate(calc(var(--x) * 1% - 50%), calc(var(--y) * 1%));
  will-change: transform;
}
</style>
