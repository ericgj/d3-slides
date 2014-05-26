
# d3-slides

  HTML + SVG dynamic slide decks using d3.js

## Installation

  Install with [component(1)](http://component.io):

    $ component install ericgj/d3-slides

  Make sure you also have [d3](https://github.com/mbostock/d3) available as
  a global.

## Example

  ```js
  var slides = require('d3-slides');
  var deck = slides([
    {
      layers: [
        { title:    "The first slide" },
        { subtitle: "A short demonstration of mixed html and svg slides" },
        { graphic:  "svg/test.svg#layer1" , bullet: "Stepping through graphic layers." },
        { graphic:  "svg/test.svg#layer2"},
        { graphic:  "svg/test.svg#layer3", bullet: "You can change several elements at once." },
        { graphic:  "svg/test.svg#layer4", subtitle: "What do you think?" } 
      ]
    }
  ]);

  var view = deck.view(el)
  
  // key binding
  // you can use whatever library you want, here it's yields/k

  var k = require('k')(window);
  k('right', view.next.bind(view));
  k('left',  view.prev.bind(view));

  // auto-play

  view.auto(2000);  // millisecond intervals
  view.play();      // start autoplay
  
  k('esc', view.stop.bind(view));  // cancel autoplay on esc
  ```


## License

  The MIT License (MIT)

  Copyright (c) 2014 Eric Gjertsen <ericgj72@gmail.com>

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE.
