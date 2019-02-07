const handlers = require('./Handlers/userHandler.js')

module.exports = {
    name: "ApiPlugin",
    register: async (server, options) => {
    
    server.route([
        {
            method: 'GET',
            path: '/signin',
            options: handlers.signin
        },
        {
            method: 'POST',
            path: '/{username}/post/create',
            options: handlers.create
        },
        {
            method: 'PUT',
            path: '/{username}/post/update',
            options: handlers.update
        },
        {
            method: 'POST',
            path: '/{username}/post/delete',
            options: handlers.delete
        },
        {
            method: 'POST',
            path: '/{username}/post/get',
            options: handlers.getPost
        },
        {
            method: 'POST',
            path: '/{username}/tags/post/get',
            options: handlers.getTag
        }
    ])
}
}