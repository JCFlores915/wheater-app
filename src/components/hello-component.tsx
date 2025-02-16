import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'

const Hello = () => {
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) {
      return { greeting: 'Good Morning!', image: require('@/src/assets/images/sun.png') }
    } else if (hour < 18) {
      return { greeting: 'Good Afternoon!', image: require('@/src/assets/images/sun.png')  }
    } else {
      return { greeting: 'Good Evening!', image: require('@/src/assets/images/moon.png')  }
    }
  }

  const { greeting, image } = getGreeting()

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{greeting}</Text>
      <Image source={image} style={styles.image} resizeMode='cover' />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical:16
  },
  text: {
    fontSize: 20,
    marginRight: 10,
  },
  image: {
    width: 30,
    height: 30,
  },
})

export default Hello