const userController = require('../Controllers/userController.js')

module.exports = {
    signin : {
        handler: userController.signin
    },
    create : {
        handler: userController.create
    },
    update : {
        handler: userController.update
    },
    delete : {
        handler: userController.delete
    },
    getPost : {
        handler: userController.getPost
    },
    getTag : {
        handler: userController.getTag
    }
}