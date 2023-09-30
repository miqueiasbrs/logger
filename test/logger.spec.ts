import logger, { Logger } from '../src/logger.js'

describe('Logger', () => {
  it('test default logger module', () => {
    const logTraceSpy = jest.spyOn(console, 'trace')
    const logDebugSpy = jest.spyOn(console, 'debug')
    const logInfoSpy = jest.spyOn(console, 'info')
    const logWarnSpy = jest.spyOn(console, 'warn')
    const logErrorSpy = jest.spyOn(console, 'error')
    const logSpy = jest.spyOn(console, 'log')

    expect(logger).toBeInstanceOf(Logger)

    logger.trace('test trace')
    logger.debug('test debug')
    logger.info('test info')
    logger.warn('test warn')
    logger.error('test error')

    expect(logTraceSpy).toHaveBeenCalledTimes(0)
    expect(logDebugSpy).toHaveBeenCalledTimes(0)
    expect(logInfoSpy).toHaveBeenCalledTimes(1)
    expect(logWarnSpy).toHaveBeenCalledTimes(1)
    expect(logErrorSpy).toHaveBeenCalledTimes(1)
    expect(logSpy).toHaveBeenCalledTimes(0)
  })
  it('test logger level trace defined by env', () => {
    const logTraceSpy = jest.spyOn(console, 'trace')
    const logDebugSpy = jest.spyOn(console, 'debug')
    const logInfoSpy = jest.spyOn(console, 'info')
    const logWarnSpy = jest.spyOn(console, 'warn')
    const logErrorSpy = jest.spyOn(console, 'error')
    const logSpy = jest.spyOn(console, 'log')

    process.env.LOG_LEVEL = 'trace'
    expect(logger).toBeInstanceOf(Logger)

    logger.trace('test trace')
    logger.debug('test debug')
    logger.info('test info')
    logger.warn('test warn')
    logger.error('test error')

    expect(logTraceSpy).toHaveBeenCalledTimes(1)
    expect(logDebugSpy).toHaveBeenCalledTimes(1)
    expect(logInfoSpy).toHaveBeenCalledTimes(1)
    expect(logWarnSpy).toHaveBeenCalledTimes(1)
    expect(logErrorSpy).toHaveBeenCalledTimes(1)
    expect(logSpy).toHaveBeenCalledTimes(0)
  })
  it('test logger level debug defined by env', () => {
    const logTraceSpy = jest.spyOn(console, 'trace')
    const logDebugSpy = jest.spyOn(console, 'debug')
    const logInfoSpy = jest.spyOn(console, 'info')
    const logWarnSpy = jest.spyOn(console, 'warn')
    const logErrorSpy = jest.spyOn(console, 'error')
    const logSpy = jest.spyOn(console, 'log')

    process.env.LOG_LEVEL = 'debug'
    expect(logger).toBeInstanceOf(Logger)

    logger.trace('test trace')
    logger.debug('test debug')
    logger.info('test info')
    logger.warn('test warn')
    logger.error('test error')

    expect(logTraceSpy).toHaveBeenCalledTimes(0)
    expect(logDebugSpy).toHaveBeenCalledTimes(1)
    expect(logInfoSpy).toHaveBeenCalledTimes(1)
    expect(logWarnSpy).toHaveBeenCalledTimes(1)
    expect(logErrorSpy).toHaveBeenCalledTimes(1)
    expect(logSpy).toHaveBeenCalledTimes(0)
  })
  it('test logger level info defined by env', () => {
    const logTraceSpy = jest.spyOn(console, 'trace')
    const logDebugSpy = jest.spyOn(console, 'debug')
    const logInfoSpy = jest.spyOn(console, 'info')
    const logWarnSpy = jest.spyOn(console, 'warn')
    const logErrorSpy = jest.spyOn(console, 'error')
    const logSpy = jest.spyOn(console, 'log')

    process.env.LOG_LEVEL = 'info'
    expect(logger).toBeInstanceOf(Logger)

    logger.trace('test trace')
    logger.debug('test debug')
    logger.info('test info')
    logger.warn('test warn')
    logger.error('test error')

    expect(logTraceSpy).toHaveBeenCalledTimes(0)
    expect(logDebugSpy).toHaveBeenCalledTimes(0)
    expect(logInfoSpy).toHaveBeenCalledTimes(1)
    expect(logWarnSpy).toHaveBeenCalledTimes(1)
    expect(logErrorSpy).toHaveBeenCalledTimes(1)
    expect(logSpy).toHaveBeenCalledTimes(0)
  })
  it('test logger level warn defined by env', () => {
    const logTraceSpy = jest.spyOn(console, 'trace')
    const logDebugSpy = jest.spyOn(console, 'debug')
    const logInfoSpy = jest.spyOn(console, 'info')
    const logWarnSpy = jest.spyOn(console, 'warn')
    const logErrorSpy = jest.spyOn(console, 'error')
    const logSpy = jest.spyOn(console, 'log')

    process.env.LOG_LEVEL = 'warn'
    expect(logger).toBeInstanceOf(Logger)

    logger.trace('test trace')
    logger.debug('test debug')
    logger.info('test info')
    logger.warn('test warn')
    logger.error('test error')

    expect(logTraceSpy).toHaveBeenCalledTimes(0)
    expect(logDebugSpy).toHaveBeenCalledTimes(0)
    expect(logInfoSpy).toHaveBeenCalledTimes(0)
    expect(logWarnSpy).toHaveBeenCalledTimes(1)
    expect(logErrorSpy).toHaveBeenCalledTimes(1)
    expect(logSpy).toHaveBeenCalledTimes(0)
  })
  it('test logger level error defined by env', () => {
    const logTraceSpy = jest.spyOn(console, 'trace')
    const logDebugSpy = jest.spyOn(console, 'debug')
    const logInfoSpy = jest.spyOn(console, 'info')
    const logWarnSpy = jest.spyOn(console, 'warn')
    const logErrorSpy = jest.spyOn(console, 'error')
    const logSpy = jest.spyOn(console, 'log')

    process.env.LOG_LEVEL = 'error'
    expect(logger).toBeInstanceOf(Logger)

    logger.trace('test trace')
    logger.debug('test debug')
    logger.info('test info')
    logger.warn('test warn')
    logger.error('test error')

    expect(logTraceSpy).toHaveBeenCalledTimes(0)
    expect(logDebugSpy).toHaveBeenCalledTimes(0)
    expect(logInfoSpy).toHaveBeenCalledTimes(0)
    expect(logWarnSpy).toHaveBeenCalledTimes(0)
    expect(logErrorSpy).toHaveBeenCalledTimes(1)
    expect(logSpy).toHaveBeenCalledTimes(0)
  })
  it('test invalid logger level', () => {
    const logTraceSpy = jest.spyOn(console, 'trace')
    const logDebugSpy = jest.spyOn(console, 'debug')
    const logInfoSpy = jest.spyOn(console, 'info')
    const logWarnSpy = jest.spyOn(console, 'warn')
    const logErrorSpy = jest.spyOn(console, 'error')
    const logSpy = jest.spyOn(console, 'log')

    process.env.LOG_LEVEL = 'INVALID'
    expect(logger).toBeInstanceOf(Logger)

    logger.trace('test trace')
    logger.debug('test debug')
    logger.info('test info')
    logger.warn('test warn')
    logger.error('test error')

    expect(logTraceSpy).toHaveBeenCalledTimes(0)
    expect(logDebugSpy).toHaveBeenCalledTimes(0)
    expect(logInfoSpy).toHaveBeenCalledTimes(0)
    expect(logWarnSpy).toHaveBeenCalledTimes(0)
    expect(logErrorSpy).toHaveBeenCalledTimes(0)
    expect(logSpy).toHaveBeenCalledTimes(0)
  })
})
