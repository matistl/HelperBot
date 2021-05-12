const { EventEmitter } = require("events");
class Hangman extends EventEmitter {
  constructor(text, options) {
    super();

    let jugadores;
    let lowerCase = true;
    let palabra;
    let vidas = 5;

    if (!text || typeof text != "string")
      throw SyntaxError(
        "Debes proporcionar la palabra de hangman obligatoriamente!"
      );

    palabra = text;

    if (!options || !options.jugadores)
      throw SyntaxError("Debes proporcionar la opción jugadores!");
    if (!Array.isArray(options.jugadores))
      throw TypeError("La opción jugadores debe ser un array");
    if (options.jugadores.length < 2)
      throw SyntaxError(
        "Debes proporcionar mínimo 2 ID's en la opcion jugadores"
      );

    jugadores = options.jugadores;

    if (options.lowerCase != undefined) {
      if (typeof options.lowerCase != "boolean")
        throw TypeError("La opción lowerCase debe ser true o false!");

      lowerCase = options.lowerCase;
    }

    if (options.vidas) {
      if (isNaN(options.vidas))
        throw TypeError("La opción vidas debe ser un número!");
      vidas = +options.vidas;
    }

    this.find = function (letra) {
      if (!letra) throw TypeError("El método find requiere una letra!");
      letra += "";
      if (this.game.ended)
        throw TypeError("La palabra ya ha sido descubierta!");

      this.game.ultimoTurno = this.game.turno;
      this.game.turno = turno();

      letra = lowerCase ? letra[0].toLowerCase() : letra[0];
      let palabraHere = lowerCase
        ? palabra.toLowerCase().split("")
        : palabra.split("");
      if (palabraHere.includes(letra)) {
        if (this.game.letrasUsadas.includes(letra)) {
          this.game.vidas--;
          if (this.game.vidas == 0) {
            this.game.ended = true;
            this.emit("end", this.game);
          }
          return false;
        }
        this.game.letrasUsadas.push(letra);

        let find = palabraHere.filter((x) => letra == x);

        find.forEach((index) => {
          let x = palabraHere.indexOf(index);
          palabraHere.splice(x, 1, "****");
          this.game.ascii.splice(x, 1, palabra[x]);
        });

        if (!this.game.ascii.includes("_")) {
          this.game.ended = true;
          this.game.winned = true;
          this.emit("end", this.game);
        }

        return true;
      } else {
        if (!this.game.letrasUsadas.includes(letra))
          this.game.letrasUsadas.push(letra);
        if (!this.game.letrasIncorrectas.includes(letra))
          this.game.letrasIncorrectas.push(letra);

        this.game.vidas--;
        if (this.game.vidas == 0) {
          this.game.ended = true;
          this.emit("end", this.game);
        }

        return false;
      }
    };

    this.delete = function (jugador) {
      let index = players.indexOf(jugador);
      if (index == -1 || this.game.turno !== jugador) return false;

      players.splice(index, 1);
      jugadores.splice(jugadores.indexOf(jugador), 1);
      this.game.turno = turno();
      return true;
    };

    function turno() {
      let turno = players.shift();
      players.push(turno);
      return turno;
    }
    function normalize(str) {
      return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }
    normalize(palabra);
    function ascii() {
      let palab = palabra.split("").fill("_");
      let reg = / +/g;

      while (reg.exec(palabra) !== null) {
        palab.splice(reg.lastIndex - 1, 1, " ");
      }

      return palab;
    }

    let players = jugadores.slice(1);

    this.game = {
      palabra: palabra,
      jugadores: jugadores,
      lowerCase: lowerCase,
      turno: turno(),
      vidas: vidas,
      ascii: ascii(),
      letrasUsadas: [],
      letrasIncorrectas: [],
      ended: false,
      winned: false,
      ultimoTurno: null,
    };
  }
}

module.exports = Hangman;
