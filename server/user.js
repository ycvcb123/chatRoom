const express = require('express');
const Router = express.Router();
const models = require('./model');
const User = models.getModel('user');
const Chat = models.getModel('chat');
const utils = require('utility');
const _filter = { pwd: 0, __v: 0 }

//User.remove({}, function(e, d){})
//Chat.remove({}, function(e, d){})

Router.get('/list', function (req, res) {
    //url上的参数用query获取，post中的用body获取
    const { type } = req.query;
    User.find({ type }, function (err, doc) {
        return res.json({ code: 0, data: doc })
    })
})

Router.get('/info', function (req, res) {
    const { userid } = req.cookies;
    if (!userid) {
        return res.json({ code: 1 })
    }
    User.findOne({ _id: userid }, _filter, function (err, doc) {
        if (err) {
            return res.json({ code: 1, msg: '后台存储数据报错！' })
        } else {
            return res.json({ code: 0, data: doc });
        }
    })
})

Router.post('/register', function (req, res) {
    const { user, pwd, type } = req.body;
    User.findOne({ user }, function (err, doc) {
        if (doc) {
            return res.json({ code: 1, msg: '用户名已被注册' });
        }
        const userModel = new User({ user, pwd: md5Pwd(pwd), type });
        userModel.save(function (err, doc) {
            if (err) {
                return res.json({ code: 1, msg: '存放数据库出错' })
            }
            const { user, type, _id } = doc;
            res.cookie('userid', _id);
            return res.json({ code: 0, data: { user, type, _id } });
        })
        // User.create({user, pwd: md5Pwd(pwd), type}, function(err, doc){
        //     if(err){
        //         return res.json({code: 1, msg: '存放数据库出错'})
        //     }
        //     return res.json({code: 0})
        // })
    })
})

Router.post('/login', function (req, res) {
    const { user, pwd } = req.body;
    User.findOne({ user, pwd: md5Pwd(pwd) }, _filter, function (err, doc) {
        if (!doc) {
            return res.json({ code: 1, msg: '您的账号或者密码错误，请检查后输入。' });
        } else {
            //用cookie记录登录状态
            res.cookie('userid', doc._id);
            //res.cookie('test', '1', 'maxAge', -1);
            return res.json({ code: 0, data: doc });
        }
    })
})

Router.post('/update', function (req, res) {
    const { userid } = req.cookies;
    const body = req.body;
    if (!userid) {
        return res.json({ code: 1 });
    }
    User.findByIdAndUpdate(userid, body, function (err, doc) {
        if (err) {
            return res.json({ code: 1, msg: '后台Boss更新数据出错' });
        }
        const data = Object.assign({}, {
            user: doc.user,
            type: doc.type
        }, body);
        return res.json({ code: 0, data })
    })
})

Router.get('/getMsgList', function (req, res) {
    const user = req.cookies.userid;
    User.find({}, function (err, docUser) {
        let users = {};
        docUser.forEach(v => {
            users[v._id] = {name: v.user, avatar: v.avatar}
        })
        if (!err) {
            Chat.find({ "$or": [{ from: user }, { to: user }] }, function (err, doc) {
                if (err) {
                    return res.json({ code: 1 })
                } else {
                    return res.json({ code: 0, msgs: doc, users: users })
                }
            })
        }
    })
})

function md5Pwd(pwd) {
    const salt = 'yeLoveYu!!@#%$iloveyou';
    return utils.md5(utils.md5(pwd + salt));
}

module.exports = Router;