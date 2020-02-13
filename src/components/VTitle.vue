<template>
  <div class="flex flex-col items-center w-full py-20 whitespace-no-wrap">
    <div>その変革に勇気と希望を</div>
    <h1 class="title-main text-6xl font-cinzel text-shadow-1">Digital Shift Sisisin</h1>
    <v-start-button />
    <v-toggle-mute class="mt-8">
      <template slot="text" v-if="$state.muted">ミュート解除</template>
      <template slot="text" v-else>ミュート (消音)</template>
    </v-toggle-mute>
  </div>
</template>
