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

    if (wrapper.classList.contains('-open')) {
      // it's open; close it
      wrapper.classList.add('-open');
    } else {
      // it's closed; open it
      wrapper.classList.remove('-open');
    }
  });

});
})(jQuery);
