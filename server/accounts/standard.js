import { Accounts } from 'meteor/accounts-base';

Accounts.onCreateUser((user) => {
	let exist = Meteor.users.find({
		username: user['username']
	}).count();
	if (!exist) {
		Accounts.createUser({
			username: user['username'],
			password: user['password'],
			profile: {
				privilege: 1
			}
		});
	}
});
