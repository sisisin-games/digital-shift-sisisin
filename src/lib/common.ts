export function shuffle<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; 1 <= i; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const entry = arr[i]
    arr[i] = arr[j]
    arr[j] = entry
  }

  return arr
}

export function msleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
