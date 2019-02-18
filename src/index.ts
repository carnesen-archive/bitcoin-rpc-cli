#!/usr/bin/env node

import { cli, leaf, option } from '@carnesen/cli';
import { createBitcoinRpc } from '@carnesen/bitcoin-rpc';
import { readRpcHref } from '@carnesen/bitcoin-rpc-href';
import { isAbsolute } from 'path';

const pkg = require('../package.json');

export const bitcoinRpc = leaf({
  commandName: 'bitcoin-rpc',
  version: pkg.version,
  description: 'Bitcoin remote procedure call (RPC)',
  options: {
    method: option({
      typeName: 'string',
      description: 'Method name',
      nullable: false,
    }),
    params: option({
      typeName: 'json',
      description: 'Named or positional params',
      nullable: true,
    }),
    configFilePath: option({
      typeName: 'string',
      nullable: true,
      description: 'Absolute path of a bitcoin configuration file',
      validate(value) {
        return isAbsolute(value) ? '' : 'Path must be absolute';
      },
    }),
    format: option({
      typeName: 'string',
      nullable: false,
      description: 'Format of the result',
      defaultValue: 'pretty',
      allowedValues: ['json'],
    }),
  },
  async action({ method, params, configFilePath, format }) {
    const href = readRpcHref(configFilePath || undefined);
    const bitcoinRpc = createBitcoinRpc(href);
    const result = await bitcoinRpc(method, params || undefined);
    if (format === 'json') {
      return JSON.stringify(result, null, 2);
    }
    return result;
  },
});

if (module === require.main) {
  cli(bitcoinRpc)();
}
