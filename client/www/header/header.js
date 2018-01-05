import { Template } from 'meteor/templating';

Template.header.onCreated(function() {

});

Template.header.onRendered(function() {
	$("#id_modal_login").modal();
	$("#id_header_dropdown_login").hover(
		() => {
			if (Meteor.user()) {
				$("#id_header_menu_login").stop().fadeIn(500);
			}
		},
		() => {
			if (Meteor.user()) {
				$("#id_header_menu_login").delay(100).stop().fadeOut(200);
			}
		}
	);
	$("#id_header_button_login").click(() => {
		Meteor.loginWithPassword($("#id_header_input_email").val(), $("#id_header_input_password").val(), (err) => {
			console.error(err);
		});
	});
});

Template.header.events({

	'click #id_header_item_home': () => {
		window.location = '/';
	},

	'click #id_header_item_courses': () => {
		window.location = '/courses';
	},

	'click #id_header_icon_login': () => {
		$("#id_header_modal_login").modal('show');
	},

	'click #id_header_button_logout': () => {
		Meteor.logout();
		window.location = '/';
	}

});

Template.header.helpers({});
