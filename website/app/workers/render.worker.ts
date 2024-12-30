import type { GameState, WorkerMessage } from 'game-types'

class RenderWorker {
  private canvas: OffscreenCanvas | null = null
  private ctx: OffscreenCanvasRenderingContext2D | null = null
  private readonly frameTime = 1_000 / 60
  private lastFrameTime = 0
  private gameState: GameState | null = null

  constructor() {
    globalThis.onmessage = this.handleMessage.bind(this)
  }

  private handleMessage(event: MessageEvent) {
    const message = event.data as WorkerMessage

    switch (message.type) {
      case 'INIT':
        this.initializeCanvas(message.canvas)
        break
      case 'STATE_UPDATE':
        this.updateGameState(message.payload)
        break
    }
  }

  private initializeCanvas(canvas: OffscreenCanvas) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d', {
      alpha: true,
    })

    if (!this.ctx)
      throw new Error('Failed to get canvas context')

    this.startRenderLoop()
  }

  private startRenderLoop() {
    const renderFrame = (timestamp: number) => {
      if (timestamp - this.lastFrameTime >= this.frameTime) {
        this.render()
        this.lastFrameTime = timestamp
      }

      globalThis.requestAnimationFrame(renderFrame)
    }

    globalThis.requestAnimationFrame(renderFrame)
  }

  private render() {
    if (!this.ctx || !this.canvas || !this.gameState)
      return

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    this.ctx.fillStyle = '#000'
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

    // Render game elements
    this.renderBall()
    this.renderPaddles()
    this.renderScore()
  }

  private renderBall() {
    if (!this.ctx || !this.gameState)
      return

    const { x, y } = this.gameState.ball.position

    this.ctx.beginPath()
    this.ctx.arc(x, y, 5, 0, Math.PI * 2)
    this.ctx.fillStyle = '#fff'
    this.ctx.fill()
    this.ctx.closePath()
  }

  private renderPaddles() {
    if (!this.ctx || !this.gameState)
      return

    const positions = this.gameState.paddles.positions

    for (let i = 0; i < 2; i++) {
      const x = i === 0 ? 20 : this.canvas!.width - 30
      const y = positions[i]

      this.ctx.fillStyle = '#fff'
      this.ctx.fillRect(x, y, 10, 60)
    }
  }

  private renderScore() {
    if (!this.ctx || !this.gameState)
      return

    const score = this.gameState.score

    this.ctx.font = '48px Arial'
    this.ctx.fillStyle = '#fff'
    this.ctx.textAlign = 'center'

    this.ctx.fillText(
      score[0].toString(),
      this.canvas!.width / 4,
      50,
    )

    this.ctx.fillText(
      score[1].toString(),
      (this.canvas!.width / 4) * 3,
      50,
    )
  }

  private updateGameState(newState: GameState) {
    this.gameState = newState
  }
}

// Initialize the worker
const _worker = new RenderWorker()
