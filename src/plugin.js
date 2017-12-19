/* globals document localStorage */
import videojs from 'video.js';

const Plugin = videojs.getPlugin('plugin');
const buttonName = 'vjs-theater-container-button';

const config = {
  saveTheaterState: true,
  localItemName: 'theaterVideoState'
};

/** Class represents the TheaterToggle Plugin*/
class TheaterToggle extends Plugin {

  /**
   * Create the plugin
   * @param {Player} player - a player to active the plugin
   * @param {JSON} options -  list of options to setting the plugin
   */
  constructor(player, options) {
    super(player, options);

    if (typeof (options) === 'undefined') {
      options = config;
    } else {
      options.saveTheaterState = typeof (options.saveTheaterState) === 'undefined' ? config.saveTheaterState : options.saveTheaterState;
      options.localItemName = typeof (options.localItemName) === 'undefined' ? config.localItemName : options.localItemName;
    }
    this.on(player, 'timeupdate', this.isTheater);

    const buttonElement = document.createElement('button');

    buttonElement.className = buttonName;

    if (options.saveTheaterState) {
      if (typeof (Storage) !== 'undefined') {
        if (localStorage.getItem(options.localItemName) !== null) {
          const storage = localStorage.getItem(options.localItemName);

          if (storage === 'enabled') {
            buttonElement.classList.add('theater-toggled');
          }
        }
      } else {
        videojs.log('Sorry! No Web Storage support...');
      }
    } else {
      const localStore = localStorage.getItem(options.localItemName);

      if (localStore !== null) {
        localStorage.removeItem(options.localItemName);
      }
    }

    player.on('ready', () => {
      player.trigger('theaterMode', this.theaterMode);
    });

    // Adding or removing when is fullscreen
    player.on('fullscreenchange', (event) => {
      const buttonEl = document.getElementsByClassName(buttonName)[0];

      if (player.isFullscreen()) {
        buttonEl.classList.add('vjs-hidden');
      } else {
        buttonEl.classList.remove('vjs-hidden');
      }
    });

    const iconElement = document.createElement('span');

    iconElement.textContent = 'Theater';
    buttonElement.appendChild(iconElement);

    player.controlBar.el().insertBefore(
      buttonElement, player.controlBar.fullscreenToggle.el()
    );
    player.controlBar.addChild(buttonElement);
    player.addClass('vjs-theater-toggle');

    document.getElementsByClassName(buttonName)[0].onclick = function() {
      if (this.classList.contains('theater-toggled')) {
        this.classList.remove('theater-toggled');
        localStorage.setItem(options.localItemName, 'disabled');
      } else {
        this.classList.add('theater-toggled');
        localStorage.setItem(options.localItemName, 'enabled');
      }
      player.trigger('theaterMode', this.theaterMode);
    };
  }

  /** Triggered by click on button
   * @return {boolean} - isTheater() response
   */
  theaterMode() {
    return this.isTheater();
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
