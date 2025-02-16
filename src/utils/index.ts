import { Insets } from "react-native"

export const getHitSlop = (x: number, y: number): Insets => {
	// hit slop recommended by apple (44)

	const hitSlopV = Math.max(44 - x, 0) / 2
	const hitSlopH = Math.max(44 - y, 0) / 2

	return {
		top: hitSlopV,
		left: hitSlopH,
		right: hitSlopH,
		bottom: hitSlopV
	}
}