import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { StyleSheet, View, ImageBackground, TouchableHighlight, Text } from 'react-native'

const Deck = (props) => {
  const { id, name, questions, image, onPress } = props

  return (
    <TouchableHighlight onPress={() => onPress(id)}>
      <View style={styles.deck}>
        <ImageBackground
          imageStyle={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
          style={styles.cardCover}
          source={{ uri: image || 'http://hbspca.com/wp-content/plugins/spca-adoption/default/default-cat.jpg' }}
        >
        </ImageBackground>
      
        <View style={styles.deckInfo}>
          <Text style={styles.deckName}>{name} | Quiz </Text>
          <View style={styles.deckCardsCount}>
            <Ionicons name='ios-albums-outline' size={20} />
            <Text style={styles.deckSize}> {`${questions.length} ${questions.length > 1 ? 'cards' : 'card'}`}</Text>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  deck: {
    width: 300,
    height: 380,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: 'rgba(0,0,0,0.25)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  deckName: {
    color: '#222',
    fontSize: 14,
    fontWeight: 'bold'
  },
  deckSize: {
    color: 'gray',
  },
  cardCover: {
    flex: 1,
  },
  deckInfo: {
    height: 70,
    padding: 10,
    backgroundColor: 'white',
    alignItems: 'flex-end',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  deckCardsCount: {
    flex: 1,
    flexDirection: 'row',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default Deck
