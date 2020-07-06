export function shuffle<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; 1 <= i; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const entry = arr[i]
    arr[i] = arr[j]
    arr[j] = entry
  }

  return arr
}

export async function msleep(ms: number): Promise<void>
export async function msleep<T>(ms: number, value: T): Promise<T>
export async function msleep<T>(ms: number, value?: T): Promise<T | undefined> {
  await new Promise(resolve => setTimeout(resolve, ms))
  return value
}
