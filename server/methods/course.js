import { Course } from "../services/course";

Meteor.methods({

	'course': (json) => {
		return new Promise((resolve, reject) => {
			switch (json['method']) {
				case 'dump':
					resolve(Course.dump());
					break;
				case 'query':
					resolve(Course.query(json['params']));
					break;
				default:
					reject(Meteor.Error)
			}
		});
	}

});
