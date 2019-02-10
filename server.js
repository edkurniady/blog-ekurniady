'use strict';

const Hapi = require('hapi')
const api = require("./api")

const server = Hapi.server({
    port: 5000,
    host: 'localhost',
    routes: {
        cors: true
    }
});

const init = async () => {
    try {
        await server.register(api)
        await server.start()
    }catch(err) {
        console.log(err)
        console.log('error!')
    }
};

process.on('unhandledRejection', (err) => {
    console.log(err)
    process.exit(1)
});

init();