import { EventEmitter } from 'events'

import { writeConsoleLog, writeFileLog } from './mode/index.js'
import { LOG_CONSOLE_MODE } from './envron.js'

interface LogEntry {
  level: string
  requestId?: string
  location?: string
  event: any
  metadata?: Record<string, any>
}

export class Logger {
  private readonly _log: EventEmitter = new EventEmitter()
  private readonly _levels: Record<string, number> = {
    trace: 1,
    debug: 2,
    info: 3,
    warn: 4,
    error: 5
  }

  _requestId = ''
  _metadata?: Record<string, any>

  constructor() {
    this._log.on('log', (logEntry: LogEntry) => {
      try {
        const stdout: string[] = [
          logEntry.requestId ?? '',
          JSON.stringify({
            event: logEntry.event,
            metadata: logEntry.metadata,
            location: logEntry.location
          }),
          '\n'
        ]

        writeConsoleLog(logEntry.level, stdout)
        writeFileLog(logEntry.level, stdout)
      } catch (e) {
        console.log(e)
        console.log(JSON.stringify(logEntry))
      }
    })
  }

  static getLogger(): Logger {
    return new Logger()
  }

  setRequestId(requestId: string): void {
    this._requestId = requestId
  }

  setMetadata(metadata: Record<string, any>): void {
    this._metadata = metadata
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

  log(logLevel: string, message?: any): void {
    const level = this.__levelToInt(logLevel)
    if (level < this.__levelToInt(process.env.LOG_LEVEL ?? 'info')) return

    const logEntry: LogEntry = {
      level: logLevel,
      event: message
    }
    if (this._requestId) logEntry.requestId = this._requestId
    if (this._metadata) logEntry.metadata = this._metadata

    const error = new Error('')
    if (error.stack) {
      const cla = error.stack.split('\n')
      let idx = 1
      while (idx < cla.length && cla[idx].includes('at Logger')) idx++
      if (idx < cla.length)
        logEntry.location = cla[idx]
          .slice(cla[idx].indexOf('(') + 1, cla[idx].length - 1)
          .replace('at ', '')
          .trim()
    }
    this._log.emit('log', logEntry)
  }

  private __levelToInt(minLevel: string): number {
    if (minLevel.toLowerCase() in this._levels) {
      return this._levels[minLevel.toLowerCase()]
    } else {
      return 99
    }
  }
}

export default Logger.getLogger()
