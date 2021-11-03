const EventEmitter = require('events'); // модуль событий - класс (излучатель событий)

class Logger extends EventEmitter {
	log(msg) {
		console.log(msg);
		this.emit('some_event', { id: 1, text: 'Event test text!' });
	}
}

module.exports = Logger;
