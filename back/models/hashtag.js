module.exports = (sequelize, DataTypes) => {
    const Hashtag = sequelize.define('Hashtag', {
        content:{
            type: DataTypes.STRING(20), //TEXT는 매우 긴 글
            allowNull:false,
        },
        imageurl:{
            type:DataTypes.STRING(40),
            allowNull:true,
        },
        tree:{
            type:DataTypes.STRING(40),
            allowNull:true,
        },
        py:{
            type:DataTypes.STRING(40),
            allowNull:true,
        },
        solo:{
            type:DataTypes.STRING(40),
            allowNull:true,
        },
    }, {
        charset:'utf8mb4',
        collate: 'utf8mb4_general_ci',
    });
    Hashtag.associate = (db) => {
        db.Hashtag.belongsToMany(db.Post,{through: 'PostHashtag'});
        db.Hashtag.hasMany(db.User);
        db.Hashtag.hasMany(db.Image);
    };
    return Hashtag;
};