import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

{
	let exist = Meteor.users.find({
		username: 'admin'
	}).count();
	if (exist) {
		Meteor.users.remove({
			username: 'admin'
		});
	}
	let admin = Accounts.createUser({
		username: 'admin',
		password: 'root',
		profile: {
			name: 'Administrator'
		}
	});
	Roles.addUsersToRoles(admin, ['administrator'], Roles.GLOBAL_GROUP);
}
