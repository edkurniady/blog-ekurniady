const sequel = require('sequelize')
const url = require('url')
const jwt = require('jsonwebtoken');
const joi = require('joi');
const Promise = require("bluebird");

var Sequelize = new sequel('blog-ekurniady', 'postgres', 'taralite123', {host: '127.0.0.1', dialect:'postgres'})
var Model = require('../../models/')

module.exports = {
    signin : (request) => {
        return Model.User.findOne({
            where:{
                id: request.payload.userid
            }
        }).then(user => {
            if (!user) {
                return "User Not Found"
            }
            if(user.password==request.payload.userpassword){
                return jwt.sign({
                    expiresIn: 86400,
                    userid: user.id,
                    username: user.username,
                }, 'secret');
            }else{
                return "wrong password"
            }
        })
    },

    create : (request) => {
        return Model.Post.create({
            title: request.payload.title,
            content: request.payload.content,
            createdAt: sequel.fn("NOW"),
            updatedAt: sequel.fn("NOW"),
            user_id: request.payload.userid
        }).then(post =>{
            return Promise.mapSeries(request.payload.tags, st => {
                return Model.Tag.findOne({where: {name: st}})
                    .then(tag => {
                        if(!tag){
                            return Model.Tag.create({
                                name : st
                            }).then(ntag => {
                                return Model.PostTag.create({
                                    post_id: post.id,
                                    tag_id: ntag.id
                                })
                            })
                        }else{
                            return Model.PostTag.create({
                                post_id: post.id,
                                tag_id: tag.id
                            })
                        }
                    })
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
        return Model.PostTag.destroy({where: {post_id: request.payload.postid}}).then(
            () => {
                return Model.Post.destroy({where: {id: request.payload.postid}})
            }
        )
    },

    get : (request) => {
        return Model.Post.findOne({where: {id: request.payload.postid}})
    },

    getTag : (request) => {
        return Model.PostTag.findAll({where: {tag_id: request.payload.tagid}, include: [Model.Post]})
    }
}