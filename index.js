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

  function inLayer(layers,n){
    if (layers === undefined) return true;
    if (layers[n] === undefined) return !!(layers[layers.length-1]);
    return !!(layers[n]);
  }

  var ret = [];
  data.forEach( function(slide){
    var nlayers = d3.max(slide, function(spec){ return (spec[2] || []).length; });
    var cur = Array(nlayers);
    slide.forEach( function(spec){
      for (var i=0; i<nlayers; i++){
        var rec = cur[i] = cur[i] || { title: [], subtitle: [], bullet: [], num: [], graphic: [], caption: [] }
        if (inLayer(spec[2],i) && has.call(rec,spec[0])){
          rec[spec[0]].push( spec[1] )
        }
      }
    })
    ret.push.apply(ret, cur);
  });

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
   
   var title = slide.selectAll('h1').data(layer.title);
   var subtitle = slide.selectAll('h2').data(layer.subtitle);
   var bulletlist = slide.selectAll('ul').data( hasAtLeastOne(layer.bullet) );  
   var numlist = slide.selectAll('ol').data( hasAtLeastOne(layer.num) );  
   var svg = slide.selectAll('svg').data( hasAtLeastOne(layer.graphic) );
   var caption = slide.selectAll('p.caption').data( layer.caption, fetchfn() );

   // enter
   title.enter().append('h1');
   subtitle.enter().append('h2');
   bulletlist.enter().append('ul');
   numlist.enter().append('ol');
   svg.enter().append('svg');
   caption.enter().insert('p','svg + *').classed('caption',true);

   // sub-elements
   var bullets = bulletlist.selectAll('li').data(layer.bullet, fetchfn());
   bullets.enter().append('li');

   var nums = numlist.selectAll('li').data(layer.num, fetchfn());
   nums.enter().append('li');

   var svglayers = svg.selectAll('use').data(layer.graphic, fetchfn());
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
