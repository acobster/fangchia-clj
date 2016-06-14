/*! FangChia.com
* Copyright (c) 2016 Coby Tamayo; Licensed  */
// Let's build a router!
function Router() {
	this.routes = [];
	this.matchedRoutes = [];
}

Router.prototype.addRoute = function(pattern, handler, regexp) {
	regexp = regexp || '[-\\w]+';

	this.routes.push({
		pattern: pattern,
		handler: handler,
		regexp: new RegExp(regexp, 'gi'),
	});
};

Router.prototype.match = function(url) {
	if (!this.matchedRoutes[url]) {
		var self = this;
		this.routes.forEach(function(route) {
			// get a super-simple, word-based regex based on routing pattern
			var routeRegExp = new RegExp('^'+route.pattern.replace(/:\w+/g, route.regexp.source)+'$');

			// match the thing
			if (routeRegExp.test(url)) {
				self.matchedRoutes[url] = {
					url: url,
					pattern: route.pattern,
					params: self.getMatchedParams(url, route.pattern, route.regexp),
					handler: route.handler,
				};
			}
		});
	}

	return this.matchedRoutes[url];
};

Router.prototype.getMatchedParams =  function(url, pattern, regexp) {
	var segments = pattern.match(/:\w+/g);
	var matches = url.match(regexp);

	var params = {};
	if (segments) {
		for (var i=0; i<segments.length; i++) {
			var name = segments[i].slice(1);
			params[name] = matches[i];
		}
	}

	return params;
};

Router.prototype.dispatch = function(url) {
	var matchedRoute = this.match(url);
	if (matchedRoute) {
		matchedRoute.handler.call(null, url, matchedRoute.params);
	}
};


function Nav(dispatch) {
	window.addEventListener('navigate', dispatch);
	window.addEventListener('popstate', dispatch);
}

Nav.prototype.bind = function(node) {
	var self = this;

	var links = Array.prototype.slice.call(node.getElementsByTagName('a'));
	var linkHandler = function(link) {
		// override relative link/click events to relative URLs
		if (link.getAttribute('href')[0] === '/') {
			link.addEventListener('click', function(e) {
				e.preventDefault();

				// get the actual link element
				var target = e.target;
				while (target.tagName.toLowerCase() !== 'a') {
					target = target.parentElement;
				}
				self.go(target.getAttribute('href'));
			});
		}
	};

	links.forEach(linkHandler);
};

Nav.prototype.observe = function(node) {
	var self = this;

	var config = { attributes: true, childList: true, characterData: true };
	var observer = new MutationObserver(function(mutation) {
		self.bind(mutation[0].target);
	});

	observer.observe(node, config);
};

Nav.prototype.go = function(route) {
	var event = new CustomEvent('navigate', {
		url: route
	});

	if (history.pushState) {
		history.pushState({}, '', route);
	}

	window.dispatchEvent(event);
};


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
