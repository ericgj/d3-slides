
# d3-slides

  HTML + SVG dynamic slide decks using d3.js

  Transform a declarative model of slide layers and transitions
  into actual slide (DOM) elements, with methods for stepping
  forward and back, and auto-playing.

 
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

  // attach to DOM at container el (or selector)
  
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

## The slide model

  It is not intended to be a general purpose tool for building slide decks, but
  for a particular kind of slide deck and to fit within a particular toolchain.

  For example, a typical slide layout might look like this, statically:

    Title
    Subtitle
    * Bullet point 1
    * Bullet point 2
    Graphic

  But you don't want the entire slide to appear at once, you want to walk
  through the elements. Perhaps you want to bring in the title and subtitle
  first, then bullet points, then the graphic. Or perhaps you want to bring
  in successive layers of the graphic together with the bullet points.

  Slides are modelled as a set of _layers_ of elements, some of which _change_
  as the slides progress, and others of which _overlay_.

  Currently (v0.0.x), there are _title_, _subtitle_, _bullet_, and _graphic_
  elements.  These are transformed into `h1`, `h2`, `ul > li`, and `svg >
  use` DOM elements.  Title and subtitle _change_, while bullet and graphic
  elements _overlay_.

  See [Examples](https://github.com/ericgj/d3-slides/tree/master/examples) 
  for usage.

## Notes

  - Changes the DOM in-place rather than preloading all slides or loading
    static pages. 
  
  - Note SVG must be served via http, so slides that use layers from local SVG 
    files require that you run a local http (static file) server.
 

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
