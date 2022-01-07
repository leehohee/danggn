module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
        name:{
            type: DataTypes.TEXT, //TEXT는 매우 긴 글
            allowNull:true,
        },
        
        
    }, {
        charset:'utf8mb4',
        collate: 'utf8mb4_general_ci',
    });
    Category.associate = (db) => {
        
        db.Category.hasMany(db.Item);
        
        
        
    };
    return Category;
};