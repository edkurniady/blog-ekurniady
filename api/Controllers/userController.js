const services = require('../Services/post.js')

module.exports = {
    signin : () => {
        // return services.signin
    },
    create : (request) => {
        return services.create(request)
    },
    update : () => {
        return services.update(request)
    },
    delete : () => {

    },
    getPost : () => {

    },
    getTag : () => {

    }
}