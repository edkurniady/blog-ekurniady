const handlers = require('./Handlers/userHandler.js')

module.exports = {
    name: "ApiPlugin",
    register: async (server, options) => {
    
    server.route([
        {
            method: 'POST',
            path: '/signin',
            options: handlers.signin
        },
        {
            method: 'POST',
            path: '/register',
            options: handlers.register
        },
        {
            method: 'GET',
            path: '/home',
            options: handlers.homepage
        },
        {
            method: 'POST',
            path: '/yourposts',
            options: handlers.yourposts
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
            method: 'POST',
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