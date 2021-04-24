module.exports = class error {
	constructor(client) {
		this.client = client;
	}
	async run(message, err) {
		let client = this.client;

		try {
			
			client.error({
				type: 'event',
				name: 'error',
				error: err,
				message
			});
			
		} catch (e) {
			client.error({
				type: 'event',
				name: 'error',
				error: e,
				message
			});
		}
	}
};
