
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
  var deck = [
    [
      [ "title",    "The first slide"                                                    ],
      [ "subtitle", "A short demonstration of mixed html and svg slides", [0,1]          ],
      [ "graphic",  "svg/test.svg#layer1" ,                               [0,0,1]        ],
      [ "bullet",   "Stepping through graphic layers.",                   [0,0,1]        ],
      [ "graphic",  "svg/test.svg#layer2",                                [0,0,0,1]      ],
      [ "caption",  "And putting a caption below.",                       [0,0,0,1]      ],
      [ "graphic",  "svg/test.svg#layer3",                                [0,0,0,0,1]    ],
      [ "num",      "You can change several elements at once.",           [0,0,0,0,1]    ],
      [ "graphic",  "svg/test.svg#highlight",                             [0,0,0,0,0,1]  ],
      [ "num",      "And add highlight layers.",                          [0,0,0,0,0,1]  ],
      [ "graphic",  "svg/test.svg#layer4",                                [0,0,0,0,0,0,1]],
      [ "caption",  "Questions?",                                         [0,0,0,0,0,0,1]],
      [ "subtitle", "What do you think?",                                 [0,0,0,0,0,0,1]]
    ]
  ]

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

  The intention is to make it easy to "storyboard" a slide presentation with
  a declarative DSL.

### Storyboard matrix

  A slide deck is represented as an array of slides; each slide is represented
  as an array of slide elements; each slide element is a triplet of type, 
  value, and a _storyboard array_. For example:

  ```json
  ["bullet", "Bullet point 1",  [0,0,1] ]
  ```

  This instructs the slide renderer to display a bullet element with the given 
  text, starting at layer 3 and continuing until the end of the slide.

  By default, if no storyboard array is specified, an element appears on _all_
  layers of the slide, like this:

  ```json
  ["title", "The title is fixed"]
  ```

  You can make an element can appear and disappear like this:

  ```json
  [
    ["subtitle", "First one thing...",  [0,1,0]  ],
    ["subtitle", "...And then another", [0,0,1,0]]
  ]
  ```

  That will replace the first subtitle in layer 2 with the second subtitle in 
  layer 3. Both subtitles will disappear in layer 4+. (The last element of the
  storyboard array determines whether the element stays (1) or is removed 
  (0).)

### Elements

  Currently (v0.0.x), there are _title_, _subtitle_, _bullet_, _num_,
  _graphic_, and _caption_ elements.  These are transformed into the following 
  DOM elements:
  
  ```
  title     -->  h1
  subtitle  -->  h2
  bullet    -->  ul > li
  num       -->  ol > li
  graphic   -->  svg > use
  caption   -->  p.caption
  ```

  Caption elements, if present, always appear immediately below the graphic.
  Other elements appear in the order of the list above.

  See [Examples](https://github.com/ericgj/d3-slides/tree/master/examples) 
  for more example usage.


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
