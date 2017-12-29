import { Meteor } from 'meteor/meteor';
import { Course } from "../services/course";

Meteor.methods({

	/**
	 * Meteor method for course database manipulation.
	 * @param json {method, params}
	 */
	'course': (json) => {
		return new Promise((resolve, reject) => {
			switch (json['method']) {
				case 'dump':
					resolve(Course.dump());
					break;
				case 'query':
					resolve(Course.query(json['params']));
					break;
				case 'filter':
					resolve(Course.filter(json['params']));
					break;
				case 'put':
					resolve(Course.put(json['params']));
					break;
				case 'update':
					resolve(Course.update(json['params']));
					break;
				case 'delete':
					resolve(Course.delete(json['params']));
					break;
				default:
					reject(Meteor.Error);
			}
		});
	}

});
