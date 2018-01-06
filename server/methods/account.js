import { Meteor } from 'meteor/meteor';
import { Root } from "../accounts/root";
import { Administrator } from "../accounts/administrator";
import { Moderator } from "../accounts/moderator";

Meteor.methods({

	'account': (json) => {
		switch (json['method']) {
			case 'dump':
				return Administrator.dump();
			case 'create':
				switch (json['role']) {
					case 'root':
						return Root.create(json['params']);
					default:
						return Administrator.create(json['params']);
				}
			case 'remove':
				return Administrator.create(json['params']);
			case 'update':
				return Moderator.update(json['params']);
		}
		throw new Meteor.Error(null);
	}

});
