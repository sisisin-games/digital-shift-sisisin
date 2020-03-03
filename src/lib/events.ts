import Vue from 'vue'
import { allAchievements } from './achievements'
import { msleep } from './common'
import {
  database,
  getAllActiveAchievements,
  getHighScore,
  incrementProgress,
  getAllProgresses,
} from './database'
import { getRandomQuoteText } from './quotes'
import { bgmManager, seManager } from './sounds'
import { createId, initGameState, state } from './state'
import { Daisuke, Noboru, Point, TextEffect } from './types'

export const events = new Vue()

declare module 'vue/types/vue' {
  interface Vue {
    $events: typeof events
  }
}

Vue.prototype.$events = events

events.$on('title', async () => {
  state.scene = 'title'
  initGameState()
  ;(await bgmManager).play('title')

  await processAchievements()
})

events.$on('tutorial', async () => {
  state.scene = 'tutorial'
  ;(await bgmManager).play('tutorial')
})

events.$on('tutorialCompleted', async () => {
  state.tutorialCompleted = true
  events.$emit('gameReady')
})

events.$on('gameReady', async () => {
  state.currentHighScore = await getHighScore()
  state.scene = 'gameReady'
  ;(await bgmManager).play('game')
})

events.$on('game', async () => {
  state.scene = 'game'
  state.startTime = Date.now()
})

events.$on('gameOver', async () => {
  const now = new Date()

  state.scene = 'gameOver'
  state.quote = undefined
  state.allTextEffects.clear()

  events.$emit('incrementProgress', 'score', state.score)
  events.$emit('incrementProgress', 'dead')

  if (nearbyNoboruExists()) {
    events.$emit('incrementProgress', 'deadWithNoboru')
  }

  ;(await bgmManager).stop()
  ;(await seManager).play('gameOver')

  await Promise.all([
    msleep(2_500),
    database.history.add({
      date: now,
      score: state.score,
      altitude: state.topLine,
      time: now.getTime() - state.startTime,
    }),
  ])

  events.$emit('replay')
})

events.$on('replay', async () => {
  state.scene = 'replay'

  if (state.currentHighScore < state.score) {
    ;(await seManager).play('newRecord')
  }
})

events.$on('jump', async () => {
  events.$emit('incrementProgress', 'jump')
  ;(await seManager).play('jump')
})

events.$on('point', async (item: Point) => {
  state.score++
  state.allBlocks.delete(item)

  events.$emit('incrementProgress', 'point')
  ;(await seManager).play('point')

  showRandomQuote()
  showTextEffect({ text: '+1', x: item.x, y: item.y, key: createId() })
})

events.$on('daisuke', async (item: Daisuke) => {
  state.score += 10
  state.allBlocks.delete(item)

  events.$emit('incrementProgress', 'daisuke')
  ;(await seManager).play('daisuke')

  showRandomQuote()
  showTextEffect({ text: '+10', x: item.x, y: item.y, key: createId() })
})

events.$on('noboru', async (item: Noboru) => {
  state.score *= 2
  state.allSpecialPoints.delete(item)

  events.$emit('incrementProgress', 'noboru')
  ;(await seManager).play('noboru')

  showRandomQuote()
  showTextEffect({ text: 'x2', x: item.x, y: item.y, key: createId() })
})

events.$on('incrementProgress', incrementProgress)

export async function processAchievements() {
  const progresses = await getAllProgresses()
  const ids = new Set(await getAllActiveAchievements())

  state.newAchievementIds = allAchievements
    .filter(a => !ids.has(a.id))
    .filter(a => a.progress.value <= (progresses[a.progress.key] ?? 0))
    .map(a => a.id)
}

async function showTextEffect(ef: TextEffect) {
  state.allTextEffects.add(ef)
  await new Promise(resolve => setTimeout(resolve, 1_000))
  state.allTextEffects.delete(ef)
}

async function showRandomQuote() {
  const text = getRandomQuoteText()
  const quote = { text, key: createId() }
  state.quote = quote
  await new Promise(resolve => setTimeout(resolve, 3_000))
  if (state.quote === quote) {
    state.quote = undefined
  }
}

function nearbyNoboruExists() {
  return [...state.allSpecialPoints].some(n => Math.abs(state.y - n.y) < 2_000)
}
