const IPFSAccessController = require('orbit-db-access-controllers/src/ipfs-access-controller')
const type = 'fhir'
class DeehrAccessController extends IPFSAccessController {
  constructor (ipfs, options) {
    super(ipfs, options)
    this.encrypto = options.encrypto
  }

  // Returns the type of the access controller
  static get type () { return type }
}

module.exports = DeehrAccessController
