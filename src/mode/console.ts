import color from '../color.js'
import { LOG_CONSOLE_MODE } from '../envron.js'

const colorizer: Record<string, string> = {
  trace: color.reset,
  debug: color.blue,
  info: color.green,
  warn: color.yellow,
  error: color.red
}

export function writeConsoleLog(level: string, log: string[]): void {
  const msg = [...log]

  if (LOG_CONSOLE_MODE.toLowerCase() === 'local') {
    msg.unshift(
      colorizer[level].concat(new Date().toISOString()),
      (level.length < 5 ? level + ' ' : level).toUpperCase()
    )
    msg.push(color.reset)
  } else msg.unshift(level.toUpperCase())
  if (['on', 'local'].includes(LOG_CONSOLE_MODE.toLowerCase())) process.stdout.write(msg.join(' '))
}
