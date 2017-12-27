Router.route('/api', function() {
	this.response.end(JSON.stringify(this.request.body));
}, {
	where: 'server',
	action: function() {
		this.response.writeHead(200, {
			'Content-Type': 'application/json'
		});
	}
});
