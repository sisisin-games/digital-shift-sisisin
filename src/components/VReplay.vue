<template>
  <div class="replay absolute w-full py-12 text-center font-audiowide text-shadow-1">
    <div class="uppercase text-5xl">Game Over</div>
    <v-press-enter-key class="blink" @enter="$events.$emit('title')" />
  </div>
</template>
