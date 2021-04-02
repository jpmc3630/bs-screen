// required for the kill process
var psTree = require('ps-tree');
var io = require('socket.io-client');

const socket = io("wss://bs-pager.herokuapp.com")
// const socket = io("http://localhost:3001")

let state = {
  // currentRoom: '',
  // roomStatus: ''
  bigString: `sudo ../text-scroller -f ../../fonts/nethack16.bdf --led-chain=8  --led-rows=16 --led-cols=8 --led-multiplexing=18 --led-parallel=2 --led-slowdown-gpio=5 --led-brightness=100 --led-multiplexing=18 --led-pixel-mapper=Flipper -s.5 -C0,20,255 -t-2 lalalaalalalalalalalalalala `
}




// running process
const { spawn } = require('child_process');
var sh = spawn('../text-scroller -f ../../fonts/nethack16.bdf --led-chain=8  --led-rows=16 --led-cols=8 --led-multiplexing=18 --led-parallel=2 --led-slowdown-gpio=5 --led-brightness=100 --led-multiplexing=18 --led-pixel-mapper=Flipper -s.5 -C0,20,255 -t-2 lalalaalalalalalalalalalala');

sh.stdout.on('data', function(data) {
  console.log('stdout' + data);
});

function startMessage (message) {
  
  // sh.stdin.write();

}


// 

function stopMessage() {
  
  sh.stdin.write('\x03');

}



socket.on('connect', function(socketId) {
  
  console.log('connected to server')
  socket.emit('screenConnect', 'create');
  startMessage('inittt')



 socket.on('startMessage', (data) => {
  console.log('start the message')
  console.log(JSON.stringify(data))
  stopMessage()
  startMessage(data.message)
 })

//  socket.on('stopMessage', (data) => {
//   console.log('stop the message')
//    stopMessage()
//  })

})