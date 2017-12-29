import { course_db } from "../database/course";

export const Course = {

	/**
	 * Dumps the entire course database.
	 */
	dump: () => {
		return course_db.find().fetch();
	},

	/**
	 * Fetches a course based on given _id.
	 * @param json {_id}
	 */
	query: (json) => {
		return course_db.findOne({
			_id: json['_id']
		});
	},

	/**
	 * Perform a search query.
	 * @param json {query, projection}
	 */
	filter: (json) => {
		return course_db.find(json['query'], json['projection']).fetch();
	},

	/**
	 * Writes a new course to database.
	 * @param json course
	 */
	put: (json) => {
		return {
			_id: course_db.insert(json)
		};
	},

	/**
	 * Updates a course based on _id.
	 * @param json course
	 */
	update: (json) => {
		let document = json;
		delete document['_id'];
		return course_db.update({
			_id: json['_id']
		}, {
			$set: document
		});
	},

	/**
	 * Deletes a course from database.
	 * @param json {_id}
	 */
	delete: (json) => {
		return course_db.remove({
			_id: json['_id']
		});
	}

};
