import Dexie from 'dexie'

export interface History {
  id?: number
  date: Date
  score: number
  altitude: number
  time: number
}

export type ProgressKey = 'jump' | 'point' | 'daisuke' | 'noboru' | 'dead'
export interface Progress {
  key: ProgressKey
  value: number
}

class Database extends Dexie {
  history: Dexie.Table<History, History['date']>
  progress: Dexie.Table<Progress, Progress['key']>

  constructor() {
    super('DigitalShiftSisisin')

    this.version(1).stores({
      history: '++id, date, score',
    })

    this.version(2).stores({
      history: '++id, date, score',
      progress: 'key',
    })

    this.history = this.table('history')
    this.progress = this.table('progress')
  }
}

export const database = new Database()

export async function getHighScore() {
  const entry = await database.history.orderBy('score').last()
  return entry?.score ?? 0
}

export async function incrementProgress(key: Progress['key'], value: Progress['value'] = 1) {
  await database.transaction('rw', database.progress, async () => {
    const kv = (await database.progress.get(key)) ?? { key, value: 0 }
    kv.value += value
    await database.progress.put(kv)
  })
}
