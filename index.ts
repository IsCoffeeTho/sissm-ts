import issGameServer from "./src/insurgency/gameServer";
import iniFile from "./src/insurgency/inifile";

const server = new issGameServer({
	gameSettings: {
		cheats: true,
		mapCycle: [
			"test"
		]
	}
});