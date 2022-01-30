import service from '../service.js';
import store from "../store.js";
import router from "../router.js";

export default {
	getTitle: function() {
		return 'Chat';
	},
	render: function() {
		console.log('Render chat component');
		let $view = $($('#tpl-chat').html());
		let $messages = $('#messages', $view);
		let $messageText = $('#messageText', $view);
		let $postMessage = $('#postMessage', $view);
		let $homeButton = $('#homeButton', $view);

		store.setSubject(store.getSubject());
		if (store.getSubject() != null) {
			$('header').text(store.getSubject() + ' ' + this.getTitle());
		}
		getAndRenderMessages($messages);

		$postMessage.click(event => {
			event.preventDefault();
			if (!document.querySelector('form').reportValidity()) return;
			let message = { text: $messageText.val(), subject: store.getSubject() };
			service.postMessage(message)
				.then(message => {
					getAndRenderMessages($messages);
					$messageText.val('');
				})
				.catch(xhr => $('footer').text('Unexpected error (' + xhr.status + ')'));
		});

		//$('#refresh', $view).click(() => getAndRenderMessages($messages));
		let timer = setInterval(getAndRenderMessages, 1000, $messages);
		$homeButton.click(function(ev){
			clearInterval(timer);
			router.navigate('/home');
		});
		return $view;
	}
};

function getAndRenderMessages($messages) {
	console.log('asdf');
	service.getMessages(store.getSubject())
		.then(messages => {
			$messages.empty();
			for (let message of messages) {
				let $item = $('<li>').text(message.text);
				$messages.append($item);
			}
		})
		.catch(xhr => $('footer').text('Unexpected error (' + xhr.status + ')'));
}
