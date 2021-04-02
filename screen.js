// required for the kill process
// var psTree = require('ps-tree');
var io = require('socket.io-client');
const quote = require('shell-quote').quote;


const socket = io("wss://bs-pager.herokuapp.com")
// const socket = io("http://localhost:3001")

let state = {
  // currentRoom: '',
  // roomStatus: ''
  // bigString: `sudo ../text-scroller -f ../../fonts/nethack16.bdf --led-chain=8  --led-rows=16 --led-cols=8 --led-multiplexing=18 --led-parallel=2 --led-slowdown-gpio=5 --led-brightness=100 --led-multiplexing=18 --led-pixel-mapper=Flipper -s.5 -C0,20,255 -t-2 lalalaalalalalalalalalalala `
  bigString: `sudo ../text-scroller -f ../../fonts/nethack16.bdf --led-chain=8  --led-rows=16 --led-cols=8 --led-multiplexing=18 --led-parallel=2 --led-slowdown-gpio=5 --led-brightness=100 --led-multiplexing=18 --led-pixel-mapper=Flipper -t-2 -s.5`
}




// var options = {shell:true};  
// streamingTask = spawn('sleep 20',args,options);

var kill = require('tree-kill');
var child_process = require('child_process');
// var spawn = require('child_process').spawn;
// var execF = 
//  child

function startMessage (message, color) {
  

  var cmdArgs = [
    '../text-scroller',
    '-f../../fonts/nethack16.bdf', 
    '--led-chain=8', 
    '--led-rows=16', 
    '--led-cols=8', 
    '--led-multiplexing=18', 
    '--led-parallel=2', 
    '--led-slowdown-gpio=5', 
    '--led-brightness=100', 
    '--led-pixel-mapper=Flipper', 
    '-s.3', 
    '-C' + color, 
    '-t-2', 
    message
  ];

  //  = spawn('seq', '', {detached: true});
  const sanitizedCmd = quote(cmdArgs);
// let cmd = state.bigString + ' -C' + state.colorRGB + ' ' + sanitizedInputText


  var exec = require('child_process').exec;
  let runner = exec(sanitizedCmd, function(error, stdout, stderr) {
     console.log('stdout: ' + stdout)
     // console.log('stderr: ' + stderr);
     if (error !== null) {
         console.log('exec error: ' + error)
     }
 })
//  runner_pid = runner.pid


//    let runner = exec(state.bigString, function(error, stdout, stderr) {
//       console.log('stdout: ' + stdout)
//       // console.log('stderr: ' + stderr);
//       if (error !== null) {
//           console.log('exec error: ' + error)
//       }
//   })
  // runner_pid = runner.pid

  setTimeout(function() {


    // doesn't work ... tried two ways in script 
    // sudo pkill text-scroller
    // and 
    // kill by pid 

  // child_process.execFile('closeme.sh', [runner.pid], function(error, stdout, stderr){
  //   console.log(stdout);
  // });



// this worked on my mac ( i think when i tried it with a dummy 'seq 1000000' or something
// but doesnt seem to work on raspberry pi with this text scroller shit
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

  
  // also try thi tree-kill package but throwing EPERM error? I think this something to do with permissions maybe
    kill(runner.pid);
  }, 7000);

}


// 

function stopMessage(runner) {
  


}


socket.on('connect', function(socketId) {
  
  console.log('connected to server')
  socket.emit('screenConnect', 'create');
  startMessage('inittt', '0,200,100')



 socket.on('startMessage', function(data) {
  // console.log('start the message')
  
  console.log(JSON.stringify(data, null, 4))

  // console.log('message: ' + message)
  // console.log('color: ' + color)

  // console.log(JSON.stringify(data))
  // console.log(data.message)
  // stopMessage()
// console.log(data.json().message)
// console.log(data.json())
  // startMessage(data.message)

  console.log(data.message)
  console.log(data.color)
// console.log(data['message'])

 })

//  socket.on('stopMessage', (data) => {
//   console.log('stop the message')
//    stopMessage()
//  })

})
