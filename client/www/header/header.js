import { Template } from 'meteor/templating';

Template.header.onCreated(function() {

});

Template.header.onRendered(function() {
	$('#id_header_dropdown_login').hover(
		() => {
			$('#id_header_menu_login').stop().fadeIn(500);
		},
		() => {
			$('#id_header_menu_login').delay(100).stop().fadeOut(200);
		}
	);
});

Template.header.events({});

Template.header.helpers({});
