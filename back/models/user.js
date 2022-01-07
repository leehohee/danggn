module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User',{
        email:{
            type:DataTypes.STRING(40),
            allowNull:false,
            unique:true, //중복금지
        },
        nickname:{
            type:DataTypes.STRING(20),
            allowNull:false,
        },
        password:{
            type:DataTypes.STRING(100),
            allowNull:false,
        },
        status:{
            type:DataTypes.STRING(40),
            allowNull:true,
            
        },
        sigongname:{
            type:DataTypes.STRING(40),
            allowNull:true,
        },
        usernumber:{
            type:DataTypes.STRING(40),
            allowNull:true,
        },
    },{
        charset:'utf8',
        collate: 'utf8_general_ci', //한글저장됨
    });

    User.associate = (db) => {
        db.User.hasMany(db.Post);
        db.User.hasMany(db.Comment);
        db.User.hasMany(db.Item);
        db.User.hasMany(db.Order);
        db.User.hasMany(db.Image);
        db.User.hasMany(db.Chatroom);
        db.User.belongsToMany(db.Post, { through: 'Like', as: 'Liked'}); //시퀄라이즈가 헛갈려해서 하나는 이렇게 명시적으로 설정해줘야함
        db.User.belongsToMany(db.Comment, { through: 'Like2', as: 'Pick'}); //시퀄라이즈가 헛갈려해서 하나는 이렇게 명시적으로 설정해줘야함
        db.User.belongsToMany(db.Item, { through: 'Like3', as: 'Itemliked'}); //시퀄라이즈가 헛갈려해서 하나는 이렇게 명시적으로 설정해줘야함
        db.User.belongsToMany(db.User, { through: 'Follow', as:'Followers', foreignKey:'followingId'}); //외래키는 남의키라는 뜻, 남이 갖고 있는 나의 아이디, 해서 나를 팔로우하는 팔로워들은 외래키로 팔로윙하는 나의 아이디를 갖고 있다.
        db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followings', foreignKey:'followerId'});
        db.User.belongsToMany(db.User, { through: 'Chat', as:'Receivers', foreignKey:'senderId'}); //외래키는 남의키라는 뜻, 남이 갖고 있는 나의 아이디, 해서 나를 팔로우하는 팔로워들은 외래키로 팔로윙하는 나의 아이디를 갖고 있다.
        db.User.belongsToMany(db.User, { through: 'Chat', as: 'Senders', foreignKey:'receiverId'});
    };
    return User;
};