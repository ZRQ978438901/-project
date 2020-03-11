module.exports = function (server) {
  const io=require('socket.io')(server)
  //监视所有客户端
  io.on('connection',function (socket) {
    socket.on('BTS',function (data) {
      console.log(data)
      socket.emit('SeverToB',{name:'123456'})
    })
  })
}


