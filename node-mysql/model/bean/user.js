const config = require('../../config/config');
const connection = require(`${config.root}/config/connection/connection_pool`);
const Sequelize = require("sequelize");

module.exports = (() => {
    var User = connection.define('user',
        {
            empId: {
                type: Sequelize.CHAR(10), // 字段类型
                allowNull: false,         // 是否允许为NULL
                unique: true              // 字段是否UNIQUE(唯一)
            },
            nick: {
                type: Sequelize.CHAR(10),
                allowNull: false
            },
            department: {
                type: Sequelize.STRING(64),
                allowNull: true
            }
        },
        {
            timestamps: false,  //去除createAt updateAt
            freezeTableName: true,  //使用自定义表名
            // 实例对应的表名
            tableName: 'users',
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
    User.prototype.testFunction = () => {
        this.username = "John";
    }

// Class methods
    User.anotherTestFunction = () => {
        User.findOne().then(() => {
        });
    };

    return User;
})();


//测试
(async function () {

    //检查此模块是否是主模块(单独运行该文件才会运行。)
    if (require.main === module) {
        let User = module.exports;

        await User.sync(false);

        //user的增删改查

        /**
         * 单表增删改查
         * 通过Sequelize获取的模型对象都是一个DAO（Data Access Object）对象，
         * 这些对象会拥有许多操作数据库表的实例对象方法（比如：save、update、destroy等），
         * 需要获取“干净”的JSON对象可以调用get({‘plain’: true})。
         */
            //todo ####增加
            //方法1：build后对象只存在于内存中，调用save后才操作db
        let user = User.build({
                empId: Math.floor(Math.random() * 1000),
                nick: 'zpy',
                department: '技术部'
            });

        user = await user.save();
        console.log("build后对象只存在于内存中，调用save后才操作db", user.get({'plain': true}));

        // 方法2：直接操作db
        user = await User.create({
            'empId': Math.floor(Math.random() * 1000),
            'nick': '小明',
            'department': '技术部'
        });
        console.log("直接操作db", user.get({'plain': true}));

        //todo ####改
        // 方法1：操作对象属性（不会操作db），调用save后操作db
        user.nick = '小白';
        user = await user.save();
        console.log(user.get({'plain': true}));

        // 方法2：直接update操作db
        user = await user.update({
            'nick': '小白白'
        });
        console.log(user.get({'plain': true}));

        //如果想限制更新属性的白名单，这样就只会更新nick字段，而emp_id会被忽略。
        // 方法1
        user.empId = '33';
        user.nick = '小白';
        user = await user.save({'fields': ['nick']});
        console.log(user.get({'plain': true}));
        // 方法2
        user = await user.update(
            {'emp_id': '33', 'nick': '小白1'},
            {'fields': ['nick']}
        );
        console.log(user.get({'plain': true}));

        //todo ####删
        /**
         * 这里有个特殊的地方是，如果我们开启了paranoid（偏执）模式，
         * destroy的时候不会执行DELETE语句，而是执行一个UPDATE语句将deleted_at字段设置为当前时间（一开始此字段值为NULL）。
         * 我们可以使用user.destroy({force: true})来强制删除，从而执行DELETE语句进行物理删除。
         */
        await user.destroy();
        console.log(user.get({'plain': true}));

        //todo ####查
        var users = await User.findAll();
        console.log(users);

        //限制字段
        var users = await User.findAll({
            'attributes': ['empId', 'nick']
        });
        console.log(users);

        //字段重命名
        var users = await User.findAll({
            'attributes': [
                'empId', ['nick', 'userNick']
            ]
        });
        console.log(users);

        //where条件
        var users = await User.findAll({
            'where': {
                id: [11, 12],
                nick: '小明'
            }
        });
        console.log(users);

        //操作符  操作符是对某个字段的进一步约束，可以有多个（对同一个字段的多个操作符会被转化为AND）。
        var users = await User.findAll({
            'where': {
                'id': {
                    '$eq': 1,                // id = 1
                    '$ne': 2,                // id != 2

                    '$gt': 6,                // id > 6
                    '$gte': 6,               // id >= 6

                    '$lt': 10,               // id < 10
                    '$lte': 10,              // id <= 10

                    '$between': [6, 10],     // id BETWEEN 6 AND 10
                    '$notBetween': [11, 15], // id NOT BETWEEN 11 AND 15

                    '$in': [11, 12],           // id IN (1, 2)
                    '$notIn': [3, 4]         // id NOT IN (3, 4)
                },
                // 'nick': {
                //     // '$like': '%a%',          // nick LIKE '%a%'
                //     // '$notLike': '%1'         // nick NOT LIKE '%a'
                // },
                // 'updated_at': {
                //     '$eq': null,             // updated_at IS NULL
                //     '$ne': null              // created_at IS NOT NULL
                // }
            }
        });
        console.log("操作符 ", users);

        //AND条件
        // var users = await User.findAll({
        //     'where': {
        //         '$and': [
        //             {'id': [11, 12]},
        //             {'nick': "小明"}
        //         ]
        //     }
        // });
        // console.log("AND条件", users);

        // //OR条件
        // var users = await User.findAll({
        //     'where': {
        //         '$or': [
        //             {id: [11, 12]},
        //             {nick: null}
        //         ]
        //     }
        // });
        // console.log(users);

        // //NOT条件
        // var users = await User.findAll({
        //     'where': {
        //         '$not': [
        //             {'id': [11, 12]},
        //             {'nick': null}
        //         ]
        //     }
        // });
        // console.log(users);

        /**
         * 批量操作
         */

            // todo 插入
        var users = await User.bulkCreate(
            [
                {'empId': 'aaaa', 'nick': 'a'},
                {'empId': 'bbaa', 'nick': 'b'},
                {'empId': 'ccaa', 'nick': 'c'}
            ]
            );
        console.log(users);
        users.forEach((user) => {
            user.destroy();
            console.log(user.get({plain: true}))
        })

        // todo update更新
        var affectedRows = await User.update(
            {'nick': 'hhhh'},
            {
                'where': {
                    'id': [12, 13, 14]
                }
            }
        );
        console.log(affectedRows);

        // todo 删除
        var affectedRows = await User.destroy({
            'where': {'id': [2, 3, 4]}
        });
        console.log(affectedRows)

        /**
         * 关系
         * 关系一般有三种：一对一、一对多、多对多。Sequelize提供了清晰易用的接口来定义关系、进行表间的操作。
         */
    }
})();
