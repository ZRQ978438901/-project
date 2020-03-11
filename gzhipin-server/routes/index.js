var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/*
* 1.获取请求参数
* 2.处理
* 3.返回响应
* */
// router.post('/register',function (req,res) {
//   const {username,password}=req.body
//   if(username==='admin') {
//     res.send({code:1,msg:"该用户已注册"})
//   }
//   else{
//     console.log(123)
//     res.send({code:0,data:{id:"abc1234",username,password}})
//   }
// })


const ChatModel=require('../db/models').ChatModel
//加密
const md5=require('blueimp-md5')
const userModel=require('../db/models').UserModel

/*
获取当前用户所有相关聊天信息列表
 */
router.get('/msglist', function (req, res) {
  // 获取cookie中的userid
  const userid = req.cookies.userid
  // 查询得到所有user文档数组
  userModel.find(function (err, userDocs) {
    // 用对象存储所有user信息: key为user的_id, val为name和header组成的user对象
    const users = {} // 对象容器
    userDocs.forEach(doc => {
      users[doc._id] = {username: doc.username, header: doc.header}
    })

    // const users = userDocs.reduce((users, user) => {
    //   users[user._id] = {username: user.username, header: user.header}
    //   return users
    // } , {})
    /*
    查询userid相关的所有聊天信息
     参数1: 查询条件
     参数2: 过滤条件
     参数3: 回调函数
    */
    ChatModel.find({'$or': [{from: userid}, {to: userid}]}, filter, function (err, chatMsgs) {
      // 返回包含所有用户和当前用户相关的所有聊天消息的数据

      res.send({code: 0, data: {users, chatMsgs}})
    })
  })
})


//修改指定消息为已读

router.post('/readmsg', function (req, res) {
  // 得到请求中的from和to
  const from = req.body.from
  const to = req.cookies.userid
  /*
  更新数据库中的chat数据
  参数1: 查询条件
  参数2: 更新为指定的数据对象
  参数3: 是否1次更新多条, 默认只更新一条
  参数4: 更新完成的回调函数
   */
  ChatModel.update({from, to, read: false}, {read: true}, {multi: true}, function (err, doc) {
    console.log('/readmsg', doc)
    res.send({code: 0, data: doc.nModified}) // 更新的数量
  })
})



//注册路由
router.post('/register',function (req,res) {
  const {username,password,type}=req.body
  //查询
  userModel.findOne({username},function (error,user) {
    if(user) {
      res.send({code:1,msg:'此用户已注册'})
    }
    else{
      const userObject={username:username,type:type,password:md5(password)}
      const usermodel= new userModel(userObject)
      usermodel.save(function (error,user) {
        //设置cookie
        res.cookie('userid',user._id,{maxAge:1000*60*24*7})

        const data={username,_id: user._id,type,password:md5(password)}
        res.send({code:0,data})
      })
    }
  })

})

//登录路由
const filter={password:0,_v:0}//指定过滤属性
router.post('/login',function (req,res) {
  const {username,password}=req.body
  userModel.findOne({username,password:md5(password)},filter,function (error,user) {
    if(user){
      //设置cookie
      res.cookie('userid',user._id,{maxAge:1000*60*24*7})
      res.send({code:0,data:user})
    }else {
      res.send({code:1,data:'用户名或密码错误！'})
    }
  })
})

//更新用户信息
router.post('/update',function (req,res) {
    //从请求的cookie中获得userid
    const userid = req.cookies.userid
    if(!userid){
      res.send({code:1,data:'请先登录'})
      return
    }
  const user=req.body
  userModel.findByIdAndUpdate({_id: userid}, user, function (error, oldUser) {
    if(!oldUser) {
      // 通知浏览器删除userid cookie
      res.clearCookie('userid')
      // 返回返回一个提示信息
      res.send({code: 1, msg: '请先登陆'})
    } else {
      // 准备一个返回的user数据对象
      const {_id, username, type} = oldUser
      const data = Object.assign({_id, username, type}, user)
      // 返回
      res.send({code: 0, data})
    }
  })
})

//根据cookie实现自动登陆
router.get('/user',function (req,res) {
  const userid=req.cookies.userid
  if(!userid){
    return {code:1,msg:'请先登录'}
  }
  else {
    userModel.findOne({_id:userid},filter,function (error,user) {
      res.send({code:0,data:user})
    })
  }
})

//根据用户类型获取用户列表
router.get('/userlist',function (req,res) {
  const {type}=req.query
  userModel.find({type},filter,function (error,users) {
    res.send({code:0,data:users})
  })
})
module.exports = router;
