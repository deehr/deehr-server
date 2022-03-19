'use strict'
const OrbitDBIdentityProvider = require('orbit-db-identity-provider/src/orbit-db-identity-provider')
const type = 'fhir'

class DeehrIdentityProvider extends OrbitDBIdentityProvider {
  constructor (keyStore) {
    super(keyStore)
  }

  /* Return signature of OrbitDB public key signature */
  async signIdentity (data, options) {
    throw new Error("Unable to sign transactions as a Deehr Server")
  }

  /* Verify a signature of OrbitDB public key signature */
  static async verifyIdentity (identity) {
    // TODO - Need to add proper identity verification as party of the validator. To validate the authentensity of patients, cnas, practionaries ect...
    return true;
  }

  // Returns the type of the identity provider
  static get type () { return type }
}
module.exports = DeehrIdentityProvider