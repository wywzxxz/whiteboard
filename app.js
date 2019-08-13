const Koa = require('koa')
const path = require('path')
const app = new Koa()

//静态页面
const staticServer = require('koa-static');
app.use(staticServer(__dirname+ '/public'));
// 加载模板引擎
const views = require('koa-views')
app.use(views(path.join(__dirname, './view'), {
  extension: 'ejs'
}))

//路由
const route = require('koa-route');



//启动
const server = require('http').Server(app.callback());
const ioServer = require('socket.io')(server);

port=3000
server.listen(process.env.PORT || port, () => {
     console.log(`app run at : http://127.0.0.1:${port}`);
})

ioServer.on('connection', socket => {
     require('rtcmulticonnection-server').addSocket(socket);
})