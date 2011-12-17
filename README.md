# piton-pipe - Build and run an Async pipeline of functions.
An input value is given to the pipe and passed each function in turn.
This allows async operations to process the value.

## Installation

      npm install piton-pipe

## Usage

     var pipe = require('piton-pipe').createPipe(['onCreate']);
     pipe.add(function(value, callback) {
      callback(null, value + 2;
     });
     pipe.add(function(value, callback) {
      callback(null, value / 3);
     });
     var value = 7;
     pipe.run(value, function(error, newValue) {
       console.log(newValue);
     });

## Credits
* [Paul Serby](https://github.com/PabloSerbo/)

## Licence
Licenced under the [New BSD License](http://opensource.org/licenses/bsd-license.php)
