(function($){
$(document).ready(function(){

  $('.responsive-nav').responsiveNav();

  $(window).scroll(function() {
    if( $(this).scrollTop() === 0 ) {
      $('.site-heading-wrapper').removeClass('corner');
    } else {
      $('.site-heading-wrapper').addClass('corner');
    }
  });



  /* Bandcamp player */
  document.getElementById('open-player-btn').addEventListener('click', function() {
    var wrapper = document.getElementById('player-wrapper');
    var klass = wrapper.getAttribute('class') || '';

    if (klass.indexOf('-open') > -1) {
      // it's open; close it
      wrapper.setAttribute('class', klass.replace('-open', ''));
    } else {
      // it's closed; open it
      wrapper.setAttribute('class', klass+' -open');
    }
  });



  /* Make the footer drift across the screen */

  // var BREAKPOINT_MOBILE = 767;

  // // BGX = background-position-x
  // var BGX_TRANSITION_SECONDS = 10000;
  // var BGX_PERCENT_INCREMENT_SMALL = 25;
  // var BGX_PERCENT_INCREMENT_LARGE = 75;

  // /**
  //  *
  //  */
  // function bgxIncrement( width ) {
  //   return (width <= BREAKPOINT_MOBILE) ?
  //     BGX_PERCENT_INCREMENT_LARGE :
  //     BGX_PERCENT_INCREMENT_SMALL;
  // }

  // function drift() {
  //   var x = parseInt(
  //     $('body > footer').css('background-position-x')
  //   );
  //   x += bgxIncrement( $(window).width() );

  //   $('body > footer').css('background-position-x', x+'%');
  //   setTimeout( drift, BGX_TRANSITION_SECONDS );
  // }

  // drift();

});
})(jQuery);
