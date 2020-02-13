<template>
  <transition-group tag="div" class="quote">
    <div v-for="(vars, i) in allVars" :key="`${i}`" class="text" :style="vars">{{ text }}</div>
  </transition-group>
</template>

<script>
import Vue from 'vue'
import { shuffle } from '../lib/common'

function randomize(n) {
  return Math.random() * 2 * n - n
}

export default Vue.extend({
  props: {
    text: { type: String, required: true },
  },
  data() {
    return {
      allVars: [],
    }
  },
  mounted() {
    const angles = shuffle([-60 + randomize(20), randomize(20), 60 + randomize(20)])

    this.allVars = [
      {
        '--size': 30,
        '--y': randomize(0.5),
        '--move-dir': Math.random() < 0.5 ? -1 : 1,
        '--move-distance': 20,
        '--angle': angles.pop(),
      },
      {
        '--size': 15,
        '--y': randomize(0.5),
        '--move-dir': Math.random() < 0.5 ? -1 : 1,
        '--move-distance': 50,
        '--angle': angles.pop(),
      },
      {
        '--size': 5,
        '--y': randomize(0.5),
        '--move-dir': Math.random() < 0.5 ? -1 : 1,
        '--move-distance': 80,
        '--angle': angles.pop(),
      },
    ]
  },
})
</script>

<style lang="scss" scoped>
.quote {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.2s;
  will-change: opacity;

  .scene-gameOver & {
    &.v-enter-active,
    &.v-leave-active {
      transform: translateY(100vh);
      transition-property: transform, opacity;
      transition-duration: 0.5s;
      transition-timing-function: ease-in;
    }
  }

  &.v-enter,
  &.v-leave-to {
    opacity: 0;
  }
}

.text {
  position: absolute;
  font-size: calc(var(--size) * 1vh);
  white-space: nowrap;
  opacity: calc(0.46 - 0.012 * var(--size));
  transform: rotate(calc(var(--angle) * 1deg))
    translate(calc(var(--move-dir) * var(--move-distance) / 2 * -1%), calc(var(--y) * 100vh));
  will-change: transform;

  &.v-enter-active {
    transition: transform 3s linear;
  }

  &.v-enter-to {
    transform: rotate(calc(var(--angle) * 1deg))
      translate(calc(var(--move-dir) * var(--move-distance) / 2 * 1%), calc(var(--y) * 100vh));
  }
}
</style>
