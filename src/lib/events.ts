import Vue from 'vue'
import { getRandomQuoteText } from './quotes'
import { bgmManager, seManager } from './sounds'
import { createId, initGameState, state } from './state'
import { Daisuke, Noboru, Point, TextEffect } from './types'
import { database, getHighScore, incrementProgress } from './database'
import { msleep } from './common'

export const events = new Vue()

declare module 'vue/types/vue' {
  interface Vue {
    $events: typeof events
  }
}

Vue.prototype.$events = events

events.$on('title', async () => {
  initGameState()
  ;(await bgmManager).play('title')
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
  ;(await bgmManager).stop()
  ;(await seManager).play('gameOver')

  await Promise.all([
    msleep(2_500),
    incrementProgress('dead'),
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
  ;(await seManager).play('jump')
  await incrementProgress('jump')
})

events.$on('point', async (item: Point) => {
  state.score++
  state.allBlocks.delete(item)
  ;(await seManager).play('point')
  showRandomQuote()
  await showTextEffect({ text: '+1', x: item.x, y: item.y, key: createId() })
  await incrementProgress('point')
})

events.$on('daisuke', async (item: Daisuke) => {
  state.score += 10
  state.allBlocks.delete(item)
  ;(await seManager).play('daisuke')
  showRandomQuote()
  await showTextEffect({ text: '+10', x: item.x, y: item.y, key: createId() })
  await incrementProgress('daisuke')
})

events.$on('noboru', async (item: Noboru) => {
  state.score *= 2
  state.allSpecialPoints.delete(item)
  ;(await seManager).play('noboru')
  showRandomQuote()
  await showTextEffect({ text: 'x2', x: item.x, y: item.y, key: createId() })
  await incrementProgress('noboru')
})

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
