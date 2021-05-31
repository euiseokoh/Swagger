const winston = require('winston');
const appRoot = require('app-root-path');
require('winston-daily-rotate-file');
require('date-utils');

var logger = winston.createLogger({
	level: 'info',
	transports: [
		new winston.transports.DailyRotateFile({
			filename : `${appRoot}/logs/system.log`,
			zippedArchive: true,
			format: winston.format.printf(info => `${new Date().toFormat('YYYY-MM-DD HH24:MI:SS')} [${info.level.toUpperCase()}] - ${info.message}`),
			handleExceptions: true
		}),
		new winston.transports.Console({
			format: winston.format.printf(info => `${new Date().toFormat('YYYY-MM-DD HH24:MI:SS')} [${info.level.toUpperCase()}] - ${info.message}`),
			handleExceptions: true,
            colorize: true
		})
	]
});

logger.stream = {
    write: function(message, encoding){
        logger.info(message);
    }
};

module.exports = logger;