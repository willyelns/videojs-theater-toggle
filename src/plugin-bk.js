import videojs from 'video.js';
import {version as VERSION} from '../package.json';

// Default options for the plugin.
const defaults = {
  icon: "https://mooc.imd.ufrn.br/assets/img/Index_image_logo.png",
  title: "Theater Button",
  className: 'theater-mode'
  //destination: "http://www.google.com",
  //destinationTarget: "_blank"

};

// Cross-compatibility for Video.js 5 and 6.
const registerPlugin = videojs.registerPlugin || videojs.plugin;
// const dom = videojs.dom || videojs;

function handleClick() {
	console.log("FOI");
    let theaterModeIsOn = document.getElementById(this.options_.elementToToggle).classList.toggle(this.options_.className);
    this.player().trigger('theaterSwitch', { 'theaterSwitchIsOn': theaterSwitchIsOn });

    if (theaterModeIsOn) {
      this.el_.classList.remove('vjs-theater-mode-control-open');
      this.el_.classList.add('vjs-theater-mode-control-close');
    } else {
      this.el_.classList.remove('vjs-theater-mode-control-close');
      this.el_.classList.add('vjs-theater-mode-control-open');
    }
  }

/**
 * Function to invoke when the player is ready.
 *
 * This is a great place for your plugin to initialize itself. When this
 * function is called, the player will have its DOM and child components
 * in place.
 *
 * @function onPlayerReady
 * @param    {Player} player
 *           A Video.js player object.
 *
 * @param    {Object} [options={}]
 *           A plain object containing options for the plugin.
 */
const onPlayerReady = (player, options) => {

	let containerElement = document.createElement("div");
	containerElement.className = "vjs-theater-container";

	let buttonElement = document.createElement("button");
	buttonElement.className = "vjs-theater-container-button";
	//buttonElement.setAttribute("href", options.destination || defaults.destination);
	buttonElement.setAttribute("title", options.title || defaults.title);
	//buttonElement.setAttribute("target", options.destinationTarget || defaults.destinationTarget)

	let iconElement = document.createElement("img");
	iconElement.src = options.icon || defaults.icon;

	buttonElement.appendChild(iconElement);
	containerElement.appendChild(buttonElement);

	player.controlBar.el().insertBefore(containerElement, player.controlBar.fullscreenToggle.el());
  player.addClass('vjs-theater-switch');
};

/**
 * A video.js plugin.
 *
 * In the plugin function, the value of `this` is a video.js `Player`
 * instance. You cannot rely on the player being in a "ready" state here,
 * depending on how the plugin is invoked. This may or may not be important
 * to you; if not, remove the wait for "ready"!
 *
 * @function theaterSwitch
 * @param    {Object} [options={}]
 *           An object of options left to the plugin author to define.
 */
const theaterSwitch = function(options) {
  this.ready(() => {
    onPlayerReady(this, videojs.mergeOptions(defaults, options));
  });
};

// Register the plugin with video.js.
registerPlugin('theaterSwitch', theaterSwitch);

// Include the version number.
theaterSwitch.VERSION = VERSION;

export default theaterSwitch;
