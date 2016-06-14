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

