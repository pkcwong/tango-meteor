import { Meteor } from 'meteor/meteor';

require('es6-promise').polyfill();
require('isomorphic-fetch');

Meteor.methods({

	/**
	 * Meteor method for browser functionality.
	 * @param json {method, params}
	 */
	'browser': (json) => {
		return new Promise((resolve, reject) => {
			switch (json['method']) {
				case 'get':
					fetch(json['params']['url']).then((response) => {
						response.text().then((res) => {
							resolve(res);
						}).catch((err) => {
							reject(err);
						})
					}).catch((err) => {
						reject(err);
					});
			}
		});

	}

});
