const express = require('express');
const multer = require('multer');
const path = require('path');
const db = require('../models');


const { isLoggedIn} = require('./middlewares');
const router = express.Router();


const upload = multer({
    storage:multer.diskStorage({
        destination(req, file, done){
            done(null, 'uploads');  // 패스포트랑 비슷하게 만든다 라이브러리들이
        },
        filename(req, file, done){
            const ext = path.extname(file.originalname);
            const basename = path.basename(file.originalname, ext);
            done(null, basename + Date.now() + ext);
        },
    }),
    limit: { fileSize:20*1024*1024},
});

router.post('/images',isLoggedIn, upload.array('image'),(req,res) => {
    console.log(req.files);
    res.json(req.files.map(v => v.filename));
});

router.post('/image2s',isLoggedIn, upload.array('image'),(req,res) => {
    console.log(req.files);
    res.json(req.files.map(v => v.filename));
});


router.post('/', isLoggedIn, async (req, res, next) => {
    try{
        const hashtags = req.body.content.match(/#[^\s#]+/g);
        const newPost = await db.Post.create({
            content: req.body.content,
            UserId: req.user.id,
        });
        if(hashtags){
            const result = await Promise.all(hashtags.map(tag => db.Hashtag.findOrCreate({  //없는 경우에만 저장하라
                where:{ name: tag.slice(1).toLowerCase() }
            })));
            await newPost.addHashtags(result.map(r => r[0]));  //시퀄라이즈에서 자동으로 add,get,set,remove뒤에 모델명 붙은 메서드가 생김 뷰버드 4-17, 8:54
            // db.sequelize.query('SELECT * FROM'); 안될때 직접쿼리날리기
        }
        if (req.body.image){
            if(Array.isArray(req.body.image)){
                await Promise.all(req.body.image.map((image)=>{
                    return db.Image.create({ src: image, PostId: newPost.id}); //await안붙으면 promise다
                }));
            } else {
                await db.Image.create({src:req.body.image, PostId: newPost.id});
            }
        }
        const fullPost = await db.Post.findOne({
            where: {
                id: newPost.id
            },
            include:[{
                model: db.User, // 시퀄라이즈의 엄청 좋은 기능, 이 게시글 쓴 사람 가져오기
                attributes:['id', 'nickname'], //다 가져오진 말고 아이디랑 닉네임만 가져오도록
            },{
                model: db.Image, //이미지까지 합쳐서 보내준다.
            },{
                model : db.User,
                as : 'Likers',
                attributes: ['id'],
            }],
        });
        return res.json(fullPost);
    } catch(err){
        console.error(err);
        next(err);
    }
});

router.post('/item', isLoggedIn, async (req, res, next) => {
    try{
        const categoryName = await db.Category.findOne({
            where:{

                name : req.body.category,
            },
        });
        
        const newPost = await db.Item.create({
            content: req.body.content,
            modify:req.body.modify,
            cost:req.body.cost,
            title:req.body.title,
            status:1,
            CategoryId:categoryName.id,
            UserId: req.user.id,
            currenttime : db.sequelize.literal('CURRENT_TIMESTAMP'),
        });
        
        if (req.body.image){
            if(Array.isArray(req.body.image)){
                await Promise.all(req.body.image.map((image)=>{
                    return db.Image.create({ src: image, ItemId: newPost.id}); //await안붙으면 promise다
                }));
            } else {
                await db.Image.create({src:req.body.image, ItemId: newPost.id});
            }
        }
        if (req.body.image2){
            if(Array.isArray(req.body.image2)){
                await Promise.all(req.body.image2.map((image)=>{
                    return db.Image2.create({ src: image, ItemId: newPost.id}); //await안붙으면 promise다
                }));
            } else {
                await db.Image2.create({src:req.body.image2, ItemId: newPost.id});
            }
        }
        const fullPost = await db.Item.findOne({
            where: {
                id: newPost.id
            },
            include:[{
                model: db.User, // 시퀄라이즈의 엄청 좋은 기능, 이 게시글 쓴 사람 가져오기
                attributes:['id', 'nickname'], //다 가져오진 말고 아이디랑 닉네임만 가져오도록
            },{
                model: db.Image, //이미지까지 합쳐서 보내준다.
            },{
                model: db.Image2,
            },{
                model : db.User,
                as : 'Itemlikers',
                attributes: ['id'],
            }],
        });
        return res.json(fullPost);
    } catch(err){
        console.error(err);
        next(err);
    }
});

router.post('/chat', isLoggedIn, async (req, res, next) => {
    try{
        
        const newChat = await db.Message.create({
            content: req.body.content,
            SenderId: req.body.senderId,
            ReceiverId : req.body.receiverId,
        });
        
        const fullChat = await db.Message.findOne({
            where: {
                id: newChat.id
            },
            
        });
        return res.json(fullChat);
    } catch(err){
        console.error(err);
        next(err);
    }
});
router.post('/makeOrder', isLoggedIn, async (req, res, next) => {
    try{
        
        const newOrder = await db.Order.create({
            status:1,
            UserId:req.user.id,
            cost:req.body.cost,

        });
        
        const fullOrder = await db.Order.findOne({
            where: {
                id: newOrder.id
            },
            
        });
        await fullOrder.addOrdereditem(req.body.itemId);
        return res.json(fullOrder);
    } catch(err){
        console.error(err);
        next(err);
    }
});
router.post('/chatroom', isLoggedIn, async (req, res, next) => {
    try{
        const chatroom = await db.Chatroom.findOne({
            where:
                
                    {UserId: req.body.UserId, receiverId: req.body.receiverId},
                    
                
            
        });
        if (!chatroom){
            const newChatroom = await db.Chatroom.create({
            
                UserId: req.body.UserId,
                receiverId : req.body.receiverId,
            });
            return res.json(newChatroom);
        }
        return res.send('방이 이미 존재함');
        
              
        
    } catch(err){
        console.error(err);
        next(err);
    }
});
router.post('/:id/chat', isLoggedIn, async (req,res, next) => {
    try {
        const chat = await db.Message.findOne({where:{ Senderid: req.user.id}});
        if (!chat){
            return res.status(404).send('포스트가 존재하지 않습니다.');
        }
        const fullChat = await db.Message.findAll({
            where: {

                [db.Sequelize.Op.or] : [
                    {Senderid: req.user.id, ReceiverId: req.params.id},
                    {Senderid: req.params.id, ReceiverId:req.user.id }
                ]
                
            },
            order: [['createdAt', 'ASC']],
        });
        return res.json(fullChat);
    }catch(e){
        console.error(e);
        next(e);
    }
});


router.post('/house', isLoggedIn, async (req, res, next) => {
    try{
        
    
        return res.json(fullPost);
    } catch(err){
        console.error(err);
        next(err);
    }
});


router.post('/selecthouse', isLoggedIn, async (req, res, next) => {
    try{
        
        
        const fullPost = await db.Hashtag.findAll({
            where: {
                tree:req.body.tree,
                py:req.body.py,
                solo:req.body.solo,
            },
            include:[{
                model: db.User, // 시퀄라이즈의 엄청 좋은 기능, 이 게시글 쓴 사람 가져오기
                attributes:['id', 'nickname'], //다 가져오진 말고 아이디랑 닉네임만 가져오도록
            },{
                model: db.Image, //이미지까지 합쳐서 보내준다.
            }],
        });
        return res.json(fullPost);
    } catch(err){
        console.error(err);
        next(err);
    }
});

router.post('/category', isLoggedIn, async (req, res, next) => {
    try{
        
        const newCategory = await db.Category.create({
            
            name: req.body.content,


        });
        
            
        
            
        
        
        
        return res.json(newCategory);
    } catch(err){
        console.error(err);
        next(err);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const post = await db.Post.findOne({
        where: { id: req.params.id },
        include: [{
            model: db.User,
            attributes: ['id', 'nickname'],
        }, {
            model: db.Image,
        }, {
            model: db.User,
            as: 'Likers',
            attributes: ['id'],
        }, {
            model: db.Post,
            as: 'Retweet',
            include: [{
            model: db.User,
            attributes: ['id', 'nickname'],
            }, {
            model: db.Image,
            }],
        }, {
            model: db.Hashtag,
            
            include:[{
                model:db.Image,
            }],
        }],
        });
        res.json(post);
    } catch (err) {
        console.error(err);
        next(err);
    }
});


router.patch('/updateitem', isLoggedIn, async (req,res, next) => {  //put은 통채로 갈아벌이는 것이다.
    try {

        const updateItem = await db.Item.findOne({
            where: { id: req.body.id },
        });

        await updateItem.update({
            content: req.body.content,
            
            cost:req.body.cost,
            title:req.body.title,
            currenttime:req.body.currenttime,
            CategoryId:req.body.CategoryId,
         });
         res.json(updateItem);
    } catch (e) {
        console.error(e);
        next(e);
    }
});
router.get('/:id/item', async (req, res, next) => {
    try {
        const item = await db.Item.findOne({
        where: { id: req.params.id },
        include: [{
            model: db.User,
            attributes: ['id', 'nickname'],
        }, {
            model: db.Image,
        }, {
            model: db.Image2,
        },{
            model: db.User,
            as: 'Itemlikers',
            attributes: ['id'],
        }, {
            model: db.Category,
            attributes: ['name'],
        }
        ],
        });
        res.json(item);
    } catch (err) {
        console.error(err);
        next(err);
    }
});
router.delete('/:id/item', async (req, res, next)=>{
    try {
        await db.Item.destroy({
            where:{
                id: req.params.id,
            }
        });
        res.send('삭제했습니다.');
    } catch (err) {
        console.error(err);
        next(err);
    }
});
router.delete('/:id', async (req, res, next)=>{
    try {
        await db.Post.destroy({
            where:{
                id: req.params.id,
            }
        });
        res.send('삭제했습니다.');
    } catch (err) {
        console.error(err);
        next(err);
    }
});




router.get('/:id/comments', async (req, res, next) => {
    try {
        const post = await db.Post.findOne({ where: { id: req.params.id}});
        if(!post){
            return res.status(404).send('포스트가 존재하지 않습니다.');
        }
        const comments = await db.Comment.findAll({
            where : {
                PostId: req.params.id,
            },
            include: [{
                model: db.User,
                attributes:['id', 'nickname'],
            }],
            order: [['createdAt', 'ASC']],
        });
        return res.json(comments);
    } catch (err) {
        console.error(err);
        next(err);
    }
});
router.get('/:id/userlikeitem', async (req, res, next) => {
    try {
        const user = await db.User.findOne({where:{ id: req.params.id}});
        
        const items = await user.getItemliked({
            include: [{
                    model:db.Image,
                }
            ]
        }); 
        
        return res.json(items);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.post('/:id/comment', isLoggedIn, async (req, res, next) =>{
    try {
        const post = await db.Post.findOne({ where : { id: req.params.id} });
        if(!post){
            return res.status(404).send('포스트가 존재하지 않습니다.');
        }
        const newComment = await db.Comment.create({
            PostId : post.id,
            UserId: req.user.id,
            content: req.body.content,
        });
        const comment = await db.Comment.findOne({
            where : {
                id : newComment.id,
            },
            include:[{
                model: db.User,
                attributes: ['id', 'nickname'],
            }]
        });
        return res.json(comment);
    } catch (err) {
        next(err);
    }
});

router.post('/:id/retweet',isLoggedIn, async (req,res,next)=>{
    try{
        const post = await db.Post.findOne({
            where:{ id: req.params.id},
            include: [{
                model: db.Post,
                as: 'Retweet', //리트윗한 게시글이면 원본 게시글이됨
            }],
        });
        if(!post){
            return res.status(404).send('포스트가 존재하지 않습니다.');
        }
        if(req.user.id === post.UserId || (post.Retweet && post.Retweet.UserId ===req.user.id)){
            return res.status(403).send('자신의 글은 리트윗할 수 없습니다.');
        }
        const retweetTargetId = post.RetweetId || post.id;
        const exPost = await db.Post.findOne({
            where : {
                UserId: req.user.id,
                RetweetId : retweetTargetId,
            },
        });
        if (exPost) {
            return res.status(403).send('이미 리트윗했습니다.');
        }
        const retweet = await db.Post.create({
            UserId: req.user.id,
            RetweetId : retweetTargetId,
            content: 'retweet',
        });
        const retweetWithPrevPost = await db.Post.findOne({
            where : { id: retweet.id},
            include: [{
                model: db.User,
                attributes: ['id', 'nickname'],
            }, {
                model : db.User,
                as : 'Likers',
                attributes: ['id'],
            },{
                model: db.Post,
                as : 'Retweet',
                include: [{
                    model: db.User,
                    attributes: ['id', 'nickname'],
                },{
                    model:db.Image,
                }],
            }]
        });
        res.json(retweetWithPrevPost);
    }catch(err){
        console.error(err);
        next(err);
    }
});

router.post('/:id/like', isLoggedIn, async (req,res, next) => {
    try {
        const post = await db.Post.findOne({where:{ id: req.params.id}});
        if (!post){
            return res.status(404).send('포스트가 존재하지 않습니다.');
        }
        await post.addLiker(req.user.id);  //시퀄라이즈가 이런면에서 표현력이 좋다.
        res.json({ userId: req.user.id});
    }catch(e){
        console.error(e);
        next(e);
    }
});

router.delete('/:id/like', isLoggedIn, async (req,res, next) => {
    try{
        const post = await db.Post.findOne({where:{ id: req.params.id}});
        if (!post){
            return res.status(404).send('포스트가 존재하지 않습니다.');
        }
        await post.removeLiker(req.user.id);  //시퀄라이즈가 이런면에서 표현력이 좋다.
        res.json({ userId: req.user.id});
    }catch(e){
        console.error(e);
        next(e);
    }
});
router.post('/:id/itemlike', isLoggedIn, async (req,res, next) => {
    try {
        const post = await db.Item.findOne({where:{ id: req.params.id}});
        if (!post){
            return res.status(404).send('포스트가 존재하지 않습니다.');
        }
        await post.addItemliker(req.user.id);  //시퀄라이즈가 이런면에서 표현력이 좋다.
        res.json({ userId: req.user.id});
    }catch(e){
        console.error(e);
        next(e);
    }
});

router.delete('/:id/itemlike', isLoggedIn, async (req,res, next) => {
    try{
        const post = await db.Item.findOne({where:{ id: req.params.id}});
        if (!post){
            return res.status(404).send('포스트가 존재하지 않습니다.');
        }
        await post.removeItemliker(req.user.id);  //시퀄라이즈가 이런면에서 표현력이 좋다.
        res.json({ userId: req.user.id});
    }catch(e){
        console.error(e);
        next(e);
    }
});

module.exports = router;