<template>
  <div class="sisisin absolute" :class="{ left: $state.dx < 0 }" />
</template>

<style lang="scss" scoped>
@import '../styles/variables';

.sisisin {
  bottom: 30%;
  width: $sisisin_size;
  height: $sisisin_size * $main_aspect;
  background: url(../assets/images/sisisin.png) no-repeat center/contain;
  filter: drop-shadow(0 0 1px #000) invert(1);
  transform: scaleX(var(--scaleX, 1)) rotate(calc(var(--rotate, 0) * 1deg));
  will-change: transform;

  &.left {
    --scaleX: -1;
  }

  .scene-gameOver &,
  .scene-replay & {
    --rotate: 360 * 5.5;
    transition: transform 2.5s linear;
  }
}
</style>
