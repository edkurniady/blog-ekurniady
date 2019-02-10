const userController = require('../Controllers/userController.js')

module.exports = {
    signin : {
        handler: userController.signin
    },
    register:{
        handler: userController.register
    },
    homepage : {
        handler: userController.homepage
    },
    yourposts : {
        handler: userController.yourposts
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