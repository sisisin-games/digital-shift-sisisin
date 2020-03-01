import Dexie from 'dexie'

export interface History {
  id?: number
  date: Date
  score: number
  altitude: number
  time: number
}

class Database extends Dexie {
  history: Dexie.Table<History, History['date']>

  constructor() {
    super('DigitalShiftSisisin')

    this.version(1).stores({
      history: '++id, date, score',
    })

    this.history = this.table('history')
  }
}

export const database = new Database()

export async function getHighScore() {
  const entry = await database.history.orderBy('score').last()
  return entry?.score ?? 0
}
