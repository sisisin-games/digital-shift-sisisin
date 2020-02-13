import { randomTable } from '@/compositions/randomTable'
import { useId } from '@/compositions/useId'
import Vue from 'vue'
import pkg from '../../package.json'
import { Daisuke, GameState, Noboru, Point, Quote, Rock, TextEffect } from './types.js'

declare module 'vue/types/vue' {
  interface Vue {
    $state: typeof state
  }
}

function createInitialGameState() {
  return {
    scene: 'title' as GameState,
    lastUpdatedTime: 0,
    topLine: 0,

    x: 0,
    y: 0,
    dx: 0,
    dy: 0,
    score: 0,

    allBlocks: new Set<Rock | Point | Daisuke>(),
    allSpecialPoints: new Set<Noboru>(),
    allTextEffects: new Set<TextEffect>(),
    quote: undefined as Quote | undefined,
  }
}

export const state = Vue.observable({
  ...createInitialGameState(),

  get tutorialCompleted() {
    return localStorage.getItem(`${pkg.name}_tutorialCompleted`) === 'true'
  },
  set tutorialCompleted(value: boolean) {
    localStorage.setItem(`${pkg.name}_tutorialCompleted`, `${value}`)
  },

  get muted() {
    return localStorage.getItem(`${pkg.name}_muted`) !== 'false'
  },
  set muted(value: boolean) {
    localStorage.setItem(`${pkg.name}_muted`, `${value}`)
  },

  get blocks(): (Rock | Point | Daisuke | Noboru)[] {
    return [...state.allBlocks, ...state.allSpecialPoints].filter(filterViewable)
  },
})

function filterViewable(block: Rock | Point | Daisuke | Noboru): boolean {
  return state.y - 1_500 < block.y && block.y < state.y + 3_000
}

export const createId = useId()

export function prepareBlock(topLine: number) {
  state.topLine = topLine

  const type = randomTable({
    noboru: 0.001,
    daisuke: 0.005,
    point: 0.05,
    rock: 0.1 + topLine / 3_000,
  })

  if (type) {
    const id = createId()
    const x = Math.floor(Math.random() * 2_000) - 1_000
    const y = topLine * 200 + Math.random() * 100

    switch (type) {
      case 'noboru':
        if (state.scene === 'game') {
          state.allSpecialPoints.add({ type, id, x, y, dy: -10 })
        }
        return

      case 'daisuke':
        state.allBlocks.add({ type, id, x, y })
        return

      case 'point':
        state.allBlocks.add({ type, id, x, y })
        return

      case 'rock':
        state.allBlocks.add({ type, id, x, y, n: Math.floor(Math.random() * 12) })
        return
    }
  }
}

export function initGameState() {
  Object.assign(state, createInitialGameState())

  for (let i = 5; i < 20; i++) {
    prepareBlock(i)
  }
}

Vue.prototype.$state = state
