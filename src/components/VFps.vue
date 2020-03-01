<template>
  <div class="absolute top-0 left-0 mt-2 ml-2 text-xs font-audiowide">FPS: {{ fps }}</div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  data: () => ({
    fps: 0,
    counter1: 0,
    counter2: 0,
    useCount1: true,
    timer: null,
  }),
  created() {
    this.timer = setInterval(() => {
      if (this.useCount1) {
        this.fps = this.counter1
        this.counter1 = 0
      } else {
        this.fps = this.counter2
        this.counter2 = 0
      }
      this.useCount1 = !this.useCount1
    }, 500)

    const countUp = () => {
      this.counter1++
      this.counter2++

      if (this.timer) {
        requestAnimationFrame(countUp)
      }
    }

    countUp()
  },
  beforeDestroy() {
    clearInterval(this.timer)
    this.timer = null
  },
})
</script>
