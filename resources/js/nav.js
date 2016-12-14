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
				// Check for CMD key, for opening a new page instead of AJAX handler
				if (!e.metaKey) {
					e.preventDefault();

					// get the actual link element
					var target = e.target;
					while (target.tagName.toLowerCase() !== 'a') {
						target = target.parentElement;
					}
					self.go(target.getAttribute('href'));
				}
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

