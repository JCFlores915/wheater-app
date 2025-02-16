import React from 'react'
import { Platform } from 'react-native'

import { SymbolView, SymbolViewProps, SymbolWeight } from 'expo-symbols'
import { MaterialCommunityIcons } from '@expo/vector-icons'

export type IconProps = {
	size?: number
	color?: string
	weight?: SymbolWeight
	style?: Omit<SymbolViewProps['style'], 'width' | 'height'>
	name: {
		ios: SymbolViewProps['name']
		android: keyof typeof MaterialCommunityIcons.glyphMap
	}
}

const IconSymbol: React.FC<IconProps> = (props): React.ReactNode => {
	const { name, style, size = 24, color, weight = 'regular' } = props

	if (Platform.OS === 'android')
		return (
			<MaterialCommunityIcons
				name={name.android}
				color={color}
				style={style}
				size={size}
			/>
		)

	return (
		<SymbolView
			size={size}
			name={name.ios}
			weight={weight}
			tintColor={color}
			style={[{ width: size, height: size }, style]}
		/>
	)
}

export default React.memo(IconSymbol)
