import { consola, type ConsolaInstance } from 'consola'

assertWorkerScope(globalThis)

const logger = consola.withTag('render-worker')
const on = globalThis.addEventListener.bind(globalThis)

main({ logger })

interface MainOptions {
  logger: ConsolaInstance
}

type EventPayload<T extends Record<string, any>> = {
  [K in keyof T]: T[K] extends void | undefined
    ? { type: K, payload: undefined }
    : { type: K, payload: T[K] }
}[keyof T]

interface WorkerEventMap {
  incoming: {
    INIT: { canvas: OffscreenCanvas }
    READY: { timestamp: number }
    TERMINATE: void
  }
}

type IncomingMessage = EventPayload<WorkerEventMap['incoming']>

function _isIncomingType<T extends keyof WorkerEventMap['incoming']>(
  msg: IncomingMessage,
  type: T,
): msg is Extract<IncomingMessage, { type: T }> {
  return msg.type === type
}

function main(options: MainOptions) {
  on('message', (event: MessageEvent<IncomingMessage>) => {
    options.logger.debug(event)

    const { type, payload } = event.data

    switch (type) {
      case 'INIT':
        options.logger.log('Initializing canvas', payload.canvas)
        break

      case 'READY':
        options.logger.log('Canvas ready', payload.timestamp)
        break

      case 'TERMINATE':
        options.logger.log('Terminating', payload)
        break

      default:
        options.logger.error(`Unknown message type: ${type}`)
        break
    }
  })
}

function isWorkerScope(scope: unknown): scope is WorkerGlobalScope {
  if (!scope)
    return false

  return typeof WorkerGlobalScope !== 'undefined'
    && scope instanceof WorkerGlobalScope
    && 'importScripts' in scope
}

function assertWorkerScope(scope: unknown): asserts scope is WorkerGlobalScope {
  if (!isWorkerScope(scope)) {
    const error = new Error('This script must be run in a worker scope', {
      cause: {
        scope,
        type: typeof scope,
      },
    })

    throw error
  }
}
