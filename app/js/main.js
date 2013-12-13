'use strict';

(function ($) {


  var blurSiblings = function () {
    $(this).siblings('li').children().addClass('breakdown-circle-blur');
  };
  var unblurSiblings = function () {
    $(this).siblings('li').children().removeClass('breakdown-circle-blur');
  };
  $('.breakdown-circle').parent('li').on({
    mouseenter: blurSiblings,
    mouseleave: unblurSiblings
  });

}(window.jQuery));