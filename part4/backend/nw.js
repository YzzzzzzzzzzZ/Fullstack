let Service = require('node-windows').Service;
 
let svc = new Service({
  name: 'node_test',    //服务名称
  description: '测试项目服务器', //描述
  script: './index.js' //nodejs项目要启动的文件路径
});
 
svc.on('install', () => {
  svc.start();
});
 
svc.install();