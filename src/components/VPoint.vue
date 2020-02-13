<template>
  <div class="point" :style="{ '--x': cssX, '--y': cssY, '--r': r }" />
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

@keyframes bright {
  100% {
    background-color: #fff;
    box-shadow: 0 0 10px #fff;
  }
}

.point {
  position: absolute;
  left: 50%;
  bottom: 30%;
  width: $sisisin_size;
  height: $sisisin_size * $main_aspect;
  background: url(../assets/images/opt.png) #ff6 center/contain no-repeat;
  border-radius: 50%;
  box-shadow: 0 0 10px #ff0;
  transform: translate(calc(var(--x) * 1% - 50%), calc(var(--y) * 1%));
  animation: bright 0.5s linear alternate infinite calc(var(--r) * -0.5s);
  will-change: transform;

  .scene-gameOver &,
  .scene-replay & {
    animation: none;
  }
}
</style>
