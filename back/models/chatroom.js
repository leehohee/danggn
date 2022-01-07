module.exports = (sequelize, DataTypes) => {
    const Chatroom = sequelize.define('Chatroom', {
        
        receiverId:{
            type:DataTypes.STRING(60),
            allowNull:true,
        },
        

        
    }, {
        charset:'utf8mb4',
        collate: 'utf8mb4_general_ci',
    });
    Chatroom.associate = (db) => {
        
        
        db.Chatroom.belongsTo(db.User);
        
        
        
    };
    return Chatroom;
};