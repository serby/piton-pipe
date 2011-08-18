# piton-pipe - Build and run an Async pipeline of functions.
Input is given then passed though the functions in the pipe via callbacks.
This allows async operations to process the value.

## Installation

      npm install piton-pipe

## Usage

     var pipe = require('piton-pipe').createPipe(['onCreate']);
     pipe.add('onCreate', function(value, callback) {
      callback(null, value + 2;
     });
     pipe.add('onCreate', function(value, callback) {
      callback(null, value / 3);
     });
     var value = 7;
     pipe.run(value, 'onCreate', function(error, newValue) {
       console.log(newValue);
     });

## Credits
* [Paul Serby](https://github.com/PabloSerbo/)

## Licence
Licenced under the [New BSD License](http://opensource.org/licenses/bsd-license.php)
