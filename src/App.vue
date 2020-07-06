<template>
  <div
    class="main-container relative flex justify-center items-center overflow-hidden w-screen h-screen text-white"
    :class="[`scene-${$state.scene}`]"
  >
    <transition>
      <div
        v-if="$state.scene === 'uninitialized'"
        class="uninitialized fixed inset-0 flex justify-center items-center select-none"
      >
        <span class="text-3xl font-audiowide animate__animated animate__infinite animate__pulse">Loading...</span>
      </div>
    </transition>
    <v-bg-image />
    <template v-if="$state.scene !== 'uninitialized'">
      <v-toolbar />
      <v-fps />
      <v-achievement v-if="$state.achievementShown" />
      <v-title v-else-if="$state.scene === 'title'" />
      <v-main v-else />
      <v-tutorial v-if="$state.scene === 'tutorial'" />
      <v-replay v-if="$state.scene === 'replay'" />
    </template>
  </div>
</template>

<style lang="scss" scoped>
.main-container {
  &.scene-gameOver {
    filter: invert(1);
  }

  &.scene-replay {
    filter: invert(1) grayscale(1);
    transition: filter 1s;
  }
}

.uninitialized {
  background-color: #0006;
  z-index: 9999;

  &.v-leave-to {
    opacity: 0;
    transition: opacity 0.2s;
    will-change: opacity;
  }
}
</style>
