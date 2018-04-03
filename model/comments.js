const Sequelize = require('sequelize')
const sequelize = require('../db/sequelize')

let Comments = sequelize.define('comments',{
        id:{type:Sequelize.INTEGER,autoIncrement:true,primaryKey:true,unique:true},
        blogid:{type:Sequelize.STRING},
        content:{type:Sequelize.STRING}
    });
module.exports = Comments