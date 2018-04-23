const mongoose = require('mongoose');
//链接mongo 并且使用集合findjob(没有的话会自动新建) 
const DB_URL = 'mongodb://localhost:27017/findjob'
mongoose.connect(DB_URL);

//数据模型
const models = {
    user: {
        //用户名
        'user': {'type': String, 'require': true},
        //密码
        'pwd': {'type': String, 'require': true},
        //角色
        'type': {'type': String, 'require': true},
        //头像
        'avatar': {'type': String},
        //自我介绍
        'desc': {'type': String},
        //公司信息
        'company': {'type': String},
        //薪酬
        'money': {'type': String},
        //职位需求
        'title': {'type': String}
    },
    chat: {
        'from': {'type': String, 'require': true},
        'to': {'type': String, 'require': true},
        'content': {'type': String, 'require': true, 'default': ''},
        'create_time': {'type': Number, 'require': true, 'default': new Date().getTime()},
        'chatid': {'type': String, 'require': true},
        'read': {'type': Boolean, 'require': true, 'default': false}
    }
}

for(let m in models){
    mongoose.model(m, mongoose.Schema(models[m]));
}

module.exports = {
    getModel: function(name){
        return mongoose.model(name);
    }
}