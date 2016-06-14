(function(){
var router = new Router();

var handler = function(url) {
  url = (url === '/') ? '/home' : url;

  fetch(url).then(function(response) {
    return response.text();
  }).then(function(html) {
    document.getElementById('main').innerHTML = html;
  });
};

router.addRoute('/', handler);
router.addRoute('/:slug', handler);
router.addRoute('/shows/:slug', handler);

window.addEventListener( 'load', function() {

  // Load view on navigation events
  var nav = new Nav(function() { router.dispatch(location.pathname); });
  nav.bind(document);
  nav.observe(document.getElementById('main'));

  // load the route on load
  nav.go(location.pathname);


  // close mobile nav on click
  Array.prototype.slice.call(document.getElementsByClassName('nav-link'))
    .forEach(function(link) {
      link.addEventListener('click', function() {
        document.getElementById('nav-trigger').checked = false;
      });
    });



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
