import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

export const Moderator = {

	/**
	 * Updates a user profile.
	 * @param params {profile}
	 */
	update: (params) => {
		if (Accounts.userIsInRole(Meteor.userId(), ['moderator'])) {
			Meteor.users.update(Meteor.userId(), {
				$set: params['profile']
			});
		}
	}

};
