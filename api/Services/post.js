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
                username: request.payload.username
            }
        }).then(user => {
            if (!user) {
                return "usererror"
            }
            if(user.password==request.payload.password){
                return jwt.sign({
                    userid: user.id,
                    username: user.name,
                }, 'secret');
            }else{
                return "pwerror"
            }
        })
    },

    register : (request) => {
        return Model.User.findOne({
            where:{
                username: request.payload.username
            }
        }).then(used => {
            if(used){
                return "taken"
            }else{
                return Model.User.create({
                    name: request.payload.name,
                    email: request.payload.email,
                    username: request.payload.username,
                    password: request.payload.password
                })
            }
        })
    },

    homepage : () => {
        return Model.Post.findAll({
            raw: true
        }).then(post => {
            return Promise.mapSeries(post, p => {
                return Model.PostTag.findAll({
                    raw: true,
                    where: {post_id: p.id},
                    attributes: [],
                    include: [{
                        model: Model.Tag
                    }]
                }).then(tag => {
                    var tagname = []

                    for(var i = 0; i<tag.length; i++){
                        tagname.push(tag[i]['Tag.name'])
                    }

                    return {
                        id: p.id,
                        title: p.title,
                        content: p.content,
                        creator: p.creator,
                        createdAt: p.createdAt,
                        updatedAt: p.updatedAt,
                        tags: tagname
                    }
                })
            }).then(res => {
                return res
            })
        })
    },

    yourposts : (request) => {
        return Model.Post.findAll({
            raw: true,
            where: {user_id : jwt.decode(request.payload.token).userid}
        }).then(post => {
            return Promise.mapSeries(post, p => {
                return Model.PostTag.findAll({
                    raw: true,
                    where: {post_id: p.id},
                    attributes: [],
                    include: [{
                        model: Model.Tag
                    }]
                }).then(tag => {
                    var tagname = []

                    for(var i = 0; i<tag.length; i++){
                        tagname.push(tag[i]['Tag.name'])
                    }

                    return {
                        id: p.id,
                        title: p.title,
                        content: p.content,
                        creator: p.creator,
                        createdAt: p.createdAt,
                        updatedAt: p.updatedAt,
                        tags: tagname
                    }
                })
            }).then(res => {
                return res
            })
        })
    },

    create : (request) => {
        return Model.Post.create({
            title: request.payload.title,
            content: request.payload.content,
            createdAt: sequel.fn("NOW"),
            updatedAt: sequel.fn("NOW"),
            user_id: jwt.decode(request.payload.token).userid,
            creator: jwt.decode(request.payload.token).username
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
                var tagname = []

                for(var i = 0; i<tag.length; i++){
                    tagname.push(tag[i]['Tag.name'])
                }

                return {
                    id: post.id,
                    title: post.title,
                    content: post.content,
                    creator: post.creator,
                    createdAt: post.createdAt,
                    updatedAt: post.updatedAt,
                    tags: tagname
                }
            })
        })
    },

    getTag : (request) => {
        return Model.Tag.findOne({
            where: {name: request.payload.name}
        }).then(t => {
            return Model.PostTag.findAll({
                where: {tag_id: t.id},
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
                            var tagname = []

                            for(var i = 0; i<tag.length; i++){
                                tagname.push(tag[i]['Tag.name'])
                            }

                            return {
                                id: post.id,
                                title: post.title,
                                content: post.content,
                                creator: post.creator,
                                createdAt: post.createdAt,
                                updatedAt: post.updatedAt,
                                tags: tagname
                            }
                        })
                    })
                }).then(results => {
                    return results
                })
            })
        })
    }
}