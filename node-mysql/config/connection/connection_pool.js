var Sequelize = require('sequelize');
const config = require("../dbconfig");
const connection = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    port: config.port,
    dialect: 'mysql',
    dialectOptions: {
        socketPath: '/tmp/mysql.sock' // 指定套接字文件路径
    },
// 是否自动进行下划线转换（这里是因为DB默认的命名规则是下划线方式，而我们使用的大多数是驼峰方式）
    underscored: true,
    pool: {
        max: 5,                             // 最大值
        min: 0,                          // 最小值
        acquire: 30000,           //
        idle: 10000                  // 闲时超时
    },
    timezone: '+08:00'
});

connection.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = connection;

// 测试
(async function () {
    //检查此模块是否是主模块(单独运行该文件才会运行。)
    if (require.main === module) {
        console.log("===================");
        console.log(connection);
    }
})();
