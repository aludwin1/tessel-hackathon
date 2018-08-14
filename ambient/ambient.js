//after mkdir ambient; cd ambient; t2 init
//npm install ambient-attx4 

var tessel = require('tessel');
var ambientlib = require('ambient-attx4');

var ambient = ambientlib.use(tessel.port['A']);

ambient.on('ready', function () {
 // Get points of light and sound data.
  setInterval( function () {
    ambient.getLightLevel( function(err, lightdata) {
      if (err) throw err;
      ambient.getSoundLevel( function(err, sounddata) {
        if (err) throw err;
        console.log("Light level:", lightdata.toFixed(8), " ", "Sound Level:", sounddata.toFixed(8));
      });
    });
  }, 500); // The readings will happen every .5 seconds

//light trigger:
//ambient.setLightTrigger(0.5);


//the sound trigger:
ambient.setSoundTrigger(0.1); //from 0.1 to 1
console.log('Waiting for a bright light or a sound...');

  
});

ambient.on('error', function (err) {
  console.log(err);
  ambient.on('sound-trigger', function(data) {
    console.log("Something happened with sound: ", data);

    // Clear it
    ambient.clearSoundTrigger();

    //After 1.5 seconds reset sound trigger
    setTimeout(function () {

        ambient.setSoundTrigger(0.1);

    },1500);

  });
});

//run t2 run ambient.js

//the triggers

