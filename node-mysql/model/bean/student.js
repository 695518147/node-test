const config = require('../../config/config');
const connection = require(`${config.root}/config/connection/connection_pool`);
const Sequelize = require("sequelize");

var Student = connection.define('student',
    {
        'empId': {
            'type': Sequelize.CHAR(10),
            'allowNull': false,
            'unique': true
        }
    }
);
var Account = connection.define('account',
    {
        'email': {
            'type': Sequelize.CHAR(20),
            'allowNull': false
        }
    }
);

/*
 * User的实例对象将拥有getAccount、setAccount、addAccount方法
 */
Student.hasOne(Account);
/*
 * Account的实例对象将拥有getUser、setUser、addUser方法
 */
Account.belongsTo(Student);


module.exports = Student;

//测试
(async function () {
    //检查此模块是否是主模块(单独运行该文件才会运行。)
    if (require.main === module) {
        let Student = module.exports;
        await Account.sync();
        await Student.sync();
        // todo 增
        let student = await Student.create({'empId': Math.floor(Math.random() * 1000)});
        let account = student.createAccount({'email': 'a'});
        console.log(account.get({'plain': true}));

        // todo 改
        var anotherAccount = await Account.create({'email': 'b'});
        console.log(anotherAccount);
        anotherAccount = await student.setAccount(anotherAccount);
        console.log(anotherAccount);

        //删
        await student.setAccount(null);
        console.log(student.get({plain:true}))

        //查 调用user的getAccount方法，根据外键来获取对应的account。
        let account1 = await student.getAccount();
        console.log(account1);

        var user = await Student.findByPk(1, {
            'include': [Account]
        });
        console.log(user.get({'plain': true}));
    }
})();
