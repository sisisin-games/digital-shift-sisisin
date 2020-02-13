<template>
  <div class="layer" :style="{ '--x': $state.x, '--y': $state.y }">
    <v-ground />
    <component
      v-for="block in $state.blocks"
      :key="block.id"
      :is="`v-${block.type}`"
      v-bind="block"
    />
    <v-text-effect v-for="ef in $state.allTextEffects" :key="ef.key" v-bind="ef" />
  </div>
</template>

<style lang="scss" scoped>
@import '../styles/variables';

.layer {
  width: 100%;
  height: 100%;
  background: url(../assets/images/layer_bg.png) #0003 center calc(var(--y) * 0.067%) / contain;
  transform: translateX(calc(var(--x) * -0.045%));
  will-change: transform;
}
</style>
