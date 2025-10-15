import type { ChildProcess } from "child_process";
import { readFileSync, writeFileSync } from "fs";
import { Rcon } from "rcon-client";
import type api from "./api";

import defaultConfig from "./sissm_default.json";

export class sissm {
	config: any;
	server?: Bun.Subprocess;
	id: string = ".".repeat(32).replace(/\./g, v => {
		var bucket = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
		return bucket[Math.floor(Math.random() * bucket.length)] ?? "-";
	});
	private rconPassword: string = ".".repeat(64).replace(/\./g, v => {
		var bucket = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-+=-:;<>,./?";
		return bucket[Math.floor(Math.random() * bucket.length)] ?? "-";
	});
	constructor(configFile?: string) {
		this.id = ".".repeat(32).replace(/\./g, v => {
			var bucket = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
			return bucket[Math.floor(Math.random() * bucket.length)] ?? "-";
		});
		var config = Object.assign({}, defaultConfig);
		if (configFile) Object.assign(config, JSON.parse(readFileSync(configFile).toString()));

		this.config = config;
	}

	startServer() {
		this.stopServer();
		
		
		
		this.server = Bun.spawn({
			cmd: [
				`${this.config.sissm.insurgency.path}/Insurgency/Binaries/Linux/InsurgencyServer-Linux-Shipping`,
				`-hostname=${this.config.sissm.serverName}`,
				`-log=${this.id}.log`,
				`-LogCmds="LogGameplayEvents Log"`,
				`-Port=${this.config.sissm.port}`,
				`-Rcon`,
				`-RconPassword=${this.rconPassword}`,
				`-RconListenPort=${this.config.sissm.rconPort}`
			],
		});
	}

	stopServer() {
		if (this.server) this.server.kill();
	}
}
