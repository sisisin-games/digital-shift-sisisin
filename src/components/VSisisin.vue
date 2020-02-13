<template>
  <div class="sisisin" :class="{ left: $state.dx < 0 }" />
</template>

<style lang="scss" scoped>
@import '../styles/variables';

@keyframes ended {
  0% {
    transform: translateX(-50%);
  }
  100% {
    transform: translateX(-50%) rotate(360deg);
  }
}

.sisisin {
  position: absolute;
  left: 50%;
  bottom: 30%;
  width: $sisisin_size;
  height: $sisisin_size * $main_aspect;
  background: url(../assets/images/sisisin.png) no-repeat center/cover;
  filter: drop-shadow(0 0 1px #000) invert(1);
  transform: translateX(-50%);
  will-change: transform;

  &.left {
    transform: translateX(-50%) scaleX(-1);
  }

  .scene-gameOver & {
    animation: ended 0.5s linear 5;
  }
}
</style>
