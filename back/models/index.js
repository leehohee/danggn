const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.User = require('./user')(sequelize, Sequelize); 
db.Post = require('./post')(sequelize, Sequelize); 
db.Comment = require('./comment')(sequelize, Sequelize); 
db.Comment2 = require('./comment2')(sequelize, Sequelize); 
db.Hashtag = require('./hashtag')(sequelize, Sequelize); 
db.Hashtag2 = require('./hashtag2')(sequelize, Sequelize); 
db.Image = require('./image')(sequelize, Sequelize); 
db.Image2 = require('./image2')(sequelize, Sequelize); 
db.Item = require('./item')(sequelize, Sequelize); 
db.Order = require('./order')(sequelize, Sequelize); 
db.Category = require('./category')(sequelize, Sequelize); 
db.Message = require('./message')(sequelize, Sequelize); 
db.Chatroom = require('./chatroom')(sequelize, Sequelize); 

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
