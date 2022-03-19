const { Identities, createInstance } = require("orbit-db")

const resolveDBAddress = async (ipfs, network) => {
    
    
    const id = await ipfs.id()
    const options = { id: id}
    const identity = await Identities.createIdentity(options)
    const orbitdb = await createInstance(ipfs, {identity: identity,  offline: false})
    
    const address = await orbitdb.determineAddress(`deehr.${network}`,  "fhir", {
        write:["*"]
    })
    
    await orbitdb.disconnect()
    return address.toString()
}
module.exports = resolveDBAddress