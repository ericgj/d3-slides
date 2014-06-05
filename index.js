'use strict';

var has = hasOwnProperty;

// interface

module.exports = function(data){

  data = layout(data);
  var instance = {};

  instance.view = function(el){
    return viewIterator(el,data);
  }

  return instance;
}

function viewIterator(el,data){

  var cursor = -1;
  var interval = 5000;
  var timer;

  var instance = {};

  instance.auto = function(ms){
    interval = ms;
    return this;
  }

  instance.next = function(){
    if (cursor >= data.length - 1) return;
    cursor++;
    view(el,data[cursor]);
    return this;
  }

  instance.prev = function(){
    if (cursor < 1) return;
    cursor--;
    view(el,data[cursor]);
    return this;
  }

  instance.first = function(){
    cursor = -1;
    return this.next();
  }

  instance.last = function(){
    cursor = data.length - 1;
    return this.next();
  }

  instance.play = function(){
    var self = this;
    var fn = function(){
      if (self.next()){
        timer = setTimeout(fn, interval);
      } else {
        self.stop();
      }
    }
    fn();
    return this;
  }

  instance.stop = function(){
    if (timer) clearTimeout(timer);
    return this;
  }

  return instance;
}


// implementation

function layout(data){
  var ret = [];
  data.forEach( function(slide){
    var cur = { titles: [], subtitles: [], bullets: [], nums: [], graphics: [] };
    slide.layers.forEach( function(layer){
      if (layer.bullet)   cur.bullets.push( layer.bullet );
      if (layer.num)      cur.nums.push( layer.num );
      if (layer.graphic)  cur.graphics.push( layer.graphic );
      if (layer.title)    cur.titles[0] = layer.title;
      if (layer.subtitle) cur.subtitles[0] = layer.subtitle;

      var obj = {};
      obj.titles = cur.titles.slice(0);
      obj.subtitles = cur.subtitles.slice(0);
      obj.bullets = cur.bullets.slice(0);
      obj.nums   = cur.nums.slice(0);
      obj.graphics = cur.graphics.slice(0);
      if (layer.highlight) obj.graphics.push(layer.highlight);
      obj.captions = layer.caption ? [layer.caption] : [];
      ret.push(obj);
    })
  })
  return ret;
}

function view(el,layer){
   
   function fetchfn(name){
     return function(d){ return (name == undefined ? d : d[name]); };
   }

   function hasAtLeastOne(data){
     return data.length > 0 ? [1] : [];
   }

   var slide = d3.select(el)
   
   var title = slide.selectAll('h1').data(layer.titles);
   var subtitle = slide.selectAll('h2').data(layer.subtitles);
   var bulletlist = slide.selectAll('ul').data( hasAtLeastOne(layer.bullets) );  
   var numlist = slide.selectAll('ol').data( hasAtLeastOne(layer.nums) );  
   var svg = slide.selectAll('svg').data( hasAtLeastOne(layer.graphics) );
   var caption = slide.selectAll('p.caption').data( layer.captions, fetchfn() );

   // enter
   title.enter().append('h1');
   subtitle.enter().append('h2');
   bulletlist.enter().append('ul');
   numlist.enter().append('ol');
   svg.enter().append('svg');
   caption.enter().insert('p','svg + *').classed('caption',true);

   // sub-elements
   var bullets = bulletlist.selectAll('li').data(layer.bullets, fetchfn());
   bullets.enter().append('li');

   var nums = numlist.selectAll('li').data(layer.nums, fetchfn());
   nums.enter().append('li');

   var svglayers = svg.selectAll('use').data(layer.graphics, fetchfn());
   svglayers.enter().append('use');


   // update
   title.text( fetchfn() );
   subtitle.text( fetchfn() );
   bullets.text( fetchfn() );
   nums.text( fetchfn() );
   svglayers.attr('xlink:href', fetchfn(), true);
   caption.text( fetchfn() );

   // exit
   caption.exit().remove();
   svglayers.exit().remove();
   svg.exit().remove();
   nums.exit().remove();
   numlist.exit().remove();
   bullets.exit().remove();
   bulletlist.exit().remove();
   subtitle.exit().remove();
   title.exit().remove();
   
}
