<template>
  <div
    class="main-container relative flex justify-center items-center overflow-hidden w-screen h-screen text-white"
    :class="[`scene-${$state.scene}`]"
  >
    <v-toolbar />
    <v-bg-image />
    <v-fps />
    <v-title v-if="$state.scene === 'title'" />
    <v-main v-else />
    <v-tutorial v-if="$state.scene === 'tutorial'" />
    <v-replay v-if="$state.scene === 'replay'" />
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
</style>
