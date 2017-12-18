import videojs from 'video.js';

const Plugin = videojs.getPlugin('plugin');
const buttonName = "vjs-theater-container-button";

class TheaterToggle extends Plugin {

  constructor(player, options) {
    super(player, options);
    this.on(player,'timeupdate', this.isTheater);

   	//Adding or removing when is fullscreen
    player.on('fullscreenchange', (event) => {
	    if (player.isFullscreen()) {
	      document.getElementsByClassName(buttonName)[0].classList.add("vjs-hidden");
	    } else {
	      document.getElementsByClassName(buttonName)[0].classList.remove("vjs-hidden");
	    }
  	});

	let buttonElement = document.createElement("button");
	buttonElement.className = buttonName;

	let iconElement = document.createElement("span");
	iconElement.textContent = "Theater";
	buttonElement.appendChild(iconElement);

	player.controlBar.el().insertBefore(buttonElement, player.controlBar.fullscreenToggle.el());
	player.controlBar.addChild(buttonElement);
  	player.addClass('vjs-theater-toggle');

  	document.getElementsByClassName(buttonName)[0].onclick = function(){
  		player.trigger('theaterMode', this.theaterMode);
		if(this.classList.contains("theater-toggled")){
			this.classList.remove("theater-toggled");
		}else{
			this.classList.add("theater-toggled");
		}
	}
  }

  isTheater(){
  	return document.getElementsByClassName(buttonName)[0].classList.contains("theater-toggled");
  }

}

videojs.registerPlugin('theaterToggle', TheaterToggle);