'use strict';

(function ($) {

  // START scrolling functions
  var scrollPos = [];
  var $body = $('body');
  var $portfolio = $('#portfolio');

  // utility function to update scroll variable
  var updateScrollPos = function () {
    var $window = $(window);
    scrollPos.top = $window.scrollTop();
    scrollPos.left = $window.scrollLeft();
  };
  // add and remove body scrolling class
  var addRemoveBodyScrollClass = function () {
    var bodyScrollClass = 'scrolled';
    if(scrollPos.top > 85){
      $body.addClass(bodyScrollClass);
    }
    else{
      $body.removeClass(bodyScrollClass);
    }
  };
  // show and hide portfolio arrows
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
  };
  // time delay logo shrink
  // var initLoad = function () {
  //   $('#logo').removeClass('hover');
  // }
  // var initLoadTimer = setTimeout(initLoad, 2000)

  // END scrolling functions


  // START skill circle functions
  var $breakdownCircles = $('#intro-breakdown').find('dl');
  var setSquare = function (el, val) {
    el.css({
      'width': val,
      'height': val,
      'marginTop': -val/2
    });
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
  var blurSiblings = function () {
    $(this).siblings('dl').children('dt').addClass('breakdown-circle-blur');
  };
  var unblurSiblings = function () {
    $(this).siblings('dl').children('dt').removeClass('breakdown-circle-blur');
  };
  // position elements
  $breakdownCircles.each(function(){
    var $dl = $(this);
    var breakdownCirclesDimension = $(this).children('dd').last().text();

    setSquare($dl, breakdownCirclesDimension);
    positionElements($dl, $dl.prevAll('dl'), -10);
  });
  // END skill circle functions

  // START portfolio functions
  var enableDisablePortfolioNav = function () {
    if(portfolioSwipe.getPos() == 0){
      $('#portfolio-prev').addClass('portfolio-nav-disable');
    }
    else{
      $('#portfolio-prev').removeClass('portfolio-nav-disable');
    }
    if(portfolioSwipe.getPos() == portfolioSwipe.getNumSlides() - 1){
      $('#portfolio-next').addClass('portfolio-nav-disable');
    }
    else{
      $('#portfolio-next').removeClass('portfolio-nav-disable');
    }
  };
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
  // END portfolio functions

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

  // blur siblings - event binding
  $breakdownCircles.on({
    mouseenter: blurSiblings,
    mouseleave: unblurSiblings
    //mousedown: showDescription
  });

  // portfolio - event bindings
  $('.portfolio-nav').on('click', portfolioSwipeNav);


}(window.jQuery));