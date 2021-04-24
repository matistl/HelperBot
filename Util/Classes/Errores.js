module.exports = class Errores {
	constructor(options = { lang: 'EN' }) {
		this.lang = options.lang;
	}
	
	Errores(type) {
		switch (type) {
			case 1:
				if (this.lang === 'ES') {
					return 'Te Faltan Permisos';
				} else if (this.lang === 'EN') {
					return "You're Missing Permissions";
				} else {
					return 'Te Faltan Permisos';
				}
				break;

			case 2:
				if (this.lang === 'ES') {
					return 'Me Faltan Permisos';
				} else if (this.lang === 'EN') {
					return "I'm Missing Permissions";
				} else {
					return 'Me Faltan Permisos';
				}
				break;
			case 3:
				if (this.lang === 'ES') {
					return 'Te Falta Escribir Argumentos';
				} else if (this.lang === 'EN') {
					return 'You Need To Write Arguments';
				} else {
					return 'Te Falta Escribir Argumentos';
				}
				break;
			case 4:
				if (this.lang === 'ES') {
					return 'Nescesitas Estar En Un Canal NSFW';
				} else if (this.lang === 'EN') {
					return 'Need To Be On An NSFW Channel';
				} else {
					return 'Nescesitas Estar En Un Canal NSFW';
				}
				break;
			case 5:
				if (this.lang === 'ES') {
					return 'Comando Deshabilitado';
				} else if (this.lang === 'EN') {
					return 'Disable Command';
				} else {
					return 'Comando Deshabitado';
				}
				break;
				case 6:
					if (this.lang === "ES") {
						return "Argumento Invalido"
					} else if(this.lang === "EN"){
						return "Invalid Argument"
					} else {
						return "Argumento Invalido"
					}
					break
				case 7:
					if(this.lang === "ES"){
						return "Porfavor, Espera time Segundos Para Volver A Usar Ese Comando!"
					} else if(this.lang === "EN"){
						return "Please Wait time Seconds To Use That Command Again!"
					} else {
						return "Porfavor, Espera time Segundos Para Volver A Usar Ese Comando!"
					}
					break
		}
	}
}
