import React from 'react'
import { View, Image, Text } from 'react-native'

const Header = () => (
  <View style={styles.header}>
    <Image
      resizeMode='contain'
      style={{
        width: 300,
        height: 80
      }}
      source={{ uri: APP_LOGO }}
    />
    <Text style={{ marginTop: 8, color: 'white', fontSize: 16 }}>
      {APP_HEADLINE}
    </Text>
  </View>
)

export default Header