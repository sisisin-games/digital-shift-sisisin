<template>
  <div class="quote-container absolute leading-none pointer-events-none">
    <transition>
      <v-quote v-if="$state.quote" v-bind="$state.quote" />
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.quote-container {
  text-shadow: 0 0 0.5em #000;
}
</style>
