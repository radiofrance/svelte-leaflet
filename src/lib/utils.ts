export function capitalize<T extends string>(str: T): Capitalize<T> {
	return (str[0].toUpperCase() + str.slice(1)) as Capitalize<T>;
}
