/* globals document */
import videojs from 'video.js';

const Plugin = videojs.getPlugin('plugin');
const buttonName = 'vjs-theater-container-button';

/** Class represents the TheaterToggle Plugin*/
class TheaterToggle extends Plugin {

  /**
  * Create the plugin
  * @param {Player} player - a player to active the plugin
  * @param {JSON} options -  list of options to setting the plugin
  */
  constructor(player, options) {
    super(player, options);
    this.on(player, 'timeupdate', this.isTheater);
    // Adding or removing when is fullscreen
    player.on('fullscreenchange', (event) => {
      const buttonEl = document.getElementsByClassName(buttonName)[0];

      if (player.isFullscreen()) {
        buttonEl.classList.add('vjs-hidden');
      } else {
        buttonEl.classList.remove('vjs-hidden');
      }
    });

    const buttonElement = document.createElement('button');

    buttonElement.className = buttonName;
    const iconElement = document.createElement('span');

    iconElement.textContent = 'Theater';
    buttonElement.appendChild(iconElement);

    player.controlBar.el().insertBefore(
      buttonElement, player.controlBar.fullscreenToggle.el()
    );
    player.controlBar.addChild(buttonElement);
    player.addClass('vjs-theater-toggle');

    document.getElementsByClassName(buttonName)[0].onclick = function() {
      player.trigger('theaterMode', this.theaterMode);
      if (this.classList.contains('theater-toggled')) {
        this.classList.remove('theater-toggled');
      } else {
        this.classList.add('theater-toggled');
      }
    };
  }

  /** Check if the Toggle is active
  * @return {boolean} - the response
  */
  isTheater() {
    const buttonDiv = document.getElementsByClassName(buttonName)[0];

    return buttonDiv.classList.contains('theater-toggled');
  }

}

videojs.registerPlugin('theaterToggle', TheaterToggle);

export default TheaterToggle;
