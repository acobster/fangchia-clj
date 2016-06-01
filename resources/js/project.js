(function(){
window.addEventListener( 'load', function() {

  jQuery('.responsive-nav').responsiveNav();

  window.addEventListener( 'scroll', function() {
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    if( scrollTop === 0 ) {
      document.getElementsByClassName('site-heading-wrapper')[0].classList.remove('corner');
    } else {
      document.getElementsByClassName('site-heading-wrapper')[0].classList.add('corner');
    }
  });



  /* Bandcamp player */

  document.getElementById('open-player-btn').addEventListener('click', function() {
    var wrapper = document.getElementById('player-wrapper');

    if (wrapper.classList.contains('open')) {
      // it's open; close it
      wrapper.classList.remove('open');
    } else {
      // it's closed; open it
      wrapper.classList.add('open');
    }
  });

  if (!window.localStorage.repeatVisit) {
    var btnWrapper = document.getElementById('open-player-btn-wrapper');
    btnWrapper.classList.add('bouncy');
    window.localStorage.repeatVisit = true;
  }

});
})();
