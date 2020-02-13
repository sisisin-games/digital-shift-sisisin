<template>
  <img
    class="bg-image absolute object-cover pointer-events-none"
    src="@/assets/images/background.jpg"
    :style="{ '--x': $state.x }"
  />
</template>

<style lang="scss" scoped>
.bg-image {
  width: 120%;
  height: 100%;
  max-width: none;
  transform: translateX(calc(var(--x) / 1000 * -5%));
  z-index: -1;
  will-change: transform;
}
</style>
