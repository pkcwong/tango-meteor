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
	Accounts.createUser({
		username: 'admin',
		password: 'root',
		profile: {
			privilege: 0
		}
	});
}
