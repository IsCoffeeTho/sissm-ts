import dataFile from "./dataFile";

export default class txtFile extends dataFile {
	#data: string[] = [];
	constructor(path: string) {
		super(path);
	}

	*[Symbol.iterator](): ArrayIterator<string> {
		for (var value of this.#data) yield value;
	}

	with(index: number, value: string): string[] {
		return this.#data.with(index, value);
	}

	toSpliced(start: number, deleteCount?: number, ...items: string[]): string[] {
		return this.#data.toSpliced(start, deleteCount ?? this.#data.length - start, ...items);
	}

	toSorted(compareFn?: ((a: string, b: string) => number) | undefined): string[] {
		return this.#data.toSorted(compareFn);
	}

	toReversed(): string[] {
		return this.#data.toReversed();
	}

	findLastIndex(predicate: (value: string, index: number, array: string[]) => unknown, thisArg?: any): number {
		return this.#data.findLastIndex(predicate, thisArg);
	}

	findLast(predicate: (v: string, i: number, a: string[]) => boolean, thisArg?: any): string | undefined {
		return this.#data.findLast(predicate, thisArg);
	}

	at(index: number): string | undefined {
		return this.#data.at(index);
	}

	flat<A, D extends number = 1>(this: A, depth?: D | undefined): FlatArray<A, D>[] {
		return <FlatArray<A, D>[]>(<txtFile>this).#data.flat();
	}

	flatMap<U, This = undefined>(callback: (this: This, value: string, index: number, array: string[]) => U | readonly U[], thisArg?: This | undefined): U[] {
		return this.#data.flatMap(callback, thisArg);
	}

	includes(searchElement: string, fromIndex?: number): boolean {
		return this.#data.includes(searchElement, fromIndex);
	}

	keys(): ArrayIterator<number> {
		return this.#data.keys();
	}

	entries(): ArrayIterator<[number, string]> {
		return this.#data.entries();
	}

	copyWithin(target: number, start: number, end?: number): this {
		this.#data.copyWithin(target, start, end);
		return this;
	}

	fill(value: string, start?: number, end?: number): this {
		this.#data.fill(value, start, end);
		return this;
	}

	findIndex(predicate: (v: string, i: number, a: string[]) => boolean, thisArg?: unknown): number {
		return this.#data.findIndex(predicate, thisArg);
	}

	find(predicate: (v: string, i: number, a: string[]) => boolean, thisArg?: any): string | undefined {
		return this.#data.find(predicate, thisArg);
	}

	reduceRight<U>(callbackfn: (accumulator: string, v: string, i: number, a: string[]) => string, initialValue?: string): U {
		return <U>this.#data.reduceRight(callbackfn, initialValue ?? "");
	}

	reduce<U>(callbackfn: (accumulator: string, v: string, i: number, a: string[]) => string, initialValue?: string): U {
		return <U>this.#data.reduce(callbackfn, initialValue ?? "");
	}

	filter(predicate: (v: string, i: number, a: string[]) => boolean, thisArg?: any): string[] {
		return this.#data.filter(predicate, thisArg);
	}

	map<U>(callbackfn: (value: string, index: number, array: string[]) => U, thisArg?: any): U[] {
		return this.#data.map<U>(callbackfn, thisArg);
	}

	some(predicate: (value: string, index: number, array: string[]) => unknown, thisArg?: any): boolean {
		return this.#data.some(predicate, thisArg);
	}

	forEach(callbackfn: (value: string, index: number, array: string[]) => void, thisArg?: any): void {
		return this.#data.forEach(callbackfn, thisArg);
	}

	every(predicate: (v: string, i: number, a: string[]) => boolean, thisArg?: any): this is string[] {
		return this.#data.every(predicate, thisArg);
	}

	lastIndexOf(searchElement: string, fromIndex?: number): number {
		return this.#data.lastIndexOf(searchElement, fromIndex);
	}

	splice(start: number, deleteCount?: number, ...rest: string[]): string[] {
		return this.#data.splice(start, deleteCount ?? this.#data.length - start, ...rest);
	}

	slice(start?: number, end?: number): string[] {
		return this.#data.slice(start, end);
	}

	unshift(...items: string[]): number {
		return this.#data.unshift(...items);
	}

	shift(): string | undefined {
		return this.#data.shift();
	}

	reverse(): string[] {
		return this.#data.reverse();
	}

	join(separator?: string): string {
		return this.#data.join(separator);
	}

	concat(...items: ConcatArray<string>[]): string[] {
		return <string[]>this.#data.concat(...items);
	}

	push(...strs: string[]) {
		return this.#data.push(...strs);
	}

	pop(): string | undefined {
		return this.#data.pop();
	}

	get length() {
		return this.#data.length;
	}

	indexOf(value: string) {
		return this.#data.indexOf(value);
	}

	sort(compareFn?: (a: string, b: string) => number) {
		this.#data.sort(compareFn);
		return this;
	}

	values(): ArrayIterator<string> {
		return this.#data.values();
	}

	override async seralize(): Promise<this> {
		var file = await this.getWriter();

		for (var values of this.#data) {
			file.write(`${values}\n`);
		}

		return this;
	}

	override async deseralize(): Promise<this> {
		var file = await this.getReader();
		var decoder = new TextDecoder();

		this.#data = [];
		var buffer = "";

		var chunk;
		while ((chunk = await file.read()) && !chunk.done) {
			var value = buffer + decoder.decode(chunk.value);
			this.#data.push(...value.split(/[\r\n]{1,2}/g));
			buffer = this.#data.pop() ?? "";
		}
		this.#data.push(buffer);
		return this;
	}
}

txtFile.prototype.toString = function () {
	return `${this.flat()}`;
};
