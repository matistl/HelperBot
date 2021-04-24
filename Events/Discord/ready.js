module.exports = class Ready {
  constructor(client) {
    this.client = client;
  }
  async run() {
    let client = this.client;
    try {
      console.log(`✔️ | ${client.user.tag} esta listo!`);
      client.user.setPresence({
        activity: { name: "invite me ✨ | h!help" },
        status: "idle",
      });
    } catch (e) {
      this.client.error({
        type: "event",
        error: e,
        name: "ready",
      });
    }
  }
};