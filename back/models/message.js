module.exports = (sequelize, DataTypes) => {
    const Message = sequelize.define('Message', {
        content:{
            type: DataTypes.TEXT, //TEXT는 매우 긴 글
            allowNull:true,
        },
        

        
    }, {
        charset:'utf8mb4',
        collate: 'utf8mb4_general_ci',
    });
    Message.associate = (db) => {
        
        
        db.Message.belongsTo(db.User, { as: "Sender" });
        db.Message.belongsTo(db.User, { as: "Receiver" });
        
        
    };
    return Message;
};