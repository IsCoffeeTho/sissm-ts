import { EventEmitter } from "events";
import type { RecursivePartial } from "../types";
import defaultGameOptions from "./defaultGameOptions";
import { resolveRecursivePartial } from "./defaultPicker";

type gameServerOptions = typeof defaultGameOptions;

export default class issGameServer extends EventEmitter {
	path: string;
	constructor(options?: RecursivePartial<gameServerOptions>) {
		super();
		var opt = resolveRecursivePartial<gameServerOptions>(
			defaultGameOptions,
			<RecursivePartial<gameServerOptions>>options
		);
		console.log(opt);
		this.path = opt.path;
	}
	
	async adjustConfigFiles() {
		var gameCfgPath = this.path;
		var serverCfgPath = this.path;
		if (process.platform == "win32") {
			gameCfgPath += `\\Insurgency\\Saved\\Config\\WindowsServer`;
			serverCfgPath += `\\Insurgency\\Config\\Server`;
		} else if (process.platform == "linux") {
			gameCfgPath += `/Insurgency/Saved/Config/LinuxServer`;
			serverCfgPath += `/Insurgency/Config/Server`;
		} else {
			throw new Error(`No issGameServer implementation for "${process.platform}" platforms`);
		}
		
	}
	
	

	async start() {
		
	}
}
