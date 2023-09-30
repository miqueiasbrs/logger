import fs from 'fs'

import { LOG_FILE_DIR, LOG_FILE_MODE } from '../envron.js'

export function writeFileLog(level: string, log: string[]): void {
  const filename = new Date().toISOString().split('T')[0]
  const msg = [new Date().toISOString(), (level.length < 5 ? level + ' ' : level).toUpperCase(), ...log].join(' ')

  if (['join', 'split'].includes(LOG_FILE_MODE) && !fs.existsSync(`${LOG_FILE_DIR}`))
    fs.mkdirSync(LOG_FILE_DIR, { recursive: true })

  if (LOG_FILE_MODE?.toLowerCase() === 'join') fs.writeFileSync(`${LOG_FILE_DIR}/${filename}.log`, msg, { flag: 'a' })
  else if (LOG_FILE_MODE?.toLowerCase() === 'split') {
    fs.writeFileSync(`${LOG_FILE_DIR}/${level.toLowerCase()}-${filename}.log`, msg, { flag: 'a' })
  }
}
