import { sissm } from "./src/sissm";
import pkg from "./package.json";
import iniFile from "./src/ini";

const testIni = new iniFile("./.test.ini");

testIni.load();

// new sissm(process.argv[2] ?? "");
