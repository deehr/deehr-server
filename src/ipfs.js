const IPFS = require('ipfs')
const wrtc = require( 'wrtc' )// or 'electron-webrtc'
const WebRTCStar = require( 'libp2p-webrtc-star')

const createCoreIPFS = async (repo) => {
    return await IPFS.create({
        repo: repo,
        start: true,
        libp2p: {
            modules: {
                transport: [WebRTCStar]
            },
            config: {
                peerDiscovery: {
                    webRTCStar: { // <- note the lower-case w - see https://github.com/libp2p/js-libp2p/issues/576
                        enabled: true
                    }
                },
                transport: {
                    WebRTCStar: { // <- note the upper-case w- see https://github.com/libp2p/js-libp2p/issues/576
                        wrtc
                    }
                }
            }
        },
        config: {
            Pubsub:{
                Enabled: true
            },
            Bootstrap:[],
            Addresses: {
                Swarm: [
                    '/dns4/01.webrtc-star.deehr.pub/tcp/443/wss/p2p-webrtc-star',
                    '/dns4/02.webrtc-star.deehr.pub/tcp/443/wss/p2p-webrtc-star',
                    '/dns4/03.webrtc-star.deehr.pub/tcp/443/wss/p2p-webrtc-star'
                ]
            },
        },
        EXPERIMENTAL: {
            pubsub: true
        }
    });
}


module.exports = createCoreIPFS
