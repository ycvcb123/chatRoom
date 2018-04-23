const express = require('express');
const app = express();
//接受post请求参数
const bodyParser = require('body-parser');
//可以解析cookie
const cookieParser = require('cookie-parser');
const Router = require('./user');

//加入socket.io
const server = require('http').Server(app);
const io = require('socket.io')(server);

//模型实例
const Model = require('./model.js');
const Chat = Model.getModel('chat');

//io为全局，socket为当前对话
io.on('connection', function(socket){
	socket.on('sendMsg', function(data){
        let { from, to, content } = data;
        let chatid = [from, to].sort().join('_');
        Chat.create({chatid, from, to, content}, function(err, doc){
            io.emit('recvmsg', doc);
        })
    })
})

app.use(cookieParser());
//解析post过来的json数据
app.use(bodyParser.json());

app.use('/user', Router);
// app.listen(9093, function(){
//     console.log('server listen in 9093');
// })
server.listen(9093, function(){
    console.log('server listen in 9093');
})

