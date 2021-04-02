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

var runner_pid



function startMessage (message) {
  


var exec = require('child_process').exec;
   let runner = exec(state.bigString, function(error, stdout, stderr) {
      console.log('stdout: ' + stdout)
      // console.log('stderr: ' + stderr);
      if (error !== null) {
          console.log('exec error: ' + error)
      }
  })
  runner_pid = runner.pid
}


// 

function stopMessage() {
  
  // // killing process
  var kill = function (pid, signal, callback) {
      signal   = signal || 'SIGKILL';
      callback = callback || function () {}
      var killTree = true;
      if(killTree) {
          psTree(pid, function (err, children) {
              [pid].concat(
                  children.map(function (p) {
                      return p.PID;
                  })
              ).forEach(function (tpid) {
                  try { process.kill(tpid, signal) }
                  catch (ex) { }
              });
              callback();
          });
      } else {
          try { process.kill(pid, signal) }
          catch (ex) { }
          callback()
      }
  };
  console.log(runner_pid)
  kill(runner_pid);

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