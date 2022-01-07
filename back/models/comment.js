module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        content:{
            type: DataTypes.TEXT, //TEXT는 매우 긴 글
            allowNull:false,
        },
        image1url:{
            type:DataTypes.STRING(60),
            allowNull:true,
        },
    }, {
        charset:'utf8mb4',
        collate: 'utf8mb4_general_ci',
    });
    Comment.associate = (db) => {
        db.Comment.belongsTo(db.User);
        db.Comment.belongsTo(db.Post);
        db.Comment.hasMany(db.Image);
    };
    return Comment;
};