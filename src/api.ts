import type { Rcon } from "rcon-client";

export default class api {
	constructor(private rcon: Rcon) {}
	
	say(message: string) {
		this.rcon.send(`say ${message}`);
	}
}
