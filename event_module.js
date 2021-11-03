const Logger = require('./log.js');
const logger = new Logger();

logger.on('some_event', obj => {
  console.log(obj);
});

logger.log('User logged');
