// required for the kill process
// var psTree = require('ps-tree');
var io = require('socket.io-client');
const quote = require('shell-quote').quote;

var kill = require('tree-kill');

const socket = io("wss://bs-pager.herokuapp.com")
// const socket = io("http://localhost:3001")

let state = {
  // currentRoom: '',
  // roomStatus: ''
  // bigString: `sudo ../text-scroller -f ../../fonts/nethack16.bdf --led-chain=8  --led-rows=16 --led-cols=8 --led-multiplexing=18 --led-parallel=2 --led-slowdown-gpio=5 --led-brightness=100 --led-multiplexing=18 --led-pixel-mapper=Flipper -s.5 -C0,20,255 -t-2 lalalaalalalalalalalalalala `
  // bigString: `sudo ../text-scroller -f ../../fonts/nethack16.bdf --led-chain=8  --led-rows=16 --led-cols=8 --led-multiplexing=18 --led-parallel=2 --led-slowdown-gpio=5 --led-brightness=100 --led-multiplexing=18 --led-pixel-mapper=Flipper -t-2 -s.5`
  running_pids: []

}




// var options = {shell:true};  
// streamingTask = spawn('sleep 20',args,options);

// var child_process = require('child_process');


function startScreen(message, color, colorOutline) {
  
  state.running_pids.forEach(element => {
    kill(element)
  });

  // pkill -9 text-scroller

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
    '-O' + colorOutline, 
    '-t-2', 
    message
  ];

  //  = spawn('seq', '', {detached: true});
  const sanitizedCmd = quote(cmdArgs);
// let cmd = state.bigString + ' -C' + state.colorRGB + ' ' + sanitizedInputText


  
  var exec = require('child_process').exec
  let runner = exec(sanitizedCmd, function(error, stdout, stderr) {
     console.log('stdout: ' + stdout)
     // console.log('stderr: ' + stderr);
     if (error !== null) {
         console.log('exec error: ' + error)
     }
 })
 state.running_pids.push(runner.pid)


//    let runner = exec(state.bigString, function(error, stdout, stderr) {
//       console.log('stdout: ' + stdout)
//       // console.log('stderr: ' + stderr);
//       if (error !== null) {
//           console.log('exec error: ' + error)
//       }
//   })
  // runner_pid = runner.pid

  // setTimeout(function() {


  //         // child_process.execFile('closeme.sh', [runner.pid], function(error, stdout, stderr){
  //         //   console.log(stdout);
  //         // });


  //   kill(runner.pid);
  // }, 7000);

}


// 


socket.on('connect', function(socketId) {
  
  console.log('connected to server')
  socket.emit('screenConnect', 'create');
  startScreen('inittt', '200,50,100', '70,100,180')



 socket.on('startMessage', function(data) {
  
  console.log(data[0])
  console.log(data[1].join())
  console.log(data[2].join())

  startScreen(data[0], data[1].join(), data[2].join())

 })



})
