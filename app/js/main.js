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
    if(scrollPos.top > 0){
      $body.addClass(bodyScrollClass);
    }
    else{
      $body.removeClass(bodyScrollClass);
    }
  };

  /* blur siblings */
  var blurSiblings = function () {
    $(this).siblings('li').children().addClass('breakdown-circle-blur');
  };
  var unblurSiblings = function () {
    $(this).siblings('li').children().removeClass('breakdown-circle-blur');
  };



  /* scrolling event bindings */
  $(window).on('scroll', updateScrollPos);
  $(window).on('scroll', addRemoveBodyScrollClass);

  /* blur siblings - event binding */
  $('.breakdown-circle').parent('li').on({
    mouseenter: blurSiblings,
    mouseleave: unblurSiblings
  });


}(window.jQuery));