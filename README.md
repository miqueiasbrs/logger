# logger
Simple logger

## Usage
There are two ways to use the logger. The first is to use your default settings and the second is to use your custom settings. However in both configurations the logger module monitors the environment variable LOG_LEVEL, if it exists it respects the value of this variable primarily.

LOG_LEVEL = INFO (Default)
> Values accepted in the environment variable
* TRACE
* DEBUG
* INFO
* WARN
* ERROR
* OFF

## Using
### Simple Use
```ts
import logger from '@letsdelivery/logger'

logger.trace('Log level trace')
// Output: {"level":"trace","requestId":"","message":"Log level trace","location":"/home/miqueias/git/letsdelivery/logger-letsdelivery/index.ts:5:8"}

logger.debug({ data: 'Log level debug' })
// Output: {"level":"debug","requestId":"","message":{"data":"Log level debug"},"location":"/home/miqueias/git/letsdelivery/logger-letsdelivery/index.ts:6:8"}

logger.info(['log level info'])
// Output: {"level":"info","requestId":"","message":["log level info"],"location":"/home/miqueias/git/letsdelivery/logger-letsdelivery/index.ts:5:8"}

logger.warn(new Error('Warn'))
// Output: {"level":"warn","requestId":"","message":{},"location":"/home/miqueias/git/letsdelivery/logger-letsdelivery/index.ts:6:8"}

logger.error(new URL('https://error.log'))
// Output: {"level":"error","requestId":"","message":"https://error.log/","location":"/home/miqueias/git/letsdelivery/logger-letsdelivery/index.ts:9:8"}
```

### Using an Identifier
If you want to add an identifier to your log, you can set the requestId in the global log, from then on all new logs will be displayed with this identifier.

```ts
import logger from '@letsdelivery/logger'
logger.setRequestId('myrequestid')

logger.info(['log level info'])
// Output: {"level":"info","requestId":"myrequestid","message":["log level infor"],"location":"/home/miqueias/git/letsdelivery/logger-letsdelivery/index.ts:4:8"}
```
for additional identifiers use metadata by key and value
```ts
import logger from '@letsdelivery/logger'
logger.setMetadata({ id: 'myrequestid' })

logger.info(['log level info'])
// Output: {"level":"info","metadata":{"id":"myrequestid"},"message":["log level infor"],"location":"/home/miqueias/git/letsdelivery/logger-letsdelivery/index.ts:4:8"}
```