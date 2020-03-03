export type GameState =
  | 'uninitialized'
  | 'title'
  | 'tutorial'
  | 'gameReady'
  | 'game'
  | 'gameOver'
  | 'replay'

export interface Rock {
  type: 'rock'
  id: number
  x: number
  y: number
  n: number
}

export interface Point {
  type: 'point'
  id: number
  x: number
  y: number
}

export interface Daisuke {
  type: 'daisuke'
  id: number
  x: number
  y: number
}

export interface Noboru {
  type: 'noboru'
  id: number
  x: number
  y: number
  dy: number
}

export interface TextEffect {
  text: string
  x: number
  y: number
  key: number
}

export interface Quote {
  text: string
  key: number
}
