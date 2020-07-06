<template>
  <div
    v-if="$state.score <= $state.currentHighScore"
    class="replay absolute flex flex-col items-center py-16 px-32 whitespace-no-wrap font-audiowide backdrop-filter-blur animate__animated animate__faster animate__zoomInDown"
  >
    <div class="text-6xl uppercase">Game Over</div>
    <v-press-enter-key class="blink" @enter="$events.$emit('title')" />
  </div>
  <div
    v-else
    class="replay absolute flex flex-col items-center py-16 px-32 whitespace-no-wrap font-audiowide backdrop-filter-blur animate__animated animate__delay-1s animate__tada"
  >
    <div class="text-5xl uppercase animate__animated animate__flip">New Record</div>
    <div class="relative flex justify-center items-center my-4 leading-none">
      <div class="absolute right-100 flex justify-center items-center">
        <span class="text-2xl">{{ $state.currentHighScore }}</span>
        <v-icon class="text-6xl">arrow_right</v-icon>
      </div>
      <span class="text-6xl animate__animated animate__delay-2s animate__jello">{{ $state.score }}</span>
      <div class="absolute left-100 ml-4 text-2xl">(+{{ $state.score - $state.currentHighScore }})</div>
    </div>
    <v-press-enter-key class="blink" @enter="$events.$emit('title')" />
  </div>
</template>

<style lang="scss" scoped>
.replay {
  background-color: #0006;
}
</style>
