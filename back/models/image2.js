module.exports = (sequelize, DataTypes) => {
    const Image2 = sequelize.define('Image2', {
        src:{
            type: DataTypes.STRING(200), //TEXT는 매우 긴 글
            allowNull:false,
        },
    }, {
        charset:'utf8',
        collate: 'utf8_general_ci',
    });
    Image2.associate = (db) => {
        
        db.Image2.belongsTo(db.Item);
        
    };
    return Image2;
};