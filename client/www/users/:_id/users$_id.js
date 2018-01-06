Router.route('/users/:_id', function() {
	this.render('users$_id', {
		data: {
			_id: this.params['_id']
		}
	});
});
