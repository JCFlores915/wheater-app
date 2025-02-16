import React, { PropsWithChildren } from 'react'
import { StyleProp, View, ViewStyle } from 'react-native'

type Props = PropsWithChildren<{
	variant?: 'xxxl' | 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs' | 'xxs' | 'xxxs'

	/** STYLES */
	style?: StyleProp<ViewStyle>
}>

const SIZES = {
	xxxl: 5,
	xxl: 4,
	xl: 3,
	lg: 2,
	md: 1.5,
	sm: 1,
	xs: 0.8,
	xxs: 0.6,
	xxxs: 0.4
}

const Divider: React.FC<Props> = (props): React.ReactNode => {
	

	const { variant = 'xxxs' } = props

	return (
		<View
			style={[
				{
					flexGrow: 1,
					height: SIZES[variant],
					backgroundColor:'#E5E7EB'
				},
				props.style
			]}
		/>
	)
}

export default Divider
