module.exports = class Lang {
	constructor(options = { Lang : "EN"}){
		this.lang = options.lang;
	}
	codes(type) {
		switch(type){
			case 1:
				if(this.lang === "ES"){
					return "El Nuevo Prefix Del Servidor Es: **`date`**";
				} else if(this.lang === "EN") {
					return "The New Server Prefix Is: **`date`**";
				} else {
					return "El Nuevo Prefix Del Servidor Es: **`date`**";
				}
			break;
		}
	}
}