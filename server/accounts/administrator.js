import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

export const Administrator = {

	/**
	 * Dumps an entire users database.
	 */
	dump: () => {
		return Meteor.users.find().fetch();
	},

	/**
	 * Creates a moderator account.
	 * @param params {username, password, {name}}
	 */
	create: (params) => {
		if (Roles.userIsInRole(Meteor.userId(), ['administrator'])) {
			let user = Accounts.createUser({
				username: params['username'],
				password: params['password'],
				profile: params['profile']
			});
			Roles.addUsersToRoles(user, ['moderator']);
		}
	},

	/**
	 * Removes a user based on given _id.
	 * @param params {_id}
	 */
	remove: (params) => {
		if (Roles.userIsInRole(Meteor.userId(), ['administrator'])) {
			if (!Roles.userIsInRole(params['_id'], ['root'])) {
				Meteor.users.remove({
					_id: params['_id']
				});
			}
		}
	}

};
