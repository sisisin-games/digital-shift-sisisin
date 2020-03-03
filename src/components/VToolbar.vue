<template>
  <div class="toolbar absolute top-0 right-0 flex mt-2 z-50">
    <v-icon
      v-if="$state.scene === 'title'"
      title="実績"
      class="mr-2 cursor-pointer"
      :class="{
        'text-yellow-500 badge-dot animated infinite tada': $state.newAchievementIds.length,
      }"
      @click.stop="$state.achievementShown = true"
    >
      assistant_photo
    </v-icon>
    <v-icon
      v-if="$state.scene === 'title'"
      title="チュートリアル"
      class="mr-2 cursor-pointer"
      @click.stop="$events.$emit('tutorial')"
    >
      school
    </v-icon>
    <div class="mx-2" />
    <v-toggle-mute />
    <v-toggle-fullscreen />
  </div>
</template>
