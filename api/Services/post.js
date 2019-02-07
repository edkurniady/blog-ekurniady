const sequel = require('sequelize')
const url = require('url')

var Sequelize = new sequel('blog-ekurniady', 'postgres', 'taralite123', {host: '127.0.0.1', dialect:'postgres'})
var Model = require('../../models/')

module.exports = {
    create : (request) => {
        Model.Post.create({
            title: request.payload.title,
            content: request.payload.content,
            createdAt: sequel.fn("NOW"),
            updatedAt: sequel.fn("NOW"),
            user_id: request.payload.userid
        }).then(post =>{
            console.log(post.id)
            Model.PostTag.create({
                post_id: post.id,
                tag_id: request.payload.tagid1
            })
            if(request.payload.tagid2){
                Model.PostTag.create({
                    post_id: post.id,
                    tag_id: request.payload.tagid2
                })
            }
        })

        return "create success"
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
        Model.PostTag.destroy({where: {post_id: request.payload.postid}})
        Model.Post.destroy({where: {id: request.payload.postid}})

        return "delete success"
    },

    get : (request) => {
        return Model.Post.findOne({where: {id: request.payload.postid}})
    },

    getTag : (request) => {
        
        // Post.find({ where: { ...}, include: [User]})
        return Model.PostTag.findAll({where: {tag_id: request.payload.tagid}, include: [Model.Post]})
    }
}