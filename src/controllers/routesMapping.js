const fs = require('fs');

/**
 * 路由注册
 * @param {*} router 
 * @param {*} mapping  所有文件列表
 */
function addMapping(router, mapping) {
  for (let url in mapping) {
    let delimiter = url.indexOf(' ');
    method = url.slice(0, delimiter);
    path = url.slice(delimiter + 1);
    if (method === 'GET') {
      router.get(path, mapping[url]);
    } else if (method === 'POST') {
      router.post(path, mapping[url]);
    } else if (method === 'PUT') {
      router.put(path, mapping[url]);
    } else if (method === 'DELETE') {
      router.del(path, mapping[url]);
    } else {
      console.log(`invalid URL: ${url}`);
      continue;
    }
    console.log(`register URL mapping: ${method} ${path}`);
  }
}

function addControllers(router) {
  // 同步读取文件数出来
  const files = fs.readdirSync(`${process.cwd()}/src/routes`);
  const js_files = files.filter((f) => {
    return f.endsWith('.js');
  });

  for (let f of js_files) {
    console.log(`process controller: ${f}...`);
    // 导入js文件，取出路由配置
    let mapping = require(`${process.cwd()}/src/routes/${f}`);
    addMapping(router, mapping);
  }
}


// function addMapping(router, mapping) {
//   for (var url in mapping) {
//     if (url.startsWith('GET ')) {
//       var path = url.substring(4);
//       router.get(path, mapping[url]);
//       console.log(`register URL mapping: GET ${path}`);
//     } else if (url.startsWith('POST ')) {
//       var path = url.substring(5);
//       router.post(path, mapping[url]);
//       console.log(`register URL mapping: POST ${path}`);
//     } else {
//       console.log(`invalid URL: ${url}`);
//     }
//   }
// }

module.exports = function (dir) {
  // console.log('router.js' + process.cwd());
  let controllers_dir = dir || 'routes', // 如果不传参数，扫描目录默认为'controllers'
    router = require('koa-router')();
  addControllers(router, controllers_dir);
  return router.routes();
};