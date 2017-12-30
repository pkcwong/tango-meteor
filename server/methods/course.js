import { Meteor } from 'meteor/meteor';
import { Course } from "../services/course";

Meteor.methods({

	/**
	 * Meteor method for course database manipulation.
	 * @param json {method, params}
	 */
	'course': (json) => {
		switch (json['method']) {
			case 'dump':
				return Course.dump();
			case 'query':
				return Course.query(json['params']);
			case 'filter':
				return Course.filter(json['params']);
			case 'put':
				return Course.put(json['params']);
			case 'update':
				return Course.update(json['params']);
			case 'delete':
				return Course.delete(json['params']);
		}
		throw new Meteor.Error(null);
	}

});
