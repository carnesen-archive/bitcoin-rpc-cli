# @carnesen/bitcoin-rpc-cli [![npm version](https://badge.fury.io/js/%40carnesen%2Fbitcoin-rpc-cli.svg)](https://badge.fury.io/js/%40carnesen%2Fbitcoin-rpc-cli) [![Build Status](https://travis-ci.com/carnesen/bitcoin-rpc-cli.svg?branch=master)](https://travis-ci.com/carnesen/bitcoin-rpc-cli)

A Node.js command-line client for bitcoin's remote procedure call (RPC) interface

## Install
```
npm install --global @carnesen/bitcoin-rpc-cli
```

Alternatively, if you don't want to install the package you can run it as a one-off command using `npx`:
```
$ npx @carnesen/bitcoin-rpc-cli
```

## Usage

Use the `--help` flag to get command usage:
```
$ bitcoin-rpc --help
Usage: bitcoin-rpc <options>

   Bitcoin remote procedure call (RPC)

Options:

   --method <str> : Method name
   [--params <json>] : Named or positional params
   [--configFilePath <str>] : Absolute path of a bitcoin configuration file
   [--format <str>] : Format of the result
                      Allowed values {'pretty', 'json'}
                      (Default = 'pretty')
```

Here's an example of calling the `getnetworkinfo` method:

```
$ bitcoin-rpc --method getnetworkinfo
{ version: 170000,
  subversion: '/Satoshi:0.17.0/',
...
```

Parameters are passed as JSON string, either an array of positional params or an object of named params:
```
$ bitcoin-rpc --method getblockhash --params '[0]'
0f9188f13cb7b2c71f2a335e3a4fc328bf5beb436012afca590b1a11466e2206

$ bitcoin-rpc --method getblockhash --params '{"height": 0}'
0f9188f13cb7b2c71f2a335e3a4fc328bf5beb436012afca590b1a11466e2206
```

## More information
Check out [the unit tests](src/__tests__) to see more examples of how it works. If you encounter any bugs or have any questions or feature requests, please don't hesitate to file an issue or submit a pull request on this project's repository on GitHub.

## Related
- [@carnesen/bitcoin-rpc](https://github.com/carnesen/bitcoin-rpc): A Node.js client library for bitcoin's remote procedure call (RPC) interface
- [@carnesen/bitcoin-rpc-href](https://github.com/carnesen/bitcoin-rpc-href): A Node.js library for reading bitcoin's remote procedure call (RPC) configuration
- [@carnesen/cli](https://github.com/carnesen/cli): A Node.js library for building command-line interfaces

## License

MIT © [Chris Arnesen](https://www.carnesen.com)
