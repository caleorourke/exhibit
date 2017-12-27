/*
 * settings.js
 *
 * Updated 2017.12.27
 * Code and documentation licensed under the MIT license
 *
 */

(function($) {
  'use strict';

  /* Page Scroll */
  $('a.page-scroll').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');

      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top - 40
        }, 1000);
        return false;
      }
    }
  });

  /* White Background on Scroll */
  $(window).bind('scroll', function() {
    var navHeight = $(window).height() - 650;

    if ($(window).scrollTop() > navHeight) {
      $('.navbar-default').addClass('on');
    } else {
      $('.navbar-default').removeClass('on');
    }
  });

  /* Scrollspy */
  $('body').scrollspy({
    target: '.navbar-default',
    offset: 80
  })

  /* Page Loader */
  $('.loader').fadeOut(); // will first fade out the loading animation
  $('.preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
  $('body').delay(350).css({
    'overflow': 'visible'
  });

  /* Wow */
  new WOW().init();

  /* Testimonial Carousel */
  $('#quotes').owlCarousel({
    navigation:       false, // Show next and prev buttons
    slideSpeed:       300,
    paginationSpeed:  400,
    singleItem:       true
  });

  /* Popup Lightbox */
  $('#lightbox').magnificPopup({
    delegate: 'a',
    type:     'image',
    gallery: {
      enabled:       true,
      removalDelay:  500,
      mainClass:    'mfp-with-zoom', // this class is for CSS animation below
    }
  });

  /* Inline Lightbox */
  $('.open-popup-link').magnificPopup({
    type:        'inline',
    midClick:     true,
    removalDelay: 500,
    mainClass:   'mfp-fade' // this class is for undoing CSS animation below

    });

  /* Skills */
  $('.skill .skill-item').each(function() {
    var progress = $(this).data('progress');

    $(this).css('width', progress + '%');
  });

  /* Isotope Filter */
  /*
  $(window).load(function() {
    var $container2 = $('#blog-masonry');
        $container2.isotope({

      itemSelector: '.blog'
    });
  });*/

  $(window).load(function() {
    var $container = $('#lightbox');
        $container.isotope({

      filter: '*',
      animationOptions: {
        duration:  750,
        easing:   'linear',
        queue:     false
      }
    });

    $('.cat a').click(function() {
      $('.cat .active').removeClass('active');
      $(this).addClass('active');
      var selector = $(this).attr('data-filter');

      $container.isotope({
        filter: selector,
        animationOptions: {
          duration:  750,
          easing:   'linear',
          queue:     false
        }
      });
      return false;
    });
  });
})(jQuery);