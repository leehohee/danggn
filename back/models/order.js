module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
        content:{
            type: DataTypes.TEXT, //TEXT는 매우 긴 글
            allowNull:true,
        },
        cost:{
            type:DataTypes.STRING(40),
            allowNull:true,
        },
        status:{
            type:DataTypes.STRING(40),
            allowNull:true,
        },
        date:{
            type:DataTypes.STRING(40),
            allowNull:true,
        }
    }, {
        charset:'utf8mb4',
        collate: 'utf8mb4_general_ci',
    });
    Order.associate = (db) => {
        db.Order.belongsTo(db.User); //UserId, Post.addUser, Post.setUser, Post.getUser, Post.removeUser
        db.Order.belongsToMany(db.Item,{through:'Orderlist', as:'Ordereditems'});
        
        
        
        
    };
    return Order;
};