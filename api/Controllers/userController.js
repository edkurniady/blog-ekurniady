const services = require('../Services/post.js')

module.exports = {
    signin : (request) => {
        return services.signin(request)
    },
    register:(request) => {
        return services.register(request)
    },
    homepage : () => {
        return services.homepage()
    },
    yourposts : (request) => {
        return services.yourposts(request)
    },
    create : (request) => {
        return services.create(request)
    },
    update : (request) => {
        return services.update(request)
    },
    delete : (request) => {
        return services.delete(request)
    },
    getPost : (request) => {
        return services.getPost(request)
    },
    getTag : (request) => {
        return services.getTag(request)
    }
}