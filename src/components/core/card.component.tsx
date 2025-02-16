import React, { PropsWithChildren } from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'



type Props = PropsWithChildren<{
	/** STYLES */
	containerStyle?: StyleProp<ViewStyle>
}>

const Card: React.FC<Props> = (props): React.ReactNode => {

	return (
		<View
			style={StyleSheet.flatten([
				styles.container,
				props.containerStyle
			])}
			children={props.children}
		/>
	)
}



const styles = StyleSheet.create({
  container: {
		borderRadius: 22,
		borderColor: 'blue',
		backgroundColor: '#e5e5ea',
    borderWidth:.6
	}
})

export default React.memo(Card)
