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
            path: '/post/create',
            options: handlers.create
        },
        {
            method: 'PUT',
            path: '/post/update',
            options: handlers.update
        },
        {
            method: 'DELETE',
            path: '/post/delete',
            options: handlers.delete
        },
        {
            method: 'POST',
            path: '/post/get',
            options: handlers.getPost
        },
        {
            method: 'POST',
            path: '/tags/post/get',
            options: handlers.getTag
        }
    ])
}
}