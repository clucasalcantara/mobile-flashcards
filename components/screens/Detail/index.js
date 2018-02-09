import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  TouchableOpacity
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import { START_QUIZ, ADD_QUESTION } from '../../../config/constants'

const { width } = Dimensions.get('window')

const Detail = ({ navigation }) => {
  const { UID, name, questions, image } = navigation.state.params
  console.log('Deck UID', navigation.state.params)
  return (
    <View>
      <ImageBackground
        resizeMode='cover'
        style={{
          width,
          height: 200
        }}
        source={{ uri: image }}
      />
      <Text style={styles.deckName}>{`${name}'s Deck`}</Text>
      <View style={styles.deckCardsCount}>
        <Ionicons name='ios-albums-outline' size={20} />
        <Text style={styles.deckSize}> {`${questions.length} quiz ${questions.length > 1 ? 'cards' : 'card'}`}</Text>
      </View>
      <View style={styles.buttonsWrapper}>
        {questions.length > 0 && <TouchableOpacity
          style={[styles.blockButton, { backgroundColor: 'green'}]}
          onPress={() => navigation.navigate('Quiz', { name, questions })}
        >
          <Text style={styles.actions}>{START_QUIZ}</Text>
        </TouchableOpacity>}
        {questions.length == 0 && <TouchableOpacity
          style={[styles.blockButton, { backgroundColor: 'green' }]}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.actions}>{'BACK HOME'}</Text>
        </TouchableOpacity>}
        <TouchableOpacity
          style={[styles.blockButton, { backgroundColor: 'purple'}]}
          onPress={() => navigation.navigate('NewQuestion', { UID })}
        >
          <Text style={styles.actions}>{ADD_QUESTION}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  deckName: {
    marginTop: 30,
    paddingBottom: 20,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222'
  },
  deckCardsCount: {
    flex: 1,
    flexDirection: 'row',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 20
  },
  blockButton: {
    margin: 5,
    padding: 20,
  },
  actions: {
    color: 'white'
  }
})
export default Detail