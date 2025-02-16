import { useCallback, useMemo, useState } from 'react'
import { Insets, LayoutChangeEvent } from 'react-native'
import { getHitSlop } from '../utils'

export const useAutoHitSlop = (): {
	insets: Insets
	onLayout: (event: LayoutChangeEvent) => void
} => {
	const [frame, setFrame] = useState({ x: 0, y: 0 })

	const onLayout = useCallback(
		(event: LayoutChangeEvent) => {
			const { layout } = event.nativeEvent

			if (layout.width !== frame.x && layout.height !== frame.y) {
				setFrame({ x: layout.width, y: layout.height })
			}
		},
		[frame]
	)

	const hitSlop = useMemo(() => getHitSlop(frame.x, frame.y), [frame])

	return { insets: hitSlop, onLayout }
}
