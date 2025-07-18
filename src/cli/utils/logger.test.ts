import { describe, it, expect, vi, beforeEach } from 'vitest'
import { logger, LogLevel } from './logger'

describe('Logger utility', () => {
  let consoleSpy: { log: any; error: any; warn: any; debug: any }

  beforeEach(() => {
    consoleSpy = {
      log: vi.spyOn(console, 'log').mockImplementation(() => {}),
      error: vi.spyOn(console, 'error').mockImplementation(() => {}),
      warn: vi.spyOn(console, 'warn').mockImplementation(() => {}),
      debug: vi.spyOn(console, 'debug').mockImplementation(() => {}),
    }
  })

  it('should log info messages by default', () => {
    logger.info('test message')
    expect(consoleSpy.log).toHaveBeenCalledWith('ℹ️ ', 'test message')
  })

  it('should log error messages', () => {
    logger.error('error message')
    expect(consoleSpy.error).toHaveBeenCalledWith('❌', 'error message')
  })

  it('should log warn messages', () => {
    logger.warn('warn message')
    expect(consoleSpy.warn).toHaveBeenCalledWith('⚠️ ', 'warn message')
  })

  it('should respect log level settings', () => {
    logger.setLevel(LogLevel.ERROR)
    logger.info('info message')
    logger.error('error message')
    
    expect(consoleSpy.log).not.toHaveBeenCalled()
    expect(consoleSpy.error).toHaveBeenCalledWith('❌', 'error message')
  })

  it('should log debug messages when level is DEBUG', () => {
    logger.setLevel(LogLevel.DEBUG)
    logger.debug('debug message')
    expect(consoleSpy.debug).toHaveBeenCalledWith('🐛', 'debug message')
  })

  it('should not log debug messages when level is higher', () => {
    logger.setLevel(LogLevel.INFO)
    logger.debug('debug message')
    expect(consoleSpy.debug).not.toHaveBeenCalled()
  })
})