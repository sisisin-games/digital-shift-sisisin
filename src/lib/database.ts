import Dexie from 'dexie'

export interface History {
  id?: number
  date: Date
  score: number
  altitude: number
  time: number
}

export type ProgressKey = 'score' | 'jump' | 'point' | 'daisuke' | 'noboru' | 'dead' | 'deadWithNoboru'
export interface Progress {
  key: ProgressKey
  value: number
}

interface Achievement {
  id: number
}

class Database extends Dexie {
  history: Dexie.Table<History, History['id']>
  progress: Dexie.Table<Progress, Progress['key']>
  achievement: Dexie.Table<Achievement, Achievement['id']>

  constructor() {
    super('DigitalShiftSisisin')

    this.version(1).stores({
      history: '++id, date, score',
    })

    this.version(2).stores({
      history: '++id, date, score',
      progress: 'key',
    })

    this.version(3).stores({
      history: '++id, date, score',
      progress: 'key',
      achievement: 'id',
    })

    this.history = this.table('history')
    this.progress = this.table('progress')
    this.achievement = this.table('achievement')
  }
}

export const database = new Database()

export async function getHighScore() {
  const entry = await database.history.orderBy('score').last()
  return entry?.score ?? 0
}

export async function getAllProgresses() {
  return (await database.progress.toArray()).reduce(
    (acc, cur) => ({ ...acc, [cur.key]: cur.value }),
    {} as Partial<Record<ProgressKey, number>>,
  )
}

export async function incrementProgress(key: Progress['key'], value: Progress['value'] = 1) {
  return database.transaction('rw', database.progress, async () => {
    const kv = (await database.progress.get(key)) ?? { key, value: 0 }
    kv.value += value
    await database.progress.put(kv)
    return kv.value
  })
}

export async function getAllActiveAchievements() {
  return database.achievement.toCollection().primaryKeys()
}
