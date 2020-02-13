<template>
  <div class="ground" :style="{ '--y': $state.y * 0.45 }" />
</template>

<style lang="scss" scoped>
@import '../styles/variables';

.ground {
  position: absolute;
  top: 70%;
  left: 0;
  right: 0;
  height: $sisisin_size * $main_aspect * 10;
  background-color: #000;
  transform: translateY(calc(var(--y) * 0.1%));
}
</style>
