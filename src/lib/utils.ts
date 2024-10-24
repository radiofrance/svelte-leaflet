export function capitalize<T extends string>(str: T): Capitalize<T> {
	return (str[0].toUpperCase() + str.slice(1)) as Capitalize<T>;
}

export type UnionContainsBoolean<T> = T extends boolean ? true : never;
export type UnionContainsString<T> = T extends string ? true : never;
export type UnionContainsNumber<T> = T extends number ? true : never;
