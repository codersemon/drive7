import * as migration_20260827_133059_initial from './20260827_133059_initial';

export const migrations = [
  {
    up: migration_20260827_133059_initial.up,
    down: migration_20260827_133059_initial.down,
    name: '20260827_133059_initial'
  },
];
