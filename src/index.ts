import 'reflect-metadata';

import bootstrap from '~/bootstraper';
import * as database from '~/boundaries/database';
import * as http from '~/boundaries/http-server';

export async function start() {
  await database.start();
  await http.start();
}

export async function stop() {
  await http.stop();
  await database.stop();
}

if (!module.parent) {
  // tslint:disable-next-line
  bootstrap(start, stop);
}
