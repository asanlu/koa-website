// scan all models defined in models:
const fs = require('fs');
const db = require('./db');

let fileSrc = `${process.cwd()}/src/models`;
let files = fs.readdirSync(fileSrc);

let js_files = files.filter((file) => {
  return file.endsWith('.js');
}, files);

module.exports = {};

for (let file of js_files) {
  console.log(`import model from file ${file}...`);
  let name = file.substring(0, file.length - 3);
  module.exports[name] = require(`${fileSrc}/${file}`);
}

// Sequelize的sync()方法，可以自动创建数据表(测试库时可用)
module.exports.sync = () => {
  db.sync();
};