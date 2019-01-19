import { rootCommand } from '../cli';
import { assembleCli } from '@carnesen/cli';

const assembled = assembleCli(rootCommand);

const runCli = (str?: string) => {
  const argv = str ? str.split(' ') : [];
  return assembled(argv);
};

async function catchCli(str?: string) {
  try {
    await runCli(str);
    throw new Error('This line should not be reached');
  } catch (ex) {
    return ex;
  }
}

describe(assembled.name, () => {
  it('rejects a coded error if server returns 404', async () => {
    const ex = await catchCli('--method foo');
    expect(ex.code).toBe(404);
  });

  it('getnetworkinfo', async () => {
    const result = await runCli('--method getnetworkinfo');
    expect(typeof result.connections).toBe('number');
  });

  it('getblockcount', async () => {
    const result = await runCli('--method getblockcount');
    expect(typeof result).toBe('number');
  });

  it('getblockcount', async () => {
    const result = await runCli('--method getblockcount');
    expect(typeof result).toBe('number');
  });

  it('getbestblockhash', async () => {
    const result = await runCli('--method getbestblockhash');
    expect(typeof result).toBe('string');
  });

  it('getblockhash', async () => {
    const result = await runCli('--method getblockhash --params [0]');
    expect(typeof result).toBe('string');
  });
});
