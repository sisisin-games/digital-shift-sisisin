<template>
  <div class="toolbar absolute top-0 right-0 flex mt-2 z-50">
    <v-icon
      v-if="$state.scene === 'title'"
      class="mr-2 cursor-pointer"
      title="チュートリアル"
      @click.stop="$events.$emit('tutorial')"
    >
      school
    </v-icon>
    <v-toggle-mute />
    <v-toggle-fullscreen />
  </div>
</template>
