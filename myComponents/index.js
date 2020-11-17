
//import './lib/webaudio-controls.js';
//import './lib/amplitude.js';

const getBaseURL = () => {
  const base = new URL('.', import.meta.url);
  console.log("Base = " + base);
  return `${base}`;
};

const template = document.createElement("template");
template.innerHTML = `
  <style>

  .mhn-player{
    width:500px;
    height:500px;
    padding:15px;
    position:relative;
    margin:55px auto 0;
    background:rgba(0,0,0,.9);
    box-shadow:0 16px 28px 0 rgba(0,0,0,.22),0 25px 55px 0 rgba(0,0,0,.21);
  }
  .pull-right{
    float:right
    color: red;
    background-color: #14D0FE;
    padding: 15px;
    font-size: 30px;
    text-align: right;
  }
  .mhn-player .duration{
    color: black;
    font-size:14px;
  }

  .controlpanel {
    margin: 10px;
    border: 2px solid;
    padding: 25px;
    background-image:url(http://static2.grsites.com/archive/textures/lgren/lgren020.jpg);
  
  }
  .title {
    float: left;
    padding: 0 2px;
    margin: -30px 0 0 0px;
   background-image:url(http://static2.grsites.com/archive/textures/lgren/lgren020.jpg);
}

.title-player{
    text-align: center;
    padding:  1px;
    margin: -30px 0 0 0px;
    font-weight:bold;
    background-image:url(http://static2.grsites.com/archive/textures/lgren/lgren020.jpg);
}

#progressRuler{
  
  margin: 0;
  padding: 2px 0 0 0;
  display:block;
  height:inherit;
  position:relative;
  background:color:black;
  box-shadow:0 0 5px 0 black;
  
}

#controls{
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  padding: 0 0 10px 0;
}
#buttons{
  color:black;
  flex: 50%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: space-between;
  font-weight:bold;
}


webaudio-knob {
  color:black;
  font-weight:bold;
}

div.controls:hover {
  color:blue;
  font-weight:bold;
}
div.controls label , output {
  display: inline-block;
  text-align: center;
  width: 50px;
  color:#14D0FE;
}

div.controls label, div.controls input, output {
    vertical-align: middle;
    padding: 0;
    margin: 0;
    font-family: "Open Sans",Verdana,Geneva,sans-serif,sans-serif;
    font-size: 12px;
    
}
div.controls input {
  
  box-shadow:0 0 5px 0 #14D0FE;
  
}
    
#myCanvas{
        background-color: #14D0FE;
        padding: 0;
        margin: 0;
        

  </style>

  <div class="mhn-player">
    <audio id="myPlayer" crossorigin>
      <source src="http://mainline.i3s.unice.fr/mooc/guitarRiff1.mp3" type="audio/mp3" />
    </audio>
    <div class="duration clearfix">
    <div class="title-player"><h1>Music Player<h1/></div>
      <canvas id="myCanvas" width=500 height=100></canvas>
      <div class="pull-right"><span id="play-current-time" class="play-current-time">00:00</span> / <span id="play-total-time" class="play-total-time">00:00</span></div>
    </div>
    <br>
    <div class="controlpanel">
     
    <div class="title">Control Panel</div>
    <webaudio-slider height="15" width="450" id="progressRuler" min="0" max="1" step="0.01" value="0" tracking="abs"></webaudio-slider>
    <br><br>
    <div id="controls">
    <div id=buttons>
      <webaudio-switch id="backButton" width="60" height="60" src="./assets/imgs/lightBue_LED_Button.png" type="kick" value="0">back</webaudio-switch>
      <webaudio-switch id="playpauseButton" width="60" height="60" src="./assets/imgs/lightBue_LED_Button.png" type="toggle" value="0">Play/Pause</webaudio-switch>
      <webaudio-switch id="stopButton" width="60" height="60" src="./assets/imgs/lightBue_LED_Button.png" type="toggle"  value="0">Stop</webaudio-switch>
      <webaudio-switch id="fwdButton" width="60" height="60" src="./assets/imgs/lightBue_LED_Button.png" type="kick" value="0">Foward</webaudio-switch>
        
    </div>
    
    <div>
    
    <webaudio-knob id="knobVolume" tooltip="Volume:%s" src="./assets/imgs/LittlePhatty1.png" sprites="100" value=1 min="0" max="1" step=0.01>
        Volume</webaudio-knob>
    </div>
    <div>
    <webaudio-knob id="knobStereo" tooltip="Balance:%s" src="./assets/imgs/LittlePhatty1.png" sprites="100" value=1 min="0" max="1" step=0.01>
    Balance</webaudio-knob>    
    </div>

    <div>
    <webaudio-knob id="knobGain" tooltip="Gain:%s" src="./assets/imgs/LittlePhatty1.png" sprites="100" value=1 min="0" max="1" step=0.01>
    Gain </webaudio-knob>    
    </div>
    </div>
      
    </div>

    <div id="equalizer">

    <div class="controls">
    <label>60</label>
    <input id="g60" type="range" value="0" step="1" min="-30" max="30"></input><output id="gain0">0 dB</output>
    </div>
    <div class="controls">
    <label>170</label>
    <input id="g170" type="range" value="0" step="1" min="-30" max="30"></input><output id="gain0">0 dB</output>
    </div>  
    
    <div class="controls">
    <label>350</label>
    <input id="g350" type="range" value="0" step="1" min="-30" max="30"></input><output id="gain0">0 dB</output>
    </div>  
    
    <div class="controls">
    <label>1k</label>
    <input id="g1000" type="range" value="0" step="1" min="-30" max="30"></input><output id="gain0">0 dB</output>
    </div>  
    
    <div class="controls">
    <label>3.5k</label>
    <input id="g3500" type="range" value="0" step="1" min="-30" max="30"></input><output id="gain0">0 dB</output>
    </div>  
    
    <div class="controls">
    <label>10k</label>
    <input id="g10000" type="range" value="0" step="1" min="-30" max="30"></input><output id="gain0">0 dB</output>
    </div>  
    
    </div>
    
      
    </div>
   
    </div>
    
    

        `
        ;


class MyAudioPlayer extends HTMLElement {
  constructor() {
    super();
    this.volume = 1;
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.basePath = getBaseURL(); // url absolu du composant
    // Fix relative path in WebAudio Controls elements
    this.fixRelativeImagePaths();

  }

  connectedCallback() {
    this.player = this.shadowRoot.querySelector("#myPlayer");
    this.player.loop = true;



    // get the canvas, its graphic context...
    this.canvas = this.shadowRoot.querySelector("#myCanvas");
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.canvasContext = this.canvas.getContext('2d');


    // creation du contexte webaudio
    
    let audioContext = new AudioContext();
    let mediaElement = this.shadowRoot.getElementById('myPlayer');
    mediaElement.onplay = (e) => { audioContext.resume(); }
    mediaElement.addEventListener('play', () => audioContext.resume());

    this.filters = [];

    let playerNode = audioContext.createMediaElementSource(this.player);
    this.pannerNode = audioContext.createStereoPanner();

    // Create an analyser node
    this.analyserNode = audioContext.createAnalyser();
    // set visualizer options, for lower precision change 1024 to 512,
    // 256, 128, 64 etc. bufferLength will be equal to fftSize/2
    this.analyserNode.fftSize = 1024;
    this.bufferLength = this.analyserNode.frequencyBinCount;
    this.dataArray = new Uint8Array(this.bufferLength);

    // create the equalizer. It's a set of biquad Filters
    [60, 170, 350, 1000, 3500, 10000].forEach((freq, i) => {
      var eq = audioContext.createBiquadFilter();
      eq.frequency.value = freq;
      eq.type = "peaking";
      eq.gain.value = 0;
      this.filters.push(eq);
  });

  // Connect filters in serie
  playerNode.connect(this.filters[0]);
  for (var i = 0; i < this.filters.length - 1; i++) {
      this.filters[i].connect(this.filters[i + 1]);
  }
   // connect the different nodes
   this.filters[this.filters.length - 1].connect(this.pannerNode);
   this.pannerNode.connect(this.analyserNode);
   this.analyserNode.connect(audioContext.destination);



    this.declareListeners();
    this.visualize();



  }

  changeGain(sliderVal,nbFilter) {
    var value = parseFloat(sliderVal);
    this.filters[nbFilter].gain.value = value;
    
    // update output labels
    var output = this.shadowRoot.querySelector("#gain"+nbFilter);
    output.value = value + " dB";
  }

  visualize() {

    // 1 - Effacer 
    this.canvasContext.clearRect(0, 0, this.width, this.height);

    this.canvasContext.fillStyle = 'rgba(0, 0, 0, 0.5)';
    this.analyserNode.getByteTimeDomainData(this.dataArray);
    
    // once again call the visualize function at 60 frames/s
    // 3 - draws the waveform
    this.canvasContext.lineWidth = 2;
    this.canvasContext.strokeStyle = 'black';

    // the waveform is in one single path, first let's
    // clear any previous path that could be in the buffer
    this.canvasContext.beginPath();
    var sliceWidth = this.width / this.bufferLength;
    var x = 0;

    for (var i = 0; i < this.bufferLength; i++) {
      // dataArray values are between 0 and 255,
      // normalize v, now between 0 and 1
      var v = this.dataArray[i] / 255;
      // y will be in [0, canvas height], in pixels
      var y = v * this.height;

      if (i === 0) {
        this.canvasContext.moveTo(x, y);
      } else {
        this.canvasContext.lineTo(x, y);
      }

      x += sliceWidth;
    }
    this.canvasContext.lineTo(this.width, this.height / 2);
    // draw the path at once
    this.canvasContext.stroke();
    requestAnimationFrame(() => { this.visualize() });
  }

  fixRelativeImagePaths() {
    // change webaudiocontrols relative paths for spritesheets to absolute
    let webaudioControls = this.shadowRoot.querySelectorAll(
      'webaudio-knob, webaudio-switch, webaudio-slider, button, img'
    );
    webaudioControls.forEach((e) => {
      let currentImagePath = e.getAttribute('src');
      if (currentImagePath !== undefined) {
        //console.log("Got wc src as " + e.getAttribute("src"));
        let imagePath = e.getAttribute('src');
        //e.setAttribute('src', this.basePath  + "/" + imagePath);
        e.src = this.basePath + "/" + imagePath;
        //console.log("After fix : wc src as " + e.getAttribute("src"));
      }
    });
  }



  declareListeners() {
    this.shadowRoot.querySelector("#playpauseButton").addEventListener("click", (event) => {
      this.playpause();
    });

    this.shadowRoot.querySelector("#progressRuler").addEventListener("change", (event) => {
      this.player.currentTime = event.target.value;
      this.player.play();
    });

    this.shadowRoot.querySelector("#stopButton").addEventListener("click", (event) => {
      this.stop();
    });

    this.shadowRoot.querySelector("#backButton").addEventListener("click", (event) => {
      this.skip('back');
    });

    this.shadowRoot.querySelector("#fwdButton").addEventListener("click", (event) => {
      this.skip('fwd');
    });

    this.shadowRoot.querySelector("#g60").addEventListener("input", (event) => {
      this.changeGain(event.target.value, 0);
    });
  
    this.shadowRoot.querySelector("#g170").addEventListener("input", (event) => {
      this.changeGain(event.target.value, 0);
    });

    this.shadowRoot.querySelector("#g350").addEventListener("input", (event) => {
      this.changeGain(event.target.value, 0);
    });

    this.shadowRoot.querySelector("#g1000").addEventListener("input", (event) => {
      this.changeGain(event.target.value, 0);
    });
    
    this.shadowRoot.querySelector("#g3500").addEventListener("input", (event) => {
      this.changeGain(event.target.value, 0);
    });
    
    this.shadowRoot.querySelector("#g10000").addEventListener("input", (event) => {
      this.changeGain(event.target.value, 0);
    });

    this.shadowRoot
      .querySelector("#knobVolume")
      .addEventListener("input", (event) => {
        this.setVolume(event.target.value);
      });

    this.player.addEventListener('timeupdate', (event) => {
      console.log("time = " + this.player.currentTime + " total duration = " + this.player.duration);
      let progress = this.shadowRoot.querySelector("#progressRuler");
      let currentTime = this.shadowRoot.querySelector("#play-current-time");
      currentTime.innerHTML = this.convertTime(this.player.currentTime);
      try {
        progress.max = this.player.duration;
        progress.value = this.player.currentTime;
      } catch (err) {

      }
    });


  }



  // API
  setVolume(val) {
    this.player.volume = val;
  }
  setBalance(val) {
    this.panerNode.pan.value = val;
  }
  playpause() {
    let total = this.shadowRoot.querySelector("#play-total-time");
    total.innerHTML = this.convertTime(this.player.duration);
    if (!this.player.paused) {
      this.player.pause();
    } else {
      this.player.play();
    }
  }
  setPos(pos) {
    this.player.currentTime = pos;
  }

  stop() {
    this.player.pause();
    this.player.currentTime = 0;
  }
  skip(time) {
    if (time == 'back') {
      this.player.currentTime = (this.player.currentTime - 5);
    } else if (time == 'fwd') {
      this.player.currentTime = (this.player.currentTime + 5);
    }
  }
  convertTime (secs){
    var hr,min,sec,ct;
    if(secs<60){
      sec = Math.floor(secs);
      ct = Math.floor((secs - sec) * 100);
      return sec+':'+ct;
    }
		hr  = Math.floor(secs / 3600);
		min = Math.floor((secs - (hr * 3600))/60);
		sec = Math.floor(secs - (hr * 3600) - (min * 60));

		min = min>9?min:'0'+min;
		sec = sec>9?sec:'0'+sec;
		return min+':'+sec;
	}

}

customElements.define("my-audioplayer", MyAudioPlayer);
