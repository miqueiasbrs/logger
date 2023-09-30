# logger
Simple logging

## Usage
There are two ways to use the logger. The first is to use the default settings and the second is to use the custom settings. However, in both configurations, the logger module monitors the environment variable below.

|Environment|Default|Description                                                |
|-|-|-|
|LOG_LEVEL|info|Values accepted:<br/>***off*** - disabled<br/>***trace*** - all logs<br/>***debug*** - only debug, info, warn and error logs<br/>***info*** - only info, warn and error logs<br/>***warn*** - only the warn and error logs<br/>***error*** - only the error logs|
|LOG_FILE_DIR|logs|Path where the logs will be saved|
|LOG_FILE_MODE|off|Values accepted:<br/>***off*** - disabled<br/>***join*** - all logs together in a single file.<br/>***split*** - split logs into files|
|LOG_CONSOLE_MODE|on|Values accepted:<br/>***off*** - disabled<br/>***on*** - log enabled<br/>***local*** - pretty log for local terminal|




## Using
### Simple Use
```ts
import logger from '@letsdelivery/logger'

logger.trace('Log level trace')
// TRACE  {"event":"Log level trace","location":"file:///index.ts:2:"} 
logger.debug({ data: 'Log level debug' })
// DEBUG  {"event":{"data":"Log level debug"},"location":"file:///index.ts:3:"} 
logger.info(['log level info'])
// INFO  {"event":["log level info"],"location":"file:///index.ts:4:"} 
logger.warn(new Error('Warn'))
// WARN  {"event":{},"location":"file:///index.ts:5:"} 
logger.error(new URL('https://error.log'))
// ERROR  {"event":"https://error.log/","location":"file:///index.ts:6:"} 
```

### Using an Identifier
If you want to add an identifier to your log, you can set the requestId in the global log, from then on all new logs will be displayed with this identifier.

```ts
import logger from '@letsdelivery/logger'
logger.setRequestId('myrequestid')

logger.info(['log level info'])
// INFO myrequestid {"event":["log level info"],"location":"file:///index.ts:4:"}
```
for additional identifiers use metadata by key and value
```ts
import logger from '@letsdelivery/logger'
logger.setMetadata({ id: 'myrequestid' })

logger.info(['log level info'])
// INFO  {"event":["log level info"],"metadata":{"id":"myrequestid"},"location":"file:///index.ts:4:"}
```