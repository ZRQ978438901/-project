const {ChatModel}=require('../db/models')

module.exports = function (server) {
  const io=require('socket.io')(server)
  //监视所有客户端
  io.on('connection',function (socket) {

    socket.on('BToServer',function ({from,to,content}) {


      //给链接的socket绑定一个id
      // socket.id=from
      //处理数据，保存在数据库
      //准备数据对象
      const chat_id=[from,to].sort().join('_')
      const creat_time=Date.now()
      new ChatModel({from,to,content,chat_id,creat_time}).save(function (error,charMsg) {
        //向客户端发送数据
        io.emit('SeverToB',  charMsg)
        //  io.sockets.socket(to).emit('SeverToB', charMsg)
       // io.sockets[from].emit('SeverToB',  {name:'123'})
      })
    })
  })
}