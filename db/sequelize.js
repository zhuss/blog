const Sequelize = require('sequelize')
const config  = require('./config')
let sequelize = new Sequelize(config.database,
    config.user,
    config.password,
    {
        host:config.host,
        port:config.port,
        dialect:'mysql',
        operatorsAliases: false,
        pool:{
            max: 5, // 连接池中最大连接数量
            min: 0, // 连接池中最小连接数量
            idle: 10000 // 如果一个线程 10 秒钟内没有被使用过的话，那么就释放线程
        },
        timezone: '+08:00' //东八时区
    });
    //sequelize.sync({force: true});
module.exports = sequelize



