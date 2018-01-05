import { Accounts } from 'meteor/accounts-base';

{
	let exist = Meteor.users.find({
		username: 'admin'
	}).count();
	if (!exist) {
		Accounts.createUser({
			username: 'admin',
			password: 'root',
			profile: {
				privilege: 0
			}
		});
	}
}
