const config = require('../../config/config');
const connection = require(`${config.root}/config/connection/connection_pool`);
const Sequelize = require("sequelize");


var School = connection.define('school',
    {
        schoolName: Sequelize.STRING
    },
    {
        timestamps: false,  //去除createAt updateAt
        freezeTableName: true,  //使用自定义表名
        // 实例对应的表名
        tableName: 'schools',
        // 如果需要sequelize帮你维护createdAt,updatedAt和deletedAt必须先启用timestamps功能
        // 将createdAt对应到数据库的created_at字段
        createdAt: 'created_at',
        // 将updatedAt对应到数据库的updated_at字段
        updatedAt: 'updated_at',
        //And deletedAt to be called destroyTime (remember to enable paranoid for this to work)
        deletedAt: false, //'deleted_at',
        //删除数据时不删除数据，而是更新deleteAt字段 如果需要设置为true，则上面的deleteAt字段不能为false，也就是说必须启用
        paranoid: false
    }, {
        hooks: {
            afterCreate(user, options) {
                user.testFunction();
            }
        }
    });

// Instance methods
School.prototype.testFunction = () => {
    this.username = "John";
};


module.exports = School;

//测试
(async function () {
    //检查此模块是否是主模块(单独运行该文件才会运行。)
    if (require.main === module) {
        console.log(School.create())
    }
})();
