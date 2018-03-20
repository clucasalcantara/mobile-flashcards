import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

const AddNewDeck = ({ navigate }) => (
  <TouchableOpacity
    style={{
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginStart: 10,
    }}
    onPress={() => navigate('Home')}
  >
    <FontAwesome
        name='home'
        size={24}
        color="white"
    />
  </TouchableOpacity>
)

export default AddNewDeck
