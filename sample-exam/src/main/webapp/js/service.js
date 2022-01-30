import store from './store.js';

const BASE_URI = '/api';

export default {
	getMessages: function(subject) {
		let settings = {
			type: 'GET',
			dataType: 'json'
		};
		if (subject != null) {
			settings.url = BASE_URI + '/messages?subject=' + subject;
		} else {
			settings.url = BASE_URI + '/messages';
		}
		console.log('Sending ' + settings.type + ' request to ' + settings.url);
		return $.ajax(settings);
	},
	getSubjects: function() {
		let settings = {
			url: BASE_URI + '/subjects',
			type: 'GET',
			dataType: 'json'
		};
		console.log('Sending ' + settings.type + ' request to ' + settings.url);
		return $.ajax(settings);
	},
	postMessage: function(message) {
		let settings = {
			url: BASE_URI + '/messages?subject=' + store.getSubject(),
			type: 'POST',
			dataType: 'json',
			contentType: 'application/json',
			data: JSON.stringify(message)
		};
		console.log('Sending ' + settings.type + ' request to ' + settings.url);
		return $.ajax(settings);
	}
};
