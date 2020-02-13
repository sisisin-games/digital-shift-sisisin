<template>
  <div class="font-audiowide">
    <v-document-event @keydown.enter="$emit('enter')" />
    Press Enter Key
  </div>
</template>
