<template>
  <div
    class="replay absolute flex flex-col items-center py-16 px-32 whitespace-no-wrap font-audiowide animated delay-1s tada"
  >
    <div v-if="$state.score <= $state.currentHighScore" class="text-6xl uppercase">Game Over</div>
    <template v-else>
      <div class="text-5xl uppercase animated flip">New Record</div>
      <div class="relative flex justify-center items-center my-4 leading-none">
        <div class="absolute right-100 flex justify-center items-center">
          <span class="text-2xl">{{ $state.currentHighScore }}</span>
          <v-icon class="text-6xl">arrow_right</v-icon>
        </div>
        <span class="text-6xl animated delay-2s jello">{{ $state.score }}</span>
        <div class="absolute left-100 ml-4 text-2xl">
          (+{{ $state.score - $state.currentHighScore }})
        </div>
      </div>
    </template>
    <v-press-enter-key class="blink" @enter="$events.$emit('title')" />
  </div>
</template>

<style lang="scss" scoped>
.replay {
  background-color: #0006;
}

.left-100 {
  left: 100%;
}

.right-100 {
  right: 100%;
}
</style>
