const Discord = require("discord.js");
const fetch = require("node-fetch");
const atob = require("atob");
const gtranslate = require("@vitalets/google-translate-api");

const ActiveGuilds = new Array(); 

class Game {//Creamos la class
    constructor(message, args) {
      this.guild = message.guild.id;
      this.message = message; 
      this.args = args;
      this.player = this.player.id;
      this.reactions = ["🇦", "🇧", "🇨", "🇩"];
      this.question;
      this.init();
    }
    async init() {
      ActiveGuilds.push(this.guild); //Ahora borrarla si es que se acaba el juego / termina, qsy
      if (!this.args.length) this.get_data();
      if (this.args[0] && !this.args[1]) this.get_data(this.args[0]);
      if (this.args[0] && this.args[1])
        this.get_data(this.args[0], this.args[1]);
    }
    async get_data(dif, cat) {
      if (!dif && !cat) {
        let question;
        await fetch("https://opentdb.com/api.php?amount=1&encode=base64")
          .then((response) => response.json())
          .then((data) => (question = data));
        this.question = question;
        return this.show_question();
      }
      if (dif && !cat) {
        let question;
        if (dif.toLowerCase() == "any") return this.get_data();
        if (
          dif.toLowerCase() != "easy" &&
          dif.toLowerCase() != "medium" &&
          dif.toLowerCase() != "hard"
        )
          return this.message.reply(
            `〔 ${client.emotes.error} 〕**Ingresa un dificultad válida.** \`easy\`, \`medium\`, \`hard\`, \`any\`,`
          );
        await fetch(
            "https://opentdb.com/api.php?amount=1&category=23&difficulty=" +
            dif.toLowerCase() +
            "&encode=base64"
        )
          .then((response) => response.json())
          .then((data) => (question = data));
        this.question = question;
        return this.show_question();
      }
      if (dif && cat) {
        let question;
        for (let i in id_list) {
          if (
            id_list[i].name
              .toLowerCase()
              .replace(" ", "")
              .replace(" ", "")
              .replace(" ", "")
              .replace(" ", "") == cat.toLowerCase()
          ) {
            this.question_id = id_list[i].id;
          }
        }
        if (
          dif.toLowerCase() != "easy" &&
          dif.toLowerCase() != "medium" &&
          dif.toLowerCase() != "hard" &&
          dif.toLowerCase() != "any" 
        )
          return this.message.reply(
            `〔 ${client.emotes.error} 〕**Ingresa un dificultad válida.** \`easy\`, \`medium\`, \`hard\`, \`any\``
          );
        if (!this.question_id) //SHEEEEEEESH VA A MANDAR TAREA, PERAME 2 MIN OKI
          return this.message.reply(
            `〔 ${client.emotes.error} 〕**Ocurrió un error inesperado.**`
          );
        if (dif.toLowerCase() == "any") {
          await fetch(
            "https://opentdb.com/api.php?amount=1&category=23&encode=base64"
          )
            .then((response) => response.json())
            .then((data) => (question = data));
          this.question = question;
          return this.show_question();
        }
        await fetch(
          "https://opentdb.com/api.php?amount=1&category=23&difficulty=" +
            dif.toLowerCase() +
            "&encode=base64"
        )
          .then((response) => response.json())
          .then((data) => (question = data));
        this.question = question;
        return this.show_question();
      }
    }
    async show_question() {
      if (atob(this.question.results[0].type) == "multiple") {
        this.question_length = 3;
        this.correct_answer = Math.floor(Math.random() * 4 + 1);
        if (this.correct_answer == 1) {
          this.answer_array = [
            "`A.` " + await Transale(atob(this.question.results[0].correct_answer)),
            "`B.` " + await Transale(atob(this.question.results[0].incorrect_answers[0])),
            "`C.` " + await Transale(atob(this.question.results[0].incorrect_answers[1])),
            "`D.` " + await Transale(atob(this.question.results[0].incorrect_answers[2])),
          ];
        }
        if (this.correct_answer == 2) {
          this.answer_array = [
            "`A.` " + await Transale(atob(this.question.results[0].incorrect_answers[0])),
            "`B.` " + await Transale(atob(this.question.results[0].correct_answer)),
            "`C.` " + await Transale(atob(this.question.results[0].incorrect_answers[1])),
            "`D.` " + await Transale(atob(this.question.results[0].incorrect_answers[2])),
          ];
        }
        if (this.correct_answer == 3) {
          this.answer_array = [
            "`A.` " + await Transale(atob(this.question.results[0].incorrect_answers[0])),
            "`B.` " + await Transale(atob(this.question.results[0].incorrect_answers[1])),
            "`C.` " + await Transale(atob(this.question.results[0].correct_answer)),
            "`D.` " + await Transale(atob(this.question.results[0].incorrect_answers[2])),
          ];
        }
        if (this.correct_answer == 4) {
          this.answer_array = [
            "`A.` " + await Transale(atob(this.question.results[0].incorrect_answers[0])),
            "`B.` " + await Transale(atob(this.question.results[0].incorrect_answers[1])),
            "`C.` " + await Transale(atob(this.question.results[0].incorrect_answers[2])),
            "`D.` " + await Transale(atob(this.question.results[0].correct_answer)),
          ];
        }
        const TransLateReadyUwU = await Transale(atob(this.question.results[0].question), { from: "en", to: "es" });
        this.question_embed = new Discord.MessageEmbed()
          .setColor("#0099ff")
          .setTitle(`> ${TransLateReadyUwU.text}`)
          .setDescription(this.answer_array)
          .setFooter(
            "Categoría: " +
            await Transale(atob(this.question.results[0].category)) +
              ", Dificultad: " +
              await Transale(atob(this.question.results[0].difficulty))
          );
      }
      if (atob(this.question.results[0].type) == "boolean") {
        this.question_length = 1;
        if (this.question.results[0].correct_answer == "true") {
          this.correct_answer = 1;
        } else {
          this.correct_answer = 2;
        }
        this.answer_array = ["`A.` " + "Verdadero", "`B.` " + "Falso"];
        const TransLateReady = await Transale(atob(this.question.results[0].question), { from: "en", to: "es" });
        this.question_embed = new Discord.MessageEmbed()
          .setColor("#0099ff")
          .setTitle(`> ${TransLateReady.text}`)
          .setDescription(this.answer_array)
          .setFooter(
            "Categoría: " +
            await Transale(atob(this.question.results[0].category)) +
              ", Dificultad: " +
              await Transale(atob(this.question.results[0].difficulty))
          );
      }
      this.question_message = await this.message.reply(
        this.question_embed
      );
      let step = -1;
      while (step < this.question_length) {
        step++;
        await this.question_message.react(this.reactions[step]);
      }
      return this.await_reactions();
    }
    async await_reactions() {
      this.question_message
        .awaitReactions(
          (reaction, user) =>
            user.id == this.player.id &&
            (reaction.emoji.name == "🇦" ||
              reaction.emoji.name == "🇧" ||
              reaction.emoji.name == "🇨" ||
              reaction.emoji.name == "🇩"),
          { max: 1, time: 30000 }
        )
        .then(async(collected) => {
          this.reaction = collected.first().emoji.name;
          if (this.reaction == "🇦") this.input_answer = 1;
          if (this.reaction == "🇧") this.input_answer = 2;
          if (this.reaction == "🇨") this.input_answer = 3;
          if (this.reaction == "🇩") this.input_answer = 4;
          if (this.input_answer == this.correct_answer) {
            this.answer_array[this.input_answer - 1] =
              this.answer_array[this.input_answer - 1] + ` ${client.emotes.success}`;
              const TransLateReady2 = await Transale(atob(this.question.results[0].question), { from: "en", to: "es" });
            this.question_embed = new Discord.MessageEmbed()
              .setColor("#0099ff")
              .setTitle(`> ${TransLateReady2.text}`)
              .setDescription(this.answer_array)
              .setFooter(
                "Categoría: " +
                await Transale(atob(this.question.results[0].category)) +
                  ", Dificultad: " +
                  await Transale(atob(this.question.results[0].difficulty))
              );
            this.question_message.edit(this.question_embed).catch(() => {});
            this.question_message.edit(`<@!${this.player}>, has elegido correctamente! 😄.`).catch(() => {});
            this.end_game();
          } else {
            this.answer_array[this.input_answer - 1] =
              this.answer_array[this.input_answer - 1] + ` ${client.emotes.error}`;
              const TransLateReady3 = await Transale(atob(this.question.results[0].question), { from: "en", to: "es" });
            this.question_embed = new Discord.MessageEmbed()
              .setColor("#0099ff")
              .setTitle(`> ${TransLateReady3.text}`)
              .setDescription(this.answer_array)
              .setFooter(
                "Categoría: " +
                await Transale(atob(this.question.results[0].category)) +
                  ", Dificultad: " +
                  await Transale(atob(this.question.results[0].difficulty))
              );
            this.question_message.edit(this.question_embed).catch(() => {});
            this.question_message.edit(
              `<@!${this.player}>, no has elegido correctamente. La respuesta correcta fue ${this.reactions[this.correct_answer - 1]}.`
            ).catch(() => {});
            this.end_game();
          }
        })
        .catch(() => {
          this.question_message.edit(
            "<@!"+this.player+">, tardaste demasiado en responder! Se agotó el tiempo de espera del juego. La respuesta fue " +
              this.reactions[this.correct_answer - 1]
          ).catch(() => {});
          this.end_game();
        });
    }
    async end_game() {
        if (message.guild.me.permissions.has("MANAGE_EMOJIS")) {
      this.question_message.reactions.removeAll().catch(() => {});
    }
    const index = ActiveGuilds.indexOf(this.guild)
    ActiveGuilds.splice(index, 1);
      game = null;
    }

    static get get_guilds(){
        return ActiveGuilds
    }
  }
  async function Transale(text){
    let res = await gtranslate(text, { from: "en", to: "es" });
    return res.text;
}
  module.exports = {
    Game: Game
  }
