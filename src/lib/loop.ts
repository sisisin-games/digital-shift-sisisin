import { events } from './events'
import { prepareBlock, state } from './state'

export function startUpdate() {
  update(performance.now())
}

export function update(time: number) {
  const scale = state.lastUpdatedTime ? (time - state.lastUpdatedTime) * 0.06 : 1

  let nextX = state.x + state.dx * scale

  if (1_000 < nextX) {
    state.dx *= -1
    nextX = 1_000 - (nextX % 1_000)
  } else if (nextX < -1_000) {
    state.dx *= -1
    nextX = -1_000 - (nextX % 1_000)
  }

  state.x = nextX
  state.y += state.dy * scale
  state.dy = Math.max(-60, state.dy - 3 * scale)
  state.lastUpdatedTime = time

  state.allSpecialPoints.forEach(sp => {
    switch (sp.type) {
      case 'noboru':
        sp.y += sp.dy * scale
        if (sp.y < 0) {
          state.allSpecialPoints.delete(sp)
        }
        break
    }
  })

  if (state.y < 0) {
    state.y = 0
    events.$emit('gameOver')
    return
  }

  for (const block of state.blocks) {
    if (Math.sqrt((state.x - block.x) ** 2 + (state.y - block.y) ** 2) < 200) {
      switch (block.type) {
        case 'point':
        case 'daisuke':
        case 'noboru':
          events.$emit(block.type, block)
          continue

        case 'rock':
          events.$emit('gameOver')
          return
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const never: never = block
    }
  }

  const topLine = Math.ceil(state.y / 200) + 20

  if (state.topLine < topLine) {
    prepareBlock(topLine)
  }

  requestAnimationFrame(update)
}
