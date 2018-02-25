import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

const AddNewDeck = ({ navigate }) => (
  <TouchableOpacity
    style={{
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10,
    }}
    onPress={() => navigate('NewDeck')}
  >
    <Text style={{ color: 'white', fontWeight: 'bold' }} >New Deck </Text>
    <FontAwesome
      name='plus-square-o'
      size={14}
      color="white"
    />
  </TouchableOpacity>
)

export default AddNewDeck
