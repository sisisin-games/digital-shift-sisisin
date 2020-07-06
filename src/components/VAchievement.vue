<template>
  <div v-if="loaded" class="achievement fixed inset-0 flex flex-col overflow-y-auto z-50">
    <v-document-event @keydown.esc="close" />
    <div class="bg fixed inset-0" @click="close" />
    <div class="m-auto p-16 backdrop-filter-blur">
      <div class="flex justify-between items-center mb-16 text-4xl font-hiragino">
        実績
        <div class="flex flex-col justify-between items-center ml-2 text-xs font-normal">
          <div class="flex w-64 h-3 mb-1 bg-white rounded-full overflow-hidden">
            <div class="bg-green-500" :style="{ width: `${(newAndActiveAtsCount / allAchievements.length) * 100}%` }" />
          </div>
          全
          {{ allAchievements.length.toLocaleString() }}
          実績のうち
          {{ newAndActiveAtsCount.toLocaleString() }}
          ({{ ((newAndActiveAtsCount / allAchievements.length) * 100).toFixed(1) }}%)
        </div>
        <v-icon class="cursor-pointer transform scale-150 text-base" @click="close">close</v-icon>
      </div>
      <table>
        <thead>
          <tr>
            <th class="border-b py-2 px-4">名称</th>
            <th class="border-b py-2 px-4">獲得条件</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="a in allAchievements" :key="a.id" :class="{ 'opacity-50': !isNew(a) && !isActive(a) }">
            <td class="py-2 px-4">
              <div class="flex justify-between items-center">
                <template v-if="isNew(a)">
                  {{ a.name }}
                  <v-icon class="ml-2 text-base text-yellow-500 animate__animated animate__infinite animate__tada">
                    fiber_new
                  </v-icon>
                </template>
                <template v-else-if="isActive(a)">
                  {{ a.name }}
                  <v-icon class="ml-2 text-base text-green-500">check</v-icon>
                </template>
                <template v-else>？？？</template>
              </div>
            </td>
            <td class="py-2 px-4">
              <div class="flex justify-between items-center">
                {{ a.description }}
                <div v-if="!isNew(a) && !isActive(a)" class="flex flex-col items-center ml-2 text-xs">
                  <div class="flex w-32 h-1 bg-white rounded-full overflow-hidden">
                    <div class="bg-green-500" :style="{ width: `${(getValue(a) / getMaxValue(a)) * 100}%` }" />
                  </div>
                  {{ getValue(a).toLocaleString() }} / {{ getMaxValue(a).toLocaleString() }}
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { allAchievements } from '@/lib/achievements'
import { database, getAllActiveAchievements, getAllProgresses } from '@/lib/database'
import { processAchievements } from '@/lib/events'
import { state } from '@/lib/state'

export default Vue.extend({
  data: () => ({
    loaded: false,
    allAchievements,
    activeAchievements: [],
    progresses: {},
  }),
  async beforeMount() {
    this.activeAchievements = await getAllActiveAchievements()
    this.progresses = await getAllProgresses()
    this.loaded = true
  },
  computed: {
    newAndActiveAtsCount() {
      return state.newAchievementIds.length + this.activeAchievements.length
    },
  },
  methods: {
    getValue(achievement) {
      return this.progresses[achievement.progress.key] ?? 0
    },
    getMaxValue(achievement) {
      return achievement.progress.value
    },
    isActive(achievement) {
      return this.activeAchievements.includes(achievement.id)
    },
    isNew(achievement) {
      return state.newAchievementIds.includes(achievement.id)
    },
    async markAsRead() {
      await database.achievement.bulkPut(state.newAchievementIds.map(id => ({ id })))
      await processAchievements()
    },
    async close() {
      await this.markAsRead()
      state.achievementShown = false
    },
  },
})
</script>

<style lang="scss">
.bg {
  background-color: #0006;
  z-index: -1;
}
</style>
