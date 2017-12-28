import { course_db } from "../database/course";

export const Course = {

	dump: () => {
		return course_db.find().fetch();
	},

	query: (json) => {
		return course_db.find(json['params']['query'], json['params']['projection']).fetch();
	}

};
