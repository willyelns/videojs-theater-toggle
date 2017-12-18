# videojs-theater-toggle

A plugin to enable Theater Mode in VideoJS 6.4+

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Installation

- [Installation](#installation)
- [Usage](#usage)
  - [`<script>` Tag](#script-tag)
  - [Browserify/CommonJS](#browserifycommonjs)
  - [RequireJS/AMD](#requirejsamd)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->
## Installation

```sh
npm install --save videojs-theater-toggle
```

[![NPM](https://nodei.co/npm/videojs-theater-toggle.png?compact=true)](https://npmjs.org/package/videojs-theater-toggle)


## Usage

To include videojs-theater-toggle on your website or web application, use any of the following methods.

### `<script>` Tag

This is the simplest case. Get the script in whatever way you prefer and include the plugin _after_ you include [video.js][videojs], so that the `videojs` global is available.

```html
<script src="//path/to/video.min.js"></script>
<link rel="stylesheet" href="//path/to/videojs-theater-toggle.css">
<script src="//path/to/videojs-theater-toggle.min.js"></script>
<script>
  var player = videojs('my-video');

  player.theaterToggle();

  player.on("theaterMode",function(){
    if(player.theaterToggle().isTheater()){
      //The 'Theater' is enabled
    }else {
      //The 'Theater' is disabled
    }
  });
</script>
```

### Browserify/CommonJS

When using with Browserify, install videojs-theater-toggle via npm and `require` the plugin as you would any other module.

```js
var videojs = require('video.js');

// The actual plugin function is exported by this module, but it is also
// attached to the `Player.prototype`; so, there is no need to assign it
// to a variable.
require('videojs-theater-toggle');

var player = videojs('my-video');

player.theaterToggle();

player.on("theaterMode",function(){
  if(player.theaterToggle().isTheater()){
    //The 'Theater' is enabled
  }else {
    //The 'Theater' is disabled
  }
});

```

### RequireJS/AMD

When using with RequireJS (or another AMD library), get the script in whatever way you prefer and `require` the plugin as you normally would:

```js
require(['video.js', 'videojs-theater-toggle'], function(videojs) {
  var player = videojs('my-video');

  player.theaterToggle();

  player.on("theaterMode",function(){
    if(player.theaterToggle().isTheater()){
      //The 'Theater' is enabled
    }else {
      //The 'Theater' is disabled
    }
  });

});
```

## License

MIT. Copyright (c) Will Xavier &lt;willyelnsg.x@gmail.com&gt;


[videojs]: http://videojs.com/
