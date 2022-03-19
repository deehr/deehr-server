const { program, Option } = require('commander');
const createValidator = require('./src/validator');
const createMaintainer = require('./src/maintainer');
const OrbitDB = require('orbit-db');
const { DocumentStore, AccessControllers, Identities } = require('orbit-db');
const TestnetAccessController = require('./src/access-controller');
const DeehrIdentityProvider = require('./src/identity-provider');

/***************************************************************************/
program
  .name('deehr-server')
  .description('A simple DEEHR Server')
  .version('1.0.0');


Identities.addIdentityProvider(DeehrIdentityProvider);
AccessControllers.addAccessController({ AccessController: TestnetAccessController })
OrbitDB.addDatabaseType("fhir", DocumentStore);


/***************************************************************************/
/***************************************************************************/
/***************************************************************************/
/***************************************************************************/
// .addOption(new Option('-s, --secret').hideHelp())
// .addOption(new Option('-t, --timeout <delay>', 'timeout in seconds').default(60, 'one minute'))
// .addOption(new Option('-d, --drink <size>', 'drink size').choices(['small', 'medium', 'large']))
// .addOption(new Option('-p, --port <number>', 'port number').env('PORT'))
// .addOption(new Option('--donate [amount]', 'optional donation in dollars').preset('20').argParser(parseFloat))
// .addOption(new Option('--disable-server', 'disables the server').conflicts('port'));

program
  .command('start')
    .addOption(new Option('-m, --mode <mode>', 'Mode').choices(['lite', 'full']).default("lite"))
    .addOption(new Option('-n, --network <network>', 'Network').choices(['testnet', 'mainnet']).default("testnet"))
    .description('Starts the deehr server')
    .action((options, command) => {
      const servers = {
        lite: createMaintainer,
        full: createValidator
      }

      servers[options.mode](options)
    })
program.parse();