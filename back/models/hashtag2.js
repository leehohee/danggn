module.exports = (sequelize, DataTypes) => {
    const Hashtag2 = sequelize.define('Hashtag2', {
        content:{
            type: DataTypes.STRING(20), //TEXT는 매우 긴 글
            allowNull:false,
        },
        imageurl:{
            type:DataTypes.STRING(40),
            allowNull:true,
        },
        style:{
            type:DataTypes.STRING(40),
            allowNull:true,
        },
        floor:{
            type:DataTypes.STRING(40),
            allowNull:true,
        },
        wall:{
            type:DataTypes.STRING(40),
            allowNull:true,
        },
    }, {
        charset:'utf8mb4',
        collate: 'utf8mb4_general_ci',
    });
    Hashtag2.associate = (db) => {
        db.Hashtag2.belongsToMany(db.Post,{through: 'PostHashtag2'});
    };
    return Hashtag2;
};