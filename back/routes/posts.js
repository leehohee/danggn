const express = require('express');

const db = require('../models');


const router = express.Router();

router.get('/', async (req, res, next)=>{
    try {
        let where = {};
        if( parseInt(req.query.lastId, 10)){
            where = {
                id: {
                    [db.Sequelize.Op.lt]: parseInt(req.query.lastId, 10), // lees than lt(미만), lte(이하), gt(초과), gte(이하), ne(불일치), in, nin 등이 있다.
                },
            };
        }
        const posts = await db.Post.findAll({
            where,
            include:[{
                model: db.User,
                attributes: ['id', 'nickname'],
            }, {
                model: db.Image,
            }, {
                model : db.User,
                as : 'Likers',
                attributes: ['id'],
            },{
                model: db.Post,
                as: 'Retweet',
                include:[{
                    model: db.User,
                    attributes:['id', 'nickname'],
                },{
                    model:db.Image,
                }],
            },{
                model: db.Hashtag,
                
                include:[{
                    model:db.Image,
                }],
            }],
            order: [['createdAt','DESC']],
            limit: parseInt(req.query.limit, 10) || 10,
        });
        res.json(posts);
    } catch(err) {
        console.error(err);
        next(err);
    }
});

router.get('/items', async (req, res, next)=>{
    try {
        let where = {};
        if( parseInt(req.query.lastId, 10)){
            where = {
                id: {
                    [db.Sequelize.Op.lt]: parseInt(req.query.lastId, 10), // lees than lt(미만), lte(이하), gt(초과), gte(이하), ne(불일치), in, nin 등이 있다.
                },
            };
        }
        const posts = await db.Item.findAll({
            where,
            include:[{
                model: db.User,
                attributes: ['id', 'nickname'],
            }, {
                model: db.Image,
            },{
                model: db.Image2,
            }, {
                model : db.User,
                as : 'Itemlikers',
                attributes: ['id'],
            },{
                model : db.Category,
                attributes : ['name'],
            }],
            order: [['createdAt','DESC']],
            limit: parseInt(req.query.limit, 10) || 10,
        });
        res.json(posts);
    } catch(err) {
        console.error(err);
        next(err);
    }
});

router.post('/searchitems', async (req, res, next)=>{
    try {
        const wordSplit = req.body.search;
        const posts = await db.Item.findAll({
            where : { title: { [db.Sequelize.Op.like]: '%' + wordSplit + '%' } },
            
            order: [['createdAt','DESC']],
            limit: parseInt(req.query.limit, 10) || 10,
        });
        res.json(posts);
    } catch(err) {
        console.error(err);
        next(err);
    }
});

router.get('/images', async (req, res, next)=>{
    try {
        let where = {};
        if( parseInt(req.query.lastId, 10)){
            where = {
                id: {
                    [db.Sequelize.Op.lt]: parseInt(req.query.lastId, 10), // lees than lt(미만), lte(이하), gt(초과), gte(이하), ne(불일치), in, nin 등이 있다.
                },
            };
        }
        const posts = await db.Hashtag.findAll({
            where,
            include:[{
                model: db.User,
                attributes: ['id', 'nickname'],
            }, {
                model: db.Image,
            }, 
            ],
            order: [['createdAt','DESC']],
            limit: parseInt(req.query.limit, 10) || 10,
        });
        res.json(posts);
    } catch(err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;