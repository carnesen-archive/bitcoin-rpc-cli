import { resolve } from 'path';

import { testCliThrows, testCli } from '@carnesen/cli';
import { RegtestService } from '@carnesen/bitcoin-regtest-service';

import { bitcoinRpc as subject } from '../index';

export const datadir = resolve(__dirname, '..', '..', 'tmp');
export const regtestService = new RegtestService({ datadir });

const cli = testCli(subject);
const cliThrows = testCliThrows(subject);

describe(subject.commandName, () => {
  beforeAll(async () => {
    await regtestService.start();
    // service takes a little time to bind to the rpc port
    await new Promise(resolve => {
      setTimeout(resolve, 3000);
    });
  }, 30000);

  afterAll(() => regtestService.stop());

  it('runs bitcoin rpc commands', async () => {
    const result = await cli(
      `--method getnetworkinfo --configFilePath ${regtestService.configFilePath}`,
    );
    expect(result.connections).toBe(0);
  });

  it('runs bitcoin rpc commands', async () => {
    const result = await cli(
      `--method getnetworkinfo --configFilePath ${
        regtestService.configFilePath
      } --format json`,
    );
    expect(result).toMatch('"connections": 0');
  });

  it('gives usage if --help is given', async () => {
    expect(await cliThrows('--help')).toMatch('Usage');
  });
});
