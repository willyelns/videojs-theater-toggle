import videojs from 'video.js';

const Plugin = videojs.getPlugin('plugin');

class TheaterToggle extends Plugin {

  constructor(player, options) {
    super(player, options);

    this.on(player,'timeupdate', this.isTheater);

   	//Adding or removing when is fullscreen
    player.on('fullscreenchange', (event) => {
	    if (player.isFullscreen()) {
	    	videojs.log("is Fullscreen");
	      document.getElementsByClassName("vjs-theater-container-button")[0].classList.add("vjs-hidden");
	    } else {
	    	videojs.log("isn't Fullscreen");
	      document.getElementsByClassName("vjs-theater-container-button")[0].classList.remove("vjs-hidden");
	    }
  	});

	let buttonElement = document.createElement("button");
	buttonElement.className = "vjs-theater-container-button";

	//let iconElement = document.createElement("img");
	let iconElement = document.createElement("span");
	//iconElement.src = options.icon || defaults.icon;
	iconElement.textContent = "Theater";

	buttonElement.appendChild(iconElement);
	//containerElement.appendChild(buttonElement);

	player.controlBar.el().insertBefore(buttonElement, player.controlBar.fullscreenToggle.el());
	player.controlBar.addChild(buttonElement);
  	player.addClass('vjs-theater-toggle');

  	document.getElementsByClassName("vjs-theater-container-button")[0].onclick = function(){
  		console.log("Clicked");
		if(this.classList.contains("theater-toggled")){
			this.getElementsByTagName("span")[0].textContent = "Theater";
			this.classList.remove("theater-toggled");
		}else{
			//this.getElementsByTagName("span")[0].textContent = "Theatered";
			this.classList.add("theater-toggled");
		}
	}
  }

  isTheater(){
  	return document.getElementsByClassName("vjs-theater-container-button")[0].classList.contains("theater-toggled");
  }

}

videojs.registerPlugin('theaterToggle', TheaterToggle);


/* --------------------- TESTING  ----------------*/

const player = videojs('videojs-theater-toggle-player');

//player.theatertoggle();

// This will begin playback, which will trigger a "playing" event, which will
// update the state of the plugin, which will cause a message to be logged.
player.play();

// This will pause playback, which will trigger a "paused" event, which will
// update the state of the plugin, which will cause a message to be logged.
player.pause();

//player.theatertoggle().isTheater();
player.on("pause", function(){
	console.log("Is Theatered? " + player.theaterToggle().isTheater());
});

// This will begin playback, but the plugin has been disposed, so it will not
// log any messages.
player.play();