const services = require('../Services/post.js')

module.exports = {
    signin : () => {
        // return services.signin
    },
    create : (request) => {
        return services.create(request)
    },
    update : (request) => {
        return services.update(request)
    },
    delete : () => {

    },
    getPost : () => {

    },
    getTag : () => {

    }
}