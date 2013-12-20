'use strict';

(function ($) {

  /* scrolling */
  var scrollPos = []
  var updateScrollPos = function () {
    var $window = $(window);
    scrollPos.top = $window.scrollTop();
    scrollPos.left = $window.scrollLeft();
  };
  var addRemoveBodyScrollClass = function () {
    var $body = $('body');
    var bodyScrollClass = 'scrolled';
    if(scrollPos.top > 85){
      $body.addClass(bodyScrollClass);
    }
    else{
      $body.removeClass(bodyScrollClass);
    }
  };

  /* time delay logo shrink */
  // var initLoad = function () {
  //   $('#logo').removeClass('hover');
  // }
  // var initLoadTimer = setTimeout(initLoad, 2000)

  var setSquare = function (el, val) {
    var widthInPixels = parseInt(val);
    el.css({
      'width': val,
      'height': val,
      'marginTop': -val/2
    })
  };
  var positionElements = function (el, prevEl, offset) {
    var prevWidth = 0;

    prevEl.each(function () {
      prevWidth = prevWidth + $(this).width() + offset;
    });
    el.css({
      left: prevWidth
    })
    .parent().css({
      width: prevWidth+el.width()
    });
  };
  // var showDescription = function () {
  //   var description = $(this).nextUntil('dt').first().text();
  //   var descriptionPos = parseInt($(this).parent('dl').css('left'));
  //   //$(this).closest('div').next('div').children('p')
  //   $('#breakdown-circle-description')
  //   .css({
  //       'left': descriptionPos,
  //       'width': $(this).width()
  //   }).text(description)
  //   .parent('div').addClass('show-description');
  // }

  /* blur siblings */
  var blurSiblings = function () {
    $(this).siblings('dl').children('dt').addClass('breakdown-circle-blur');
  };
  var unblurSiblings = function () {
    $(this).siblings('dl').children('dt').removeClass('breakdown-circle-blur');
  };

  var $breakdownCircles = $('#intro-breakdown').find('dl');
  /* position elements */
  $breakdownCircles.each(function(){
    var $dl = $(this);
    var breakdownCirclesDimension = $(this).children('dd').last().text();

    setSquare($dl, breakdownCirclesDimension);
    positionElements($dl, $dl.prevAll('dl'), -10);
  });
  /* blur siblings - event binding */
  $breakdownCircles.on({
    mouseenter: blurSiblings,
    mouseleave: unblurSiblings
    //mousedown: showDescription
  });

  $('#logo').children('a').smoothScroll({
    offset: -125
  })
  $('#main-nav').find('a').smoothScroll({
    offset: -45
  });

  /* scrolling event bindings */
  $(window).on('scroll', updateScrollPos);
  $(window).on('scroll', addRemoveBodyScrollClass);

}(window.jQuery));