export function capitalize<T extends string>(str: T): Capitalize<T> {
	return (str[0].toUpperCase() + str.slice(1)) as Capitalize<T>;
}

export type PickOptionByType<Options, Type> = keyof {
	[K in keyof Options as true extends UnionContainsType<Options[K], Type> ? K : never]: Options[K];
};

export type UnionContainsType<Union, Type> = Union extends Type ? true : never;
