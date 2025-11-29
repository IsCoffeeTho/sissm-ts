import { EventEmitter } from "events";

const defaultGameOptions = {
	path: `${process.platform == "win32" ? `C:\\Program Files (x86)\\Steam\\steamapps\\common` : `${process.env["HOME"]}/.steam/SteamApps/common`}/sandstorm_server`,
	hostname: "127.0.0.1",
	port: 27102,
	queryPort: 27131,
	gameSettings: {
		cheats: false,
		
	}
};

type gameServerOptions = typeof defaultGameOptions;

export default class issGameServer extends EventEmitter {
	path: string;
	constructor(options?: Partial<gameServerOptions>) {
		super();
		var opt = <gameServerOptions>Object.assign(Object.assign({}, defaultGameOptions), options);
		this.path = opt.path;
	}
	
	async adjustConfigFiles(configPath: string) {
		
	}

	async start() {
		var gamePath = this.path;
		var configPath = this.path;
		if (process.platform == "win32") {
			gamePath += `\\InsurgencyServer.exe`;
			configPath += `\\Insurgency\\Saved\\Config\\WindowsServer`;
		} else if (process.platform == "linux") {
			gamePath += `/Insurgency/Binaries/Linux/InsurgencyServer-Linux-Shipping`;
			configPath += `/Insurgency/Saved/Config/LinuxServer`;
		} else {
			throw new Error(`No issGameServer implementation for "${process.platform}" platforms`);
		}
		await this.adjustConfigFiles(configPath);
		
	}
}
