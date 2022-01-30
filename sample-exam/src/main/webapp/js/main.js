import router from './router.js';
import homeComp from './components/home.js';
import chatComp from './components/chat.js';

router.register('/home', homeComp);
router.register('/chat', chatComp);

if (location.hash)
	window.dispatchEvent(new Event('hashchange'));
else router.navigate('/home');
