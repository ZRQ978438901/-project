import io from 'socket.io-client'
const socket = io('ws://localhost:4000')
socket.on('SeverToB',function (data) {
})
socket.emit('BTS',{name:'abc'})


