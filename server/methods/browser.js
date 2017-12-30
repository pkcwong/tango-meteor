import { Meteor } from 'meteor/meteor';
import { Browser } from "../services/browser";

require('es6-promise').polyfill();
require('isomorphic-fetch');

Meteor.methods({

	/**
	 * Meteor method for browser functionality.
	 * @param json {method, params}
	 */
	'browser': (json) => {
		switch (json['method']) {
			case 'get':
				return Browser.get(json['params']);
		}
		throw new Meteor.Error(null);
	}

});
