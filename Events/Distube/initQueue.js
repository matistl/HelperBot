module.exports = class initQueue {
	constructor(client) {
		this.client = client;
	}
	async run(queue) {
		let client = this.client;
		try {
			queue.autoplay = false;
			queue.volume = 100;
		} catch (e) {
			client.error({
				type: 'event',
				name: 'initQueue',
				error: e,
				message
			});
		}
	}
};
