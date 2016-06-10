/*! FangChia.com
* Copyright (c) 2016 Coby Tamayo; Licensed  */
(function(){
window.addEventListener( 'load', function() {

  /* Banner logo */

  // Push the FANG CHIA logo up into the corner when the user scrolls down
  window.addEventListener( 'scroll', function() {
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    if( scrollTop === 0 ) {
      document.getElementsByClassName('site-heading-wrapper')[0].classList.remove('corner');
    } else {
      document.getElementsByClassName('site-heading-wrapper')[0].classList.add('corner');
    }
  });

  // Corner the logo if the page loaded partially scrolled
  if ((document.documentElement.scrollTop || document.body.scrollTop) > 0) {
    document.getElementsByClassName('site-heading-wrapper')[0].classList.add('corner');
  }



  /* Bandcamp player */

  // toggle open/close on click
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

  // bounce the player button on first visit
  if (!window.localStorage.repeatVisit) {
    var btnWrapper = document.getElementById('open-player-btn-wrapper');

    // bouncy-bounce
    btnWrapper.classList.add('bouncy');
    window.localStorage.repeatVisit = true;
  }

});
})();
