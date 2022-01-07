exports.isLoggedIn = (req, res, next) => { //대표적인것은 module.exports이고 exports.은 사소한것들 exports === {}이기 때문에 module.exports가 우선권이 있어서 덮어씌어진다.
    if(req.isAuthenticated()){
        return next(); //인자로 아무것도 넣지 않았을때만 다음 미들웨어로 넘어간다. 인수가 있으면 에러처리로 넘어간다.
    }
    return res.status(401).send('로그인이 필요합니다.');
};



exports.isNotLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        return next();
    }
    return res.status(401).send('로그인한 사람은 이용할 수 없습니다.');
};