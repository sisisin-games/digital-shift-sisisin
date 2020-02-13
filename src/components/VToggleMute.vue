<template>
  <div class="flex items-center select-none cursor-pointer" @click.stop="toggleMute">
    <v-icon v-if="$state.muted" class="mr-2" title="ミュート解除">volume_off</v-icon>
    <v-icon v-else class="mr-2" title="ミュート (消音)">volume_up</v-icon>
    <slot name="text" />
  </div>
</template>

<script>
import Vue from 'vue'
import { toggleMute } from '@/lib/sounds'

export default Vue.extend({
  methods: {
    toggleMute,
  },
})
</script>
