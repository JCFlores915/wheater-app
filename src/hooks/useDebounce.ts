import { useEffect, useState, useCallback } from 'react'

type DebounceFunction<T> = (...args: T[]) => void

export function debounce<T>(
	func: DebounceFunction<T>,
	delay: number
): (...args: T[]) => void {
	let timeoutId: ReturnType<typeof setTimeout> | null = null

	return function (...args: T[]) {
		if (timeoutId) {
			clearTimeout(timeoutId)
		}

		timeoutId = setTimeout(() => {
			func(...args)
		}, delay)
	}
}

export const useDebounce = <T>(
	callback: DebounceFunction<T>,
	delay: number
): DebounceFunction<T> => {
	const [debounced, setDebounced] = useState<DebounceFunction<T>>(() =>
		debounce(callback, delay)
	)

	useEffect(() => {
		setDebounced(() => debounce(callback, delay))
	}, [callback, delay])

	const debouncedMemoized = useCallback(debounced, [debounced])

	return debouncedMemoized
}
