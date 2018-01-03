import { Template } from 'meteor/templating';

Template.header.onCreated(function() {

});

Template.header.onRendered(function() {
	$('#id_modal_login').modal();
	$("#id_header_dropdown_login").hover(
		() => {
			$("#id_header_menu_login").stop().fadeIn(500);
		},
		() => {
			$("#id_header_menu_login").delay(100).stop().fadeOut(200);
		}
	);
});

Template.header.events({

	'click #id_header_dropdown_login': () => {
		$("#id_header_modal_login").modal('show');
	}

});

Template.header.helpers({});
