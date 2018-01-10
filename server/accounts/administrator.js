import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

export const Administrator = {

	/**
	 * Dumps an entire users database.
	 */
	dump: () => {
		if (Roles.userIsInRole(Meteor.userId(), ['administrator'])) {
			return Meteor.users.find().fetch();
		}
	},

	/**
	 * Fetches a user based on given _id.
	 * @param params {_id}
	 */
	query: (params) => {
		if (Roles.userIsInRole(Meteor.userId(), ['administrator'])) {
			return Meteor.users.findOne({
				_id: params['_id']
			});
		}
	},

	/**
	 * Creates a moderator account.
	 * @param params {username, password, profile}
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
	},

	/**
	 * Sets a password forcibly for a user for a given _id.
	 * @param params {_id, password}
	 */
	setPassword: (params) => {
		if (Roles.userIsInRole(Meteor.userId()), ['administrator']) {
			if (!Roles.userIsInRole(params['_id'], ['root'])) {
				Accounts.setPassword(params['_id'], params['password']);
			}
		}
	}

};
