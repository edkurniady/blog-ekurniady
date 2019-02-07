'use strict';

const Hapi = require('hapi')
const api = require("./api")

const server = Hapi.server({
    port: 3000,
    host: 'localhost'
});

const init = async () => {
    try {
        await server.register(api)
        await server.start()
        console.log('Server running at: ${server.info.uri}')
    }catch(err) {
        console.log('Server running at: ${server.info.uri}')
        console.log('error!')
    }
};

process.on('unhandledRejection', (err) => {
    console.log(err)
    process.exit(1)
});

init();