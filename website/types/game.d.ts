declare module 'game-types' {
  export type Brand<T, K extends unique symbol = unique symbol> = T & {
    readonly __brand: K
  }

  export type Timestamp = Brand<number>

  export interface Vector2D {
    readonly x: number
    readonly y: number
  }

  export interface GameState {
    readonly timestamp: Timestamp
    readonly ball: {
      readonly position: Vector2D
      readonly velocity: Vector2D
    }
    readonly paddles: {
      readonly positions: Float32Array
      readonly velocities: Float32Array
    }
    readonly score: Uint32Array
  }

  export type WorkerMessageType =
    | 'INIT'
    | 'RENDER_FRAME'
    | 'STATE_UPDATE'
    | 'INPUT_EVENT'
    | 'NETWORK_MESSAGE'

  export interface WorkerMessage<T = unknown> {
    readonly type: WorkerMessageType
    readonly payload: T
    readonly timestamp: number
  }
}
