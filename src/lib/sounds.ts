import { state } from './state'

const audioContext = new AudioContext()
const globalGainNode = audioContext.createGain()

globalGainNode.gain.value = state.muted ? 0 : 1
globalGainNode.connect(audioContext.destination)

export function toggleMute() {
  state.muted = !state.muted

  const { gain } = globalGainNode
  const { currentTime } = audioContext
  gain.cancelAndHoldAtTime(currentTime)
  gain.setValueAtTime(gain.value, currentTime)
  gain.linearRampToValueAtTime(state.muted ? 0 : 1, currentTime + 0.5)

  if (!state.muted) {
    audioContext.resume()
  }
}

async function promiseMapValues<T, U>(
  record: Record<string, T>,
  fn: (value: T) => Promise<U>,
): Promise<Record<string, U>> {
  const names = Object.keys(record)
  const values = await Promise.all(Object.values(record).map(fn))
  return names.reduce((acc, name, i) => ({ ...acc, [name]: values[i] }), {})
}

class BgmManager {
  currentName?: string
  currentSource?: AudioSource

  constructor(private sources: Record<string, AudioSource | undefined>) {}

  play(name: string) {
    if (this.currentName === name) {
      return
    }

    this.stop()

    const source = this.sources[name]
    source?.play(true)
    this.currentSource = source
  }

  stop() {
    this.currentSource?.stop()
  }

  static of(...args: ConstructorParameters<typeof BgmManager>) {
    return new BgmManager(...args)
  }
}

class SeManager {
  constructor(private sources: Record<string, AudioSource | undefined>) {}

  play(name: string) {
    this.sources[name]?.play()
  }

  static of(...args: ConstructorParameters<typeof SeManager>) {
    return new SeManager(...args)
  }
}

class AudioSource {
  private currentSource?: AudioBufferSourceNode

  constructor(private buffer: AudioBuffer) {}

  play(loop?: boolean) {
    this.currentSource = audioContext.createBufferSource()
    this.currentSource.buffer = this.buffer
    this.currentSource.loop = !!loop
    this.currentSource.connect(globalGainNode)
    this.currentSource.start()
  }

  stop() {
    this.currentSource?.stop()
  }

  static async load(src: string): Promise<AudioSource> {
    return new AudioSource(
      await new Promise(resolve => {
        const xhr = new XMLHttpRequest()
        xhr.responseType = 'arraybuffer'
        xhr.open('GET', src, true)
        xhr.onload = () => resolve(audioContext.decodeAudioData(xhr.response))
        xhr.send()
      }),
    )
  }
}

export const bgmManager = promiseMapValues(
  {
    title: require('@/assets/sounds/bgm_title.mp4'),
    tutorial: require('@/assets/sounds/bgm_tutorial.mp4'),
    game: require('@/assets/sounds/bgm_game.mp4'),
  },
  AudioSource.load,
).then(BgmManager.of)

export const seManager = promiseMapValues(
  {
    jump: require('@/assets/sounds/se_jump.mp4'),
    point: require('@/assets/sounds/se_point.mp4'),
    daisuke: require('@/assets/sounds/se_daisuke.mp4'),
    noboru: require('@/assets/sounds/se_noboru.mp4'),
    gameOver: require('@/assets/sounds/se_gameOver.mp4'),
    newRecord: require('@/assets/sounds/se_newRecord.mp4'),
  },
  AudioSource.load,
).then(SeManager.of)
