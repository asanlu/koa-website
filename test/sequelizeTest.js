const Sequelize = require('sequelize');
const config = require('./src/config/db');
const Op = Sequelize.Op;
const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,   // 数据库地址
  dialect: 'mysql',    // 指定连接的数据库类型
  operatorsAliases: Op, // use Sequelize.Op or false to compatibility
  pool: {
    max: 5,            // 连接池中最大连接数量
    min: 0,            // 连接池中最小连接数量
    idle: 10000        // 如果一个线程 10 秒钟内没有被使用过的话，那么就释放线程
  }
});

// 测试连接
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Sequelize映射数据库表
const Pet = sequelize.define('pet', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  name: Sequelize.STRING,
}, {
    // 关闭Sequelize的自动添加timestamp: defalut:false
    timestamps: false,
    // 如果为 true 则表的名称和 model 相同，即 user
    // 为 false MySQL创建的表名称会是复数 users
    // 如果指定的表名称本就是复数形式则不变
    freezeTableName: false
  });

// 往数据添加数据
(async () => {
  let dog = await Pet.create({
    id: `g-${Date.now()}`,
    name: 'gaffey'
  });
  console.log('created.' + JSON.stringify(dog))
})();

// 查询数据
(async () => {
  var pets = await Pet.findAll({
    where: {
      name: 'Gaffey'
    }
  });
  console.log(`find ${pets.length} pets:`);
  for (let p of pets) {
    console.log(JSON.stringify(p));
  }
})();

// 保存更新数据
(async () => {
  var p = await queryFromSomewhere();
  p.gender = true;
  p.updatedAt = Date.now();
  p.version++;
  await p.save();
})();

// 删除数据
(async () => {
  var p = await queryFromSomewhere();
  await p.destroy();
})();