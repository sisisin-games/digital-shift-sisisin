<template>
  <div class="noboru" :style="{ '--x': cssX, '--y': cssY, '--r': r }">
    <img class="w-full h-full object-contain" src="@/assets/images/noboru.png" />
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

@keyframes rainbow {
  100% {
    background-position-x: 600%;
  }
}

.noboru {
  position: absolute;
  left: 50%;
  bottom: 30%;
  width: $sisisin_size;
  height: $sisisin_size * $main_aspect;
  background: linear-gradient(90deg, #c3f, #33f, #3f3, #ff3, #fb3, #f33, #b3f) left/600%;
  border-radius: 50%;
  box-shadow: 0 0 10px #fff;
  transform: translate(calc(var(--x) * 1% - 50%), calc(var(--y) * 1%));
  animation: rainbow 5s linear infinite calc(var(--r) * -5s);
  will-change: transform;

  .scene-gameOver &,
  .scene-replay & {
    animation: none;
  }
}
</style>
