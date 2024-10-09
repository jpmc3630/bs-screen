
const opts = {
  errorEventName:'error',
      logDirectory:'logs',
      fileNamePattern:'roll-<DATE>.log',
      dateFormat:'YYYY.MM.DD'
};

const log = require('simple-node-logger').createRollingFileLogger( opts );


var io = require('socket.io-client');
const quote = require('shell-quote').quote;

var kill = require('tree-kill');

// const socket = io("http://localhost:3001")
const socket = io("wss://bs-pager.herokuapp.com",{
  transports:["polling", "websocket"],
  // forceNew: false,
  reconnection: true,
  reconnectionDelay: 3000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: Infinity,
  transports:["polling", "websocket"]
});


let state = {
  running_pids: [],
  busy: false
}
var child_process = require('child_process');



function startScreen(message, color, colorOutline, bgColor, speed, spacing) {
  state.busy = true
  log.warn(socket.id);
  
    
    // try close all text-scrollers with script!
  child_process.execFile('closeme.sh', [], function(error, stdout, stderr){
    console.log(stdout);
  });

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
      '-s' + speed, 
      '-C' + color, 
      '-O' + colorOutline, 
      '-B' + bgColor, 
      '-t' + spacing, 
      '   ' + message // just a little spacing to make text start off screen
    ];


    var cmdArgs = [
      '../led-image-viewer',
      'trippy232.gif',
      '--led-chain=8', 
      '--led-rows=16', 
      '--led-cols=8', 
      '--led-multiplexing=18', 
      '--led-parallel=2', 
      '--led-slowdown-gpio=5', 
      '--led-brightness=100', 
      '--led-pixel-mapper=Flipper', 
      // '-s' + speed, 
      // '-C' + color, 
      // '-O' + colorOutline, 
      // '-B' + bgColor, 
      // '-t' + spacing, 
      // '   ' + message // just a little spacing to make text start off screen
    ];

    // ./led-image-viewer trippy21.gif
    // scp /Users/james/Downloads/asd.gif root@raspberrypi.local:/home/pi/code/rpi-rgb-led-matrix/utils/asd.gif

    // ./pixel-mover --led-chain=8 --led-rows=16 --led-cols=8 --led-multiplexing=18 --led-parallel=2 --led-slowdown-gpio=5 --led-brightness=100 --led-pixel-mapper=Flipper

    // sudo ./led-image-viewer cmyk.gif --led-chain=8 --led-rows=16 --led-cols=8 --led-multiplexing=18 --led-parallel=2 --led-slowdown-gpio=5 --led-brightness=100 --led-pixel-mapper=Flipper


    // cd /home/pi/code/rpi-rgb-led-matrix/utils
    // sudo ./led-image-viewer trippy232.gif --led-chain=8 --led-rows=16 --led-cols=8 --led-multiplexing=18 --led-parallel=2 --led-slowdown-gpio=5 --led-brightness=10 --led-pixel-mapper=Flipper
    
    // 1148 x 160 at 72 dpi

    const sanitizedCmd = quote(cmdArgs);
    
    var exec = require('child_process').exec
    let runner = exec(sanitizedCmd, function(error, stdout, stderr) {
      console.log('stdout: ' + stdout)
      // console.log('stderr: ' + stderr);
      if (error !== null) {
          console.log('exec error: ' + error)
      }
  })
  state.running_pids.push(runner.pid)
  // console.log(state.running_pids)
  log.warn(state.running_pids);

  state.busy = false

  }, 3000);
}



// socket.io.on("reconnect", () => {
//   console.log('reconnected')
//   // log.warn('reconnected');
// });

// socket.on("connect_error", () => {
//   // log.warn('connection error ... trying to reconnect ...');
//   console.log('connection error ... trying to reconnect....')
//   socket.connect();
// });




// startScreen('...........', '180,50,80', '70,100,160', '0,0,0', '0.3','-1')

socket.on('connect', function(socketId) {
  
  log.warn('connected to server');
  console.log('connected to server')
  socket.emit('screenConnect', 'create');
  // startScreen('init patch', '180,50,80', '70,100,160', '0,0,0', '0.3','-1')



 socket.on('startMessage', function(data) {
  // console.log(data[0])
  // console.log(data[1].join())
  // console.log(data[2].join())
  // console.log(data[3].join())

  if (state.busy == false) {
    log.info(data[0]);
    startScreen(data[0], data[1].join(), data[2].join(), data[3].join(),data[4], data[5])
  } else {
    log.info('NOT POSTED COS BUSY: ' + data[0]);
  }
 })

 socket.on('hardboot', function(data) {
    var exec = require('child_process').exec
    let runner = exec('reboot', function(error, stdout, stderr) {
      console.log('stdout: ' + stdout)
      // console.log('stderr: ' + stderr);
      if (error !== null) {
          console.log('exec error: ' + error)
      }
    })
 })

 //heartbeat response
//  socket.on('ping', function() {
//    console.log('got ping, sending pong...')
//   io.sockets.emit('pong');
//  })




})
