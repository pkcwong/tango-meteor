import { course_db } from "../database/course";

export const Course = {

	dump: () => {
		return course_db.find().fetch();
	},

	query: (json) => {
		return course_db.find(json['query'], json['projection']).fetch();
	},

	put: (json) => {
		return {
			_id: course_db.insert(json)
		};
	},

	update: (json) => {
		let document = json;
		delete document['_id'];
		return course_db.update({
			_id: json['_id']
		}, {
			$set: document
		});
	},

	delete: (json) => {
		return course_db.remove({
			_id: json['_id']
		});
	}

};
