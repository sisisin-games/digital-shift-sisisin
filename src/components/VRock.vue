<template>
  <div class="rock" :style="{ '--x': cssX, '--y': cssY, '--n': n }" />
</template>

<script>
import Vue from 'vue'
import { state } from '@/lib/state'

export default Vue.extend({
  props: {
    x: { type: Number, required: true },
    y: { type: Number, required: true },
    n: { type: Number, required: true },
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

.rock {
  position: absolute;
  left: 50%;
  bottom: 30%;
  width: $sisisin_size;
  height: $sisisin_size * $main_aspect;
  background: url(../assets/images/rocks.png) left/cover no-repeat;
  background-position-x: calc(100% / 11 * var(--n));
  filter: drop-shadow(0 5px 2px #000);
  transform: translate(calc(var(--x) * 1% - 50%), calc(var(--y) * 1%));
  will-change: transform;
}
</style>
