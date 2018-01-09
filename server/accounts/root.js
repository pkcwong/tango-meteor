import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

export const Root = {

	/**
	 * Creates an administrator account.
	 * @param params {username, password, profile}
	 */
	create: (params) => {
		if (Roles.userIsInRole(Meteor.userId(), ['root'])) {
			let user = Accounts.createUser({
				username: params['username'],
				password: params['password'],
				profile: params['profile']
			});
			Roles.addUsersToRoles(user, ['admin']);
		}
	}

};

/**
 * Vulnerable.
 * Generates a default root account.
 * Developing purposes only.
 */
{
	let exist = Meteor.users.find({
		username: 'root'
	}).count();
	if (exist) {
		Meteor.users.remove({
			username: 'root'
		});
	}
	let user = Accounts.createUser({
		username: 'root',
		password: 'root',
		profile: {
			name: 'Super User'
		}
	});
	Roles.addUsersToRoles(user, ['root', 'administrator', 'moderator']);
}
