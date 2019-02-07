const sequel = require('sequelize')
const url = require('url')

var Sequelize = new sequel('blog-ekurniady', 'postgres', 'taralite123', {host: '127.0.0.1', dialect:'postgres', logging:false})
var Model = require('../../models/')

module.exports = {
    create : (request) => {
        var pathname = request.url.pathname
        var usn = pathname.split("/")[1]
        return Model.User.findOne({where: {username: usn}})
        .then(user => {
            return Model.Post.create({
                title: request.payload.title,
                content: request.payload.content,
                createdAt: sequel.fn("NOW"),
                updatedAt: sequel.fn("NOW"),
                user_id: user.id
            })
        })
    },

    update : (request) => {
        return Model.Post.findOne({where: {id: request.payload.postid}})
        .then(post => {
            return post.updateAttributes({
                title: request.payload.title,
                content: request.payload.content,
                createdAt: sequel.fn("NOW"),
                updatedAt: sequel.fn("NOW"),
                user_id: request.payload.userid
            })
        })
    },

    delete : (request) => {
        
    }
}