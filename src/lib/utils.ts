import type { LeafletEventHandlerFnMap } from 'leaflet';

export function capitalize<T extends string>(str: T): Capitalize<T> {
	return (str[0].toUpperCase() + str.slice(1)) as Capitalize<T>;
}
const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
function getRandomChar() {
	return chars[Math.floor(Math.random() * chars.length)];
}
export function getRandomString(length: number) {
	return Array.from({ length }, getRandomChar).join('');
}

export function getFirstNonCommentChild(element: HTMLElement) {
	let child = element.firstChild;
	while (child && child.nodeType !== Node.ELEMENT_NODE) {
		child = child.nextSibling;
	}
	return child as HTMLElement | null;
}

export type PickOptionByType<Options, Type> = keyof {
	[K in keyof Options as true extends UnionContainsType<Options[K], Type> ? K : never]: Options[K];
};

export type UnionContainsType<Union, Type> = Union extends Type ? true : never;

export type CreateSvelteEventsMap<
	EventNames extends readonly (keyof LeafletEventHandlerFnMap)[],
	SourceTarget = null,
> = {
	[K in EventNames[number] as `on${K}`]?: SourceTarget extends null
		? LeafletEventHandlerFnMap[K]
		: (
				e: Omit<Parameters<Exclude<LeafletEventHandlerFnMap[K], undefined>>[0], 'sourceTarget'> & {
					sourceTarget: SourceTarget;
				},
			) => void;
};

export type Simplify<T> = T extends object
	? T extends infer O
		? { [K in keyof O]: Simplify<O[K]> }
		: never
	: T;
