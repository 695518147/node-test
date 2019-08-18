#### sequelize中文链接 https://itbilu.com/nodejs/npm/V1PExztfb.html

#### 1.sequelize
sequelize 是 nodejs 操作数据库的一个 orm（object-relational-mapping） 库， 
支持 PostgreSQL、 MySQL、 SQLite 、MSSQL 数据库， 还是 promise 的调用方式，
和支持连接池和事务还有防注入， 还有其他轻巧便利的功能，能大大提高数据库操作的效率。


#### 2.根据连接的数据库不同， 安装不同的数据库操作模块, 比如连接 mysql 就要安装 
mysql2 模块， 不然会报错， 数据库依赖模块如下：

```
$ npm install --save pg pg-hstore
$ npm install --save mysql2
$ npm install --save sqlite3
$ npm install --save tedious // MSSQL

```

#### 3.连接
   实例化 Sequelize 就是建立连接， 参数分别是数据库名（数据库必须存在该数据库），用户名，密码， options。
