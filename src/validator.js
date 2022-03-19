const IPFSPubsub = require("orbit-db-pubsub/src/ipfs-pubsub");
const resolveDBAddress = require("./address");
const createCoreIPFS = require("./ipfs");


const createValidator = async ({network}) => {
    const ipfs = await createCoreIPFS(".ipfs/validator");
    const id = await ipfs.id()
    const pubsub = new IPFSPubsub(ipfs, id)

    const address = await resolveDBAddress(ipfs, network)
    pubsub.subscribe(address, 
        (topic, message, from) => {
            console.log(`Received ${message} from ${from} on topic ${topic}`)
        }, 
        (topic, peer) => {
            console.log(`New Peer ${peer} on topic ${topic}`)
        }
    )
}

module.exports = createValidator