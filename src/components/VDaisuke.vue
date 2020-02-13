<template>
  <div class="daisuke" :style="{ '--x': cssX, '--y': cssY, '--r': r }">
    <img class="w-full h-full object-contain" src="@/assets/images/daisuke.png" />
  </div>
</template>

<script>
import Vue from 'vue'
import { state } from '@/lib/state'

export default Vue.extend({
  props: {
    x: { type: Number, required: true },
    y: { type: Number, required: true },
  },
  data() {
    return {
      r: Math.random(),
    }
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

@keyframes scroll-bg-x {
  100% {
    background-position-x: 200%;
  }
}

.daisuke {
  position: absolute;
  left: 50%;
  bottom: 30%;
  width: $sisisin_size;
  height: $sisisin_size * $main_aspect;
  background: linear-gradient(90deg, #f6f, #ff0, #f6f) left/200% repeat-x;
  border-radius: 50%;
  box-shadow: 0 0 10px #ff0;
  transform: translate(calc(var(--x) * 1% - 50%), calc(var(--y) * 1%));
  animation: scroll-bg-x 0.5s linear infinite calc(var(--r) * -0.5s);
  will-change: transform;

  .scene-gameOver &,
  .scene-replay & {
    animation: none;
  }
}
</style>
