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
				if (Roles.userIsInRole(Meteor.userId(), ['moderator'])) {
					return Course.put(json['params']);
				}
				break;
			case 'update':
				if (Roles.userIsInRole(Meteor.userId(), ['moderator'])) {
					return Course.update(json['params']);
				}
				break;
			case 'delete':
				if (Roles.userIsInRole(Meteor.userId(), ['moderator'])) {
					return Course.delete(json['params']);
				}
				break;
		}
		throw new Meteor.Error(null);
	}

});
