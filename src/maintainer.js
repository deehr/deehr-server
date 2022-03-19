const { createInstance, Identities } = require("orbit-db");
const IPFSPubsub = require("orbit-db-pubsub/src/ipfs-pubsub");
const resolveDBAddress = require("./address");
const createCoreIPFS = require("./ipfs");

const createMaintainer = async ({network}) => {
    const ipfs = await createCoreIPFS(".ipfs/maintainer");

    const id = await ipfs.id()
    const identity = await Identities.createIdentity({
        id: id
    })
    const orbitdb = await createInstance(ipfs, {
        directory: "./.orbitdb/maintainer",
        identity: identity,  
        offline: false
    })
    
    const db = await orbitdb.open(`deehr.${network}`,  {
        create: true, 
        type: "fhir",
        accessController:{
            type: "fhir",
            write:["*"]
        }
    })

    db.events.on('peer', async peer => {
        console.log("New Peer %s", peer)
        await db.load()
    })
    db.events.on('peer.exchanged', async (peer, address, heads) => {
        console.log(`Received ${heads.length} heads for '${address}' from peer ${peer}:\n`, JSON.stringify(heads.map(e => e.hash), null, 2))
        await db.load()
    })
    db.events.on('replicated', async (address) => {
        console.log(`Replicated Address ${address}`)
        await db.load()
    })
    db.events.on('load', async (address, heads) => {
        console.log(`Loading Address ${address} with:\n`, JSON.stringify(heads.map(e => e.hash), null, 2))
    })
    db.events.on('replicated.progress', async (address, hash, entry, progress, have)=> {
        console.log(`Replicating Address ${address}, hash ${hash}, entry ${entry}, progresss ${progress}, have: ${have}`)
        await db.load()
    })
    await db.load()
}


module.exports = createMaintainer