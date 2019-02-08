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

    homepage : () => {
        // return Model.Post.findAll({
        //     include:[{
        //         model: Model.PostTag,
        //         include: [{
        //             model: Model.Tag,
        //         }],
        //     }],
        //     where: {user_id: request.query.userid},
        //     raw: true
        // })
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
        .then(post=>{
            // if(post.user_id!=request.payload.userid){
            //     return "Can't update other people's post"
            // }else{
            return post.updateAttributes({
                title: request.payload.title,
                content: request.payload.content,
                updatedAt: sequel.fn("NOW"),
            }).then(post=>{
                return Model.PostTag.destroy({where: {post_id: post.id}})
                .then(() =>{
                    return Promise.mapSeries(request.payload.tags, st=>{
                        return Model.Tag.findOne({where: {name: st}})
                        .then(tag=>{
                            if(!tag){
                                return Model.Tag.create({
                                    name:st
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
            })
            // }
        })
    },

    delete : (request) => {
        return Model.PostTag.destroy({where: {post_id: request.payload.postid}}).then(
            () => {
                return Model.Post.destroy({where: {id: request.payload.postid}})
            }
        )
    },

    getPost : (request) => {
        return Model.Post.findOne({
            where: {id: request.payload.postid},
            raw: true
        }).then(post => {
            return Model.PostTag.findAll({
                include: [{
                    model: Model.Tag
                }],
                attributes: [],
                where: {post_id: post.id},
                raw: true
            }).then(tag => {
                return{
                    post: post,
                    tag: tag
                }
            })
        })
    },

    getTag : (request) => {
        return Model.PostTag.findAll({
            where: {tag_id: request.payload.tagid},
            raw: true
        }).then(posttag => {
            return Promise.mapSeries(posttag, pt=>{
                return Model.Post.findOne({
                    where: {id: pt.post_id},
                    raw: true
                }).then(post => {
                    return Model.PostTag.findAll({
                        include: [{
                            model: Model.Tag
                        }],
                        attributes: [],
                        where: {post_id: post.id},
                        raw: true
                    }).then(tag => {
                        return{
                            post: post,
                            tag: tag
                        }
                    })
                })
            }).then(results => {
                return results
            })
        })
    }
}