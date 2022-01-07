const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const passport = require('passport');
const session = require('express-session');
const cookie = require('cookie-parser');
const morgan = require('morgan');
const hpp = require('hpp');
const helmet = require('helmet');
const dotenv = require('dotenv');

const prod = process.env.NODE_ENV === 'production';
const db = require('./models');
const passportConfig = require('./passport');
const userRouter = require('./routes/user');
const postRouter = require('./routes/post');
const postsRouter = require('./routes/posts');
const hashtagRouter = require('./routes/hashtag');
const { ConnectionError } = require('sequelize');
const app = express();

dotenv.config();
db.sequelize.sync(); //{force:true}
passportConfig();


if (prod){
    app.use(helmet());
    app.use(hpp());
    app.use(morgan('combined'));
    app.use(cors({
        origin: ['http://localhost:3000','http://dothemagic.net:3000','http://221.167.218.93:3000','http://localhost:4000','http://www.comforde.co.kr','http://localhost:80','http://localhost','http://13.124.120.85:80'],
        credentials: true,
    }));
} else {
    app.use(morgan('dev'));
    app.use(cors({
        origin: ['http://localhost:3000','http://dothemagic.net:3000','http://221.167.218.93:3000','http://localhost:4000','http://localhost:80','http://localhost:2525','http://localhost:2552','http://localhost','http://13.124.120.85:80'],
        credentials: true,
    }));
}




app.use('/', express.static('uploads'));
app.use(express.json()); //use는 미들웨어
app.use(express.urlencoded({extended:false}));
app.use(cookie(process.env.COOKIE_SECRET));
app.use(session({
    resave:false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly:true,
        secure: false,
        //domain: prod && '.comforde.co.kr', 
    }
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/',(req,res)=>{
    res.status(200).send('안녕 시퀄라이즈');
});

app.use('/user', userRouter);
app.use('/post', postRouter);
app.use('/posts', postsRouter);
app.use('/hashtag', hashtagRouter);




app.listen(prod ? process.env.PORT : 3065, ()=>{
    console.log(`백엔드 서버 ${prod ? process.env.PORT : 3065}번 포트에서 작동중.`);
});