declare global {
	type ID = string | number
	type Dictionary<T> = Record<string, T[]>
	type RecursivePartial<T> = { [P in keyof T]?: RecursivePartial<T[P]> }

	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: 'development'

			EXPO_PUBLIC_TOKEN: string
		}
	}
}

export {}
