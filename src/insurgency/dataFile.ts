export default class dataFile {
	constructor(public path: string) {}
	
	protected async getReader() {
		return Bun.file(this.path).stream().getReader();
	}
	
	protected async getWriter() {
		var file = Bun.file(this.path);
		if (await file.exists())
			await file.delete();
		return file.writer();
	}

	/** Build information and write file*/
	async seralize() {
		return this;
	}
	
	/** Read file and parse information */
	async deseralize() {
		return this;
	}
}
