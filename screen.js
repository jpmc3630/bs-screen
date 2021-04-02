// required for the kill process
// create a rolling file logger based on date/time that fires process events
const opts = {
  errorEventName:'error',
      logDirectory:'/logs', // NOTE: folder must exist and be writable...
      fileNamePattern:'roll-<DATE>.log',
      dateFormat:'YYYY.MM.DD'
};

const log = require('simple-node-logger').createRollingFileLogger( opts );


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


function startScreen(message, color, colorOutline, bgColor) {
  console.log(socket.id)
  state.running_pids.forEach(element => {
    kill(element)
    
  });

  if (state.running_pids.length > 0) {
    state.running_pids.pop()
  }

  // pkill -9 text-scroller
  setTimeout(() => {
    
  

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
    '-B' + bgColor, 
    '-t-1', 
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
 console.log(state.running_pids)

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
  }, 2000);
}


// 
socket.io.on("reconnect", () => {
  console.log('reconnected')
  log.warn('reconnected');
});

socket.on("connect_error", () => {
  log.warn('connection error ... trying to reconnect ...');
  console.log('connection error ... trying to reconnect....')
  socket.connect();
});

socket.on('connect', function(socketId) {
  
  log.warn('connected to server');
  console.log('connected to server')
  socket.emit('screenConnect', 'create');
  startScreen('inittt', '200,50,100', '70,100,180')



 socket.on('startMessage', function(data) {
  log.info(data[0]);
  console.log(data[0])
  console.log(data[1].join())
  console.log(data[2].join())
  console.log(data[3].join())

  startScreen(data[0], data[1].join(), data[2].join(), data[3].join())

 })



})
