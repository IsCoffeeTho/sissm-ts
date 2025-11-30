import type { RecursivePartial } from "../types";

export function resolveRecursivePartial<T extends {[_:string]: any}>(defaults: T, picker: RecursivePartial<T>): T {
	var retval: any = (Array.isArray(defaults) ? [] : {});
	for (var key of Object.keys(defaults)) {
		var value = defaults[key];
		if (value == null) {
			retval[key] = picker[key] ?? null;
			continue;
		}
		switch (typeof value) {
			// @ts-ignore
			case "object":
				if (!Array.isArray(value)) {
					retval[key] = resolveRecursivePartial<typeof value>(
						value,
						picker?.[key] ?? {}
					);
					break;
				}
			default:
				retval[key] = picker?.[key] ?? value;
				break;
		}
	}
	return <T>retval;
}
