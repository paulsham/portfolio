'use strict';

(function ($) {

  /* scrolling */
  var scrollPos = [];
  var $body = $('body');
  var $portfolio = $('#portfolio');

  var updateScrollPos = function () {
    var $window = $(window);
    scrollPos.top = $window.scrollTop();
    scrollPos.left = $window.scrollLeft();
  };
  var addRemoveBodyScrollClass = function () {
    var bodyScrollClass = 'scrolled';
    if(scrollPos.top > 85){
      $body.addClass(bodyScrollClass);
    }
    else{
      $body.removeClass(bodyScrollClass);
    }
  };
  var showHidePortfolioArrows = function () {
    var portfolioPos = [];
    portfolioPos.top = $portfolio.offset().top;
    portfolioPos.bottom = portfolioPos.top + $portfolio.innerHeight();
    portfolioPos.offset = $(window).height() / 3;

    if(scrollPos.top > portfolioPos.top - portfolioPos.offset && scrollPos.top < portfolioPos.bottom - portfolioPos.offset * 2){
      $body.addClass('section-portfolio');
    }
    else{
      $body.removeClass('section-portfolio');
    }
  }

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

  $('a[href^="#"]').smoothScroll({
    offset: -45
  });
  $('#logo').children('a').smoothScroll({
    offset: -125
  });

  /* scrolling event bindings */
  $(window).on('scroll', updateScrollPos);
  $(window).on('scroll', addRemoveBodyScrollClass);
  $(window).on('scroll', showHidePortfolioArrows);
  $(window).trigger('scroll');

  window.portfolioSwipe = Swipe(document.getElementById('portfolio-slider'),{
    callback: function(index, elem) {enableDisablePortfolioNav();
    }
  });
  var scrollToPortfolio = function () {
    $.smoothScroll({
      scrollTarget: '#portfolio'
    });
  };
  var portfolioSwipeNav = function () {
    if($(this).hasClass('portfolio-nav-disable')){
      return false;
    }
    if(this.id == 'portfolio-prev'){
      portfolioSwipe.prev();
      scrollToPortfolio();
    }
    else if(this.id == 'portfolio-next'){
      portfolioSwipe.next();
      scrollToPortfolio();
    }
  };
  var enableDisablePortfolioNav = function () {
    if(portfolioSwipe.getPos() == 0){
      $('#portfolio-prev').addClass('portfolio-nav-disable');
    }
    else{
      $('#portfolio-prev').removeClass('portfolio-nav-disable');
    }
    /* getNumPos not working, fork and include? */
    if(portfolioSwipe.getPos() == portfolioSwipe.getNumSlides() - 1){
      $('#portfolio-next').addClass('portfolio-nav-disable');
    }
    else{
      $('#portfolio-next').removeClass('portfolio-nav-disable');
    }
  }
  $('.portfolio-nav').on('click', portfolioSwipeNav);


}(window.jQuery));