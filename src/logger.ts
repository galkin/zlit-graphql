import Logger from 'pino';

import config from '~/config';

export default Logger({
  name: 'users',
  level: config.logLevel,
  redact: {
    paths: ['pid', 'hostname'],
    remove: true
  }
});
