import type { GameState, Timestamp } from 'game-types'

export function useGameCanvas() {
  const canvasRef = shallowRef<HTMLCanvasElement | null>(null)
  const renderWorker = shallowRef<Worker | null>(null)
  const gameState = reactive<GameState>({
    timestamp: 0 as Timestamp,
    ball: {
      position: { x: 0, y: 0 },
      velocity: { x: 0, y: 0 },
    },
    paddles: {
      positions: new Float32Array(2),
      velocities: new Float32Array(2),
    },
    score: new Uint32Array(2),
  })

  function initializeCanvas() {
    if (!canvasRef.value)
      return

    const canvas = canvasRef.value
    const offscreen = canvas.transferControlToOffscreen()

    renderWorker.value = new Worker(
      new URL('../workers/render', import.meta.url),
      { type: 'module', name: 'render-worker' },
    )

    renderWorker.value.postMessage({
      type: 'INIT',
      payload: {
        canvas: offscreen,
      },
    }, [offscreen])
  }

  onMounted(initializeCanvas)
  onBeforeUnmount(() => renderWorker.value?.terminate())

  return {
    canvasRef,
    gameState,
  }
}
