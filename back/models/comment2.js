module.exports = (sequelize, DataTypes) => {
    const Comment2 = sequelize.define('Comment2', {
        content:{
            type: DataTypes.TEXT, //TEXT는 매우 긴 글
            allowNull:false,
        },
        star:{
            type:DataTypes.STRING(60),
            allowNull:true,  
        },
        image1url:{
            type:DataTypes.STRING(60),
            allowNull:true,  
        },

    }, {
        charset:'utf8mb4',
        collate: 'utf8mb4_general_ci',
    });
    Comment2.associate = (db) => {
        db.Comment2.belongsTo(db.User);
        db.Comment2.belongsTo(db.Item);
        db.Comment2.hasMany(db.Image);
    };
    return Comment2;
};