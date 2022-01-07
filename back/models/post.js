module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
        content:{
            type: DataTypes.TEXT, //TEXT는 매우 긴 글
            allowNull:true,
        },
        process:{
            type:DataTypes.STRING(40),
            allowNull:true,
        },
        mapaddr:{
            type:DataTypes.STRING(200),
            allowNull:true,
        },
        budget:{
            type:DataTypes.STRING(40),
            allowNull:true,
        },
        cost:{
            type:DataTypes.STRING(40),
            allowNull:true,
        },
        expense:{
            type:DataTypes.STRING(40),
            allowNull:true,
        },
        site:{
            type:DataTypes.STRING(40),
            allowNull:true,
        },
    }, {
        charset:'utf8mb4',
        collate: 'utf8mb4_general_ci',
    });
    Post.associate = (db) => {
        db.Post.belongsTo(db.User); //UserId, Post.addUser, Post.setUser, Post.getUser, Post.removeUser
        db.Post.hasMany(db.Comment);
        db.Post.hasMany(db.Image);
        db.Post.belongsToMany(db.User, { through: 'Like', as: 'Likers'}); //liked 와 대응되는 likers
        db.Post.belongsTo(db.Post, { as : 'Retweet'}); //자기 자신과 관계를 할때 RetweetId
        db.Post.belongsToMany(db.Hashtag,{through: 'PostHashtag'});
        db.Post.belongsToMany(db.Hashtag2,{through: 'PostHashtag2'});
    };
    return Post;
};