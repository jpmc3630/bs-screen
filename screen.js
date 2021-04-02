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

// var options = {shell:true};  
// streamingTask = spawn('sleep 20',args,options);

var kill  = require('tree-kill');
const spawn = require('child_process').spawn;

var scriptArgs = ['runtext.sh'];
var child = spawn('sh', scriptArgs);

// some code to identify when you want to kill the process. Could be
// a button on the client-side??
// button.on('someEvent', function(){
//     // where the killing happens
    
// });

function startMessage (message) {
  

  

  //  = spawn('seq', '', {detached: true});
  var child=spawn('sudo ../text-scroller', ['10000000000']);


//    let runner = exec(state.bigString, function(error, stdout, stderr) {
//       console.log('stdout: ' + stdout)
//       // console.log('stderr: ' + stderr);
//       if (error !== null) {
//           console.log('exec error: ' + error)
//       }
//   })
  // runner_pid = runner.pid

  setTimeout(function() {

  // child_process.execFile('closeme.sh', [child.pid], function(error, stdout, stderr){
  //   console.log(stdout);
  // });
  kill(child.pid);
  // sudo pkill text-scroller

  }, 7000);
}


// 

function stopMessage(runner) {
  
    // // killing process
  //   var kill = function (pid, signal, callback) {
  //     signal   = signal || 'SIGKILL';
  //     callback = callback || function () {}
  //     var killTree = true;
  //     if(killTree) {
  //         psTree(pid, function (err, children) {
  //             [pid].concat(
  //                 children.map(function (p) {
  //                     return p.PID;
  //                 })
  //             ).forEach(function (tpid) {
  //                 try { process.kill(tpid, signal) }
  //                 catch (ex) { }
  //             });
  //             callback();
  //         });
  //     } else {
  //         try { process.kill(pid, signal) }
  //         catch (ex) { }
  //         callback()
  //     }
  // };
  // console.log(runner.pid)
  // kill(runner.pid);

}



socket.on('connect', function(socketId) {
  
  console.log('connected to server')
  socket.emit('screenConnect', 'create');
  startMessage('inittt')



 socket.on('startMessage', (data) => {
  console.log('start the message')
  console.log(JSON.stringify(data))
  // stopMessage()
  startMessage(data.message)
 })

//  socket.on('stopMessage', (data) => {
//   console.log('stop the message')
//    stopMessage()
//  })

})