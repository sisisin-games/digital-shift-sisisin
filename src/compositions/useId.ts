export function useId() {
  let id = 0
  return () => id++
}
