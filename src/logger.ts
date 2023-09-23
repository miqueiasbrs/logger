import EventEmitter from 'events'

interface LogEntry {
  level: string
  requestId?: string
  location?: string
  event: any
  metadata?: Record<string, any>
}

interface Level {
  trace: string
  debug: string
  info: string
  warn: string
  error: string
}

export class Logger {
  private readonly logManager: EventEmitter = new EventEmitter()

  private readonly levels: Record<string, number> = {
    trace: 1,
    debug: 2,
    info: 3,
    warn: 4,
    error: 5
  }

  constructor(private requestId: string = '', private metadata: Record<string, any> = {}) {
    this.logManager.on('log', (logEntry: LogEntry) => {
      const msg = JSON.stringify(logEntry)
      try {
        console[logEntry.level as keyof Level](msg)
      } catch (e) {
        console.log(msg)
      }
    })
  }

  static getLogger(): Logger {
    return new Logger()
  }

  trace(message?: any): void {
    this.log('trace', message)
  }

  debug(message?: any): void {
    this.log('debug', message)
  }

  info(message?: any): void {
    this.log('info', message)
  }

  warn(message?: any): void {
    this.log('warn', message)
  }

  error(message?: any): void {
    this.log('error', message)
  }

  setRequestId(requestId: string): void {
    this.requestId = requestId
  }

  setMetadata(metadata: Record<string, any>): void {
    this.metadata = metadata
  }

  private levelToInt(minLevel: string): number {
    if (minLevel.toLowerCase() in this.levels) {
      return this.levels[minLevel.toLowerCase()]
    } else {
      return 99
    }
  }

  private log(logLevel: string, message?: any): void {
    const level = this.levelToInt(logLevel)
    if (level < this.levelToInt(process.env.LOG_LEVEL ?? 'info')) return

    const logEntry: LogEntry = { level: logLevel, event: message }
    if (this.requestId) logEntry.requestId = this.requestId
    if (this.metadata) logEntry.metadata = this.metadata

    const error = new Error('')
    if (error.stack) {
      const cla = error.stack.split('\n')
      let idx = 1
      while (idx < cla.length && cla[idx].includes('at Logger')) idx++
      if (idx < cla.length) logEntry.location = cla[idx].slice(cla[idx].indexOf('(') + 1, cla[idx].length - 1)
    }

    this.logManager.emit('log', logEntry)
  }
}

export default Logger.getLogger()
