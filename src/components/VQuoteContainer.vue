<template>
  <div class="absolute leading-none text-shadow-1 pointer-events-none">
    <transition>
      <v-quote v-if="$state.quote" v-bind="$state.quote" />
    </transition>
  </div>
</template>
