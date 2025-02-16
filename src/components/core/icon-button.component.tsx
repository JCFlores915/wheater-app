import { useAutoHitSlop } from '@/src/hooks/useAutoHitSlop'
import React, { PropsWithChildren } from 'react'
import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import IconSymbol, { IconProps } from './icon-symbols.component'

type Props = PropsWithChildren<
	{
		/** EVENTS */
		onPress: () => void

		/** STYLES */
		buttonStyle?: StyleProp<ViewStyle>
		containerStyle?: StyleProp<ViewStyle>
	} & IconProps
>

const IconButton: React.FC<Props> = (props): React.ReactNode => {
	const { insets, onLayout } = useAutoHitSlop()

	const { onPress, buttonStyle, containerStyle } = props

	return (
		<View style={[containerStyle]}>
			<Pressable
				hitSlop={insets}
				onPress={onPress}
				onLayout={onLayout}
				style={[styles.button, buttonStyle]}
			>
				<IconSymbol {...props} />
			</Pressable>
		</View>
	)
}



const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 200,
    padding: 5
  }
})

export default React.memo(IconButton)
