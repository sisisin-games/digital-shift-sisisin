export function randomTable<T extends Record<string, number>>(table: T): keyof T | undefined {
  let r = Math.random()
  return Object.entries(table).find(([, value]) => {
    if (r < value) {
      return true
    }
    r -= value
  })?.[0]
}
