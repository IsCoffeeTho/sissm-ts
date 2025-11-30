import dataFile from "./dataFile";

export type sectionDataDescriptor = { [_: string]: string | number };
export type sectionDescriptor = { [_: string]: iniSection };

export class iniSection {
	#data: sectionDataDescriptor = {};
	sections: sectionDescriptor = {};
	constructor() {}

	getSection(key: string): iniSection {
		var keyParts = key.split(".");

		var currentKeyPart = <string>keyParts.shift();

		var section = this.sections[currentKeyPart];
		if (!section) {
			section = new iniSection();
			this.sections[currentKeyPart] = section;
		}

		key = keyParts.join(".");

		return key.length == 0 ? section : section.getSection(key);
	}

	deleteSection(key: string) {
		var keyParts = key.split(".");

		var currentKeyPart = <string>keyParts.shift();

		var section = this.sections[currentKeyPart];
		if (!section) {
			section = new iniSection();
			this.sections[currentKeyPart] = section;
		}

		key = keyParts.join(".");

		if (key.length == 0) delete this.sections[currentKeyPart];
		else section.deleteSection(key);
	}

	get(key: string, defaultValue?: string | number) {
		return this.#data[key] ?? defaultValue;
	}

	set(key: string, value: string | number) {
		this.#data[key] = value;
		return this;
	}

	remove(key: string) {
		delete this.#data[key];
		return this;
	}

	seralize(sectionKey: string): string[] {
		var retval = [];
		if (Object.keys(this.#data).length > 0) {
			retval.push(`[${sectionKey}]`);
			for (var key in this.#data) {
				var value = this.#data[key];
				switch (typeof value) {
					case "string":
						if (["true", "false"].indexOf(value.toLowerCase()) != -1 || value.match(/^(\/|\w\:\\|\()/))
							break;
						value = `"${value.replace(/[\x00-\x1F\x7F-\xFFFF]/g, (m) => {
							switch (m) {
								case "\x07":
									return "\\a";
								case "\x08":
									return "\\b";
								case "\f":
									return "\\f";
								case "\n":
									return "\\n";
								case "\r":
									return "\\r";
								case "\t":
									return "\\t";
								case "\v":
									return "\\v";
								case "\\":
									return "\\\\";
								default:
									return `\\x${(<number>m.codePointAt(0)).toString(16).padStart(2, "00").toLocaleUpperCase()}`;
							}
						}).replace(/"/g, '\\"')}"`;
						break;
					default:
						break;
				}
				retval.push(`${key}=${value}`);
			}
			retval.push(``);
		}
		if (Object.keys(this.sections).length > 0) {
			for (var subKey in this.sections) {
				var subSection = <iniSection>this.sections[subKey];
				subKey = sectionKey ? `${sectionKey}.${subKey}` : subKey;
				retval.push(...subSection.seralize(subKey));
			}
		}
		return retval;
	}
}

export default class iniFile extends dataFile {
	sections: sectionDescriptor = {};

	constructor(path: string) {
		super(path);
	}

	getSection(key: string): iniSection {
		var keyParts = key.split(".");

		var currentKeyPart = <string>keyParts.shift();

		var section = this.sections[currentKeyPart];
		if (!section) {
			section = new iniSection();
			this.sections[currentKeyPart] = section;
		}

		key = keyParts.join(".");

		return key.length == 0 ? section : section.getSection(key);
	}

	deleteSection(key: string) {
		var keyParts = key.split(".");

		var currentKeyPart = <string>keyParts.shift();

		var section = this.sections[currentKeyPart];
		if (!section) {
			section = new iniSection();
			this.sections[currentKeyPart] = section;
		}

		key = keyParts.join(".");

		if (key.length == 0) delete this.sections[currentKeyPart];
		else section.deleteSection(key);
	}

	override async seralize(): Promise<this> {
		var file = await this.getWriter();

		for (var sectionKey in this.sections) {
			var subSection = <iniSection>this.sections[sectionKey];
			var seralizedSection = subSection.seralize(sectionKey);
			for (var line of seralizedSection) {
				file.write(`${line}\n`);
			}
		}

		return this;
	}

	override async deseralize(): Promise<this> {
		var file = await this.getReader();
		var decoder = new TextDecoder();

		var buffer = "";

		var lines = [];

		var chunk;
		while ((chunk = await file.read()) && !chunk.done) {
			var value = buffer + decoder.decode(chunk.value);
			lines.push(...value.split(/[\r\n]{1,2}/g));
			buffer = lines.pop() ?? "";
		}
		lines.push(buffer);

		var santizedLines: string[] = [];
		var continuation = "";
		while (lines.length > 0) {
			let line = continuation + <string>lines.shift();
			continuation = "";
			if (line.length == 0) continue;
			if (line[0] == ";") continue;
			var i = 0;
			var char;
			var inString = false;
			var escaping = false;
			var prevWS = true;
			var commented = false;
			while ((char = line[i++])) {
				if (char == " " || char == "\t") {
					prevWS = true;
					continue;
				}
				if (char == '"' && !escaping) {
					inString = !inString;
					prevWS = false;
					continue;
				}
				if (char == "\\" && !escaping) {
					escaping = true;
					prevWS = false;
					continue;
				}
				escaping = false;
				if (char == ";" && !inString && prevWS) {
					commented = true;
					i--;
					line = line.slice(0, i);
					break;
				}
				prevWS = false;
			}
			if (line.at(-1) == "\\" && !commented) continuation = line;
			else santizedLines.push(line);
		}

		let line: string | undefined;
		var i = 0;
		var section;
		while ((line = santizedLines[i++])) {
			line = line.trim();
			if (line.startsWith("[") && line.search(/[\r\n]/g) == -1) {
				var sectionKey = line.slice(1, -1).trim();
				section = this.getSection(sectionKey);
				continue;
			}
			if (!section) throw new Error("Data at start of .ini file without section header.");

			var seperatorIdx = line.indexOf("=");
			if (seperatorIdx == -1) throw new Error("Key value pair has no seperator '='.");

			var key = line.slice(0, seperatorIdx).trim();
			var value = line.slice(seperatorIdx + 1).trim();
			if (value.match(/^-?(\d*\.)?\d+$/g)) {
				section.set(key, parseFloat(value));
				continue;
			}
			if (value.match(/^".*"$/g)) {
				value = value.slice(1, -1);
			}
			if (!value.match(/^\w\:\\/g)) {
				value = value
					.replace(/\\([0-7]{3,7})/g, (m, octal) => {
						return String.fromCodePoint(parseInt(octal, 8));
					})
					.replace(/\\x([0-9a-fA-F]{2,6})/g, (m, hex) => {
						return String.fromCodePoint(parseInt(hex, 16));
					})
					.replace(/\\(.)/g, (m, l) => {
						switch (l) {
							case "a":
								return "\x07";
							case "b":
								return "\b";
							case "f":
								return "\f";
							case "n":
								return "\n";
							case "r":
								return "\r";
							case "t":
								return "\t";
							case "v":
								return "\v";
							case "'":
								return "'";
							case '"':
								return '"';
							case "\\":
								return "\\";
							case "?":
								return "?";
							case "\n":
								return "";
							default:
								return m;
						}
					});
			}
			section.set(key, value);
		}

		return this;
	}
}

iniFile.prototype.toString = function () {
	var retval = "ini File\n╭——————⦁\n";
	for (var sectionKey in this.sections) {
		var subSection = <iniSection>this.sections[sectionKey];
		var seralizedSection = subSection.seralize(sectionKey);
		for (var line of seralizedSection) {
			retval += `│ ${line}\n`;
		}
	}
	retval += `╰——————⦁`;
	return retval;
};
