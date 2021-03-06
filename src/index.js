require('babel-register');

/* eslint-disable no-console */
const logger = require('winston');
const app = require('./server');
const port = app.get('port');
const server = app.listen(port);

process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
);

server.on('listening', () => {
  logger.info(`Feathers application started on ${app.get('host')}:${port}`);
  if(process.env.NODE_ENV != 'production'){
    logger.info('Building webpack...');
  }
});
