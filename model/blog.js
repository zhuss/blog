const Sequelize = require('sequelize')
const sequelize = require('../db/sequelize')

let Blog = sequelize.define('blog',{
        id:{type:Sequelize.INTEGER,autoIncrement:true,primaryKey:true,unique:true},
        title:{type:Sequelize.STRING},
        author:{type:Sequelize.STRING},
        abstract:{type:Sequelize.STRING},
        content:{type:Sequelize.TEXT}
    });
module.exports = Blog