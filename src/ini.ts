import { existsSync, readFileSync, writeFileSync } from "fs";

type table = { [_: string]: any };

export default class iniFile {
	private data: table = {};
	constructor(private filename: string) {}

	get(key: string) {
		
	}
	
	set(key: string, value: any) {
		
	}

	async save() {
		function serializeSection(name: string, o: table): string[] {
			var lines = [];
			var parseQueue: table = {};
			for (var key in o) {
				var value = o[key];
				if (value === null || value === undefined) {
					lines.push(`${key}=`);
					continue;
				}
				switch (typeof value) {
					case "string":
					case "number":
					case "boolean":
						lines.push(`${key}=${value}`);
						break;
					case "object":
						parseQueue[`${name}.${key}`] = value;
						break;
					default:
						lines.push(`${key}=; type ${typeof value}`);
						break;
				}
			}
			if (lines.length > 0) {
				lines.unshift(`[${name}]`);
			}
			for (var subsectionName in parseQueue) {
				var subsection = parseQueue[subsectionName];
				lines.push("", ...serializeSection(subsectionName, subsection));
			}
			return lines;
		}
		var components = [];
		for (var sectionName in this.data) {
			var sectionLines = serializeSection(sectionName, this.data[sectionName]);
			components.push(sectionLines.join("\n"));
		}
		writeFileSync(this.filename, components.join("\n"));
	}

	load() {
		if (!existsSync(this.filename)) {
			writeFileSync(this.filename, "");
			return;
		}
		var fileData = readFileSync(this.filename).toString().split("\n");
		this.data = {};
		var sectionHeader: string = "";
		var sectionBeingParsed: table = {};
		for (var line of fileData) {
			var lineData = line.replace(/[;#][^\n]+/g, "").trim();
			if (lineData.length == 0)
				continue;
			if (line.match(/^\[[^\]]+\]$/g)) {
				var sectionHeader = lineData.slice(1,-1);
				console.log(">> SECTION", sectionHeader);
				continue;
			}
			var key = (lineData.match(/[^=]+=/g) ?? [""])[0].slice(0, -1).trim();
			if (!key)
				continue;
			var value = (lineData.match(/=[^\n]+/g) ?? [""])[0].slice(1).trim();
			console.log(key, value);
			var sectionKey = `${sectionHeader}.${key}`;
			if (value == "True" || value == "False") {
				this.set(sectionKey, value == "True");
			} else if (/^-{0,1}\d+\.\d+$/g.test(value)) {
				this.set(sectionKey, parseFloat(value));
			} else if (/^-{0,1}\d+$/g.test(value)) {
				this.set(sectionKey, parseInt(value));
			} else if (/^".*"$/g.test(value)) {
				this.set(sectionKey, value.slice(1, -1));
			} else {
				console.log("unknown ini value format:", `"${value}"`);
			}
		}
	}
}
