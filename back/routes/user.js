const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const db = require('../models');
const { isLoggedIn, isNotLoggedIn} = require('./middlewares');

const router = express.Router();


router.get('/', isLoggedIn, async (req,res,next)=>{
    const user = req.user;
    res.json(user);
});
router.get('/all', async(req,res, next)=>{
    try {
        const users = await db.User.findAll({
          
          include: [{
            model: db.User,
            as: 'Followings',
            attributes: ['id'],
          }, {
            model: db.User,
            as: 'Followers',
            attributes: ['id'],
          }],
          attributes: ['id', 'nickname','email','status','createdAt'],
        });
        res.json(users);
      } catch (err) {
        console.error(err);
        next(err);
      }
});
router.get('/chatroomlist', async(req,res, next)=>{
    try {
        const chatroomlist = await db.User.findOne({
        where: { id: parseInt(req.user.id, 10) },
          include: [{
            model: db.User,
            as: 'Receivers',
            attributes: ['id','nickname'],
          },{
            model: db.User,
            as: 'Senders',
            attributes: ['id','nickname'],
          } ],
          attributes: ['id', 'nickname','email','status','createdAt'],
        });
        res.json(chatroomlist);
      } catch (err) {
        console.error(err);
        next(err);
      }
});
router.post('/chatroom', isLoggedIn, async (req, res, next) => {
    const me = await db.User.findOne({
        where: { id: req.user.id},
    });
    await me.addReceiver(req.body.receiverId);
    res.json(req.body.receiverId);
});

router.delete('/chatroom', isLoggedIn, async (req, res, next) => {
    const me = await db.User.findOne({
        where: { id: req.user.id},
    });
    await me.removeFollowing(req.params.id);
    res.send(req.params.id);
});
router.get('/:id', async(req,res, next)=>{
    try {
        const user = await db.User.findOne({
          where: { id: parseInt(req.params.id, 10) },
          include: [{
            model: db.Post,
            as: 'Posts',
            attributes: ['id'],
          }, {
            model: db.User,
            as: 'Followings',
            attributes: ['id'],
          }, {
            model: db.User,
            as: 'Followers',
            attributes: ['id'],
          }],
          attributes: ['id', 'nickname'],
        });
        res.json(user);
      } catch (err) {
        console.error(err);
        next(err);
      }
});

router.post('/', isNotLoggedIn, async (req,res,next) => {
    try{

        console.log('???????????????????');
        const hash = await bcrypt.hash(req.body.password, 12);
        const exUser = await db.User.findOne({
            where:{email : req.body.email,}
        });
        if(exUser){
            return res.status(400).json({
                errorCode: 1,
                message: '?????? ??????????????????????????????.',
            });
        }
        await db.User.create({



        
            email: req.body.email,
            password: hash,
            nickname: req.body.nickname,
            status:req.body.status,






        });
        passport.authenticate('local', (err, user, info)=>{
            if(err){
                console.error(err);
                return next(err);
            }
            if (info){
                return res.status(401).send(info.reason);
            }
            return req.login(user, async (err)=>{  //???????????? ????????? ?????? ?????? (?????????? serializeUser)
                if (err) {
                    console.error(err);
                    return next(err);
                }
                const fullUser = await db.User.findOne({
                    where: { id: user.id },
                    attributes: ['id', 'email', 'nickname','status'],
                    include: [{
                      model: db.Post,
                      attributes: ['id'],
                    }, {
                      model: db.User,
                      as: 'Followings',
                      attributes: ['id'],
                    }, {
                      model: db.User,
                      as: 'Followers',
                      attributes: ['id'],
                    }],
                });
                return res.json(fullUser);
            });
        })(req,res,next);
    } catch (err) {
        console.log(err);
        return next(err);
    }
    
});


router.post('/login', (req,res,next)=>{
    passport.authenticate('local', (err, user, info)=>{
        if(err){
            console.error(err);
            return next(err);
        }
        if (info){
            return res.status(401).send(info.reason);
        }
        return req.login(user, async (err)=>{  //???????????? ????????? ?????? ?????? (?????????? serializeUser)
            if (err) {
                console.error(err);
                return next(err);
            }
            const fullUser = await db.User.findOne({
                where: { id: user.id },
                attributes: ['id', 'email', 'nickname','status'],
                include: [{
                  model: db.Post,
                  attributes: ['id'],
                }, {
                  model: db.User,
                  as: 'Followings',
                  attributes: ['id'],
                }, {
                  model: db.User,
                  as: 'Followers',
                  attributes: ['id'],
                }],
            });
            return res.json(fullUser);
        });
    })(req,res,next);
});

router.post('/logout',
           // isLoggedIn,
            (req,res)=>{
    //if(req.isAuthenticated()){
        req.logout();
        req.session.destroy(); //????????????
        return res.status(200).send('???????????? ???????????????');
    //}
});

router.get('/:id/posts', async (req,res,next)=>{
    try {
        let where = {
            UserId: parseInt(req.params.id, 10),
            RetweetId: null,
        };
        if (parseInt(req.query.lastId, 10)) {
            where[db.Sequelize.Op.lt] = parseInt(req.query.lastId, 10);
        }
        const posts = await db.Post.findAll({
            where,
            include: [{
            model: db.User,
            attributes: ['id', 'nickname'],
            }, {
            model: db.Image,
            }, {
            model: db.User,
            through: 'Like',
            as: 'Likers',
            attributes: ['id'],
            }],
        });
        res.json(posts);
    } catch (e) {
        console.error(e);
        next(e);
    }
});
router.get('/:id/category', async (req,res,next)=>{
    try {
        let where = {
            CategoryId: parseInt(req.params.id, 10),
            
        };
        if (parseInt(req.query.lastId, 10)) {
            where[db.Sequelize.Op.lt] = parseInt(req.query.lastId, 10);
        }
        const posts = await db.Item.findAll({
            where,
            include: [{
            model: db.User,
            attributes: ['id', 'nickname'],
            }, {
            model: db.Image,
            }, {
                model: db.Image2,
            },{
            model: db.User,
            through: 'Like3',
            as: 'Itemlikers',
            attributes: ['id'],
            }],
        });
        res.json(posts);
    } catch (e) {
        console.error(e);
        next(e);
    }
});

router.post('/:id/follow', isLoggedIn, async (req, res, next) => {
    const me = await db.User.findOne({
        where: { id: req.user.id},
    });
    await me.addFollowing(req.params.id);
    res.send(req.params.id);
});

router.delete('/:id/follow', isLoggedIn, async (req, res, next) => {
    const me = await db.User.findOne({
        where: { id: req.user.id},
    });
    await me.removeFollowing(req.params.id);
    res.send(req.params.id);
});

router.patch('/nickname', isLoggedIn, async (req,res, next) => {  //put??? ????????? ??????????????? ?????????.
    try {
         await db.User.update({
             nickname : req.body.nicknmame,
         },{
            where: { id: req.user.id},
         });
         res.send(req.body.nickname);
    } catch (e) {
        console.error(e);
        next(e);
    }
});
router.patch('/updateuser', isLoggedIn, async (req,res, next) => {  //put??? ????????? ??????????????? ?????????.
    try {
         const updateuser = await db.User.update({
            
            email: req.body.email,
            nickname:req.body.nickname,
            status: req.body.status,
            
            createdAt: req.body.createdAt,
         },{
            where: { id: req.body.id},
         });
         res.json(updateuser);
    } catch (e) {
        console.error(e);
        next(e);
    }
});
router.get('/:id/followings', isLoggedIn, async (req,res,next)=>{
    try {
        const user = await db.User.findOne({
            where: {id:req.user.id},
        });
        const followings = await user.getFollowings({
            attributes:['id', 'nickname'],
            limit: parseInt(req.query.limit || 3, 10),
            offset: parseInt(req.query.offset || 0, 10),
        });
        res.json(followings);
    } catch(err){
        console.error(err);
        next(err);
    }
});

router.get('/:id/followers', isLoggedIn, async (req,res,next)=>{
    try {
        const user = await db.User.findOne({
            where: {id:req.user.id},
        });
        const followers = await user.getFollowers({
            attributes:['id', 'nickname'],
            limit: parseInt(req.query.limit || 3, 10),
            offset: parseInt(req.query.offset || 0, 10),
        });
        res.json(followers);
    } catch(err){
        console.error(err);
        next(err);
    }
});

router.delete('/:id/follower', isLoggedIn, async (req,res,next)=>{
    try{
        const me = await db.User.findOne({
            where: { id: req.user.id },
        });
        await me.removeFollower(req.params.id);
        res.send(req.params.id);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;