const services = require('../Services/post.js')

module.exports = {
    signin : (request) => {
        return services.signin(request)
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
        return services.get(request)
    },
    getTag : (request) => {
        return services.getTag(request)
    }
}