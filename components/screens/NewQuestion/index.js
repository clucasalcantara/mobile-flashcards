import React, { Component } from 'react'
import {
  AsyncStorage,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import { NavigationActions } from 'react-navigation'

const navigateAction = key => NavigationActions.navigate({
  routeName: 'NewQuestion',
  params: {},
  action: NavigationActions.navigate({ routeName: key })
})

class NewQuestion extends Component {
  state = {
    question: null,
    answer: null
  }

  addNewQuestion = (UID, newQuestion, appDecks) => {
    const { navigation } = this.props
    const oldSize = appDecks[UID].questions.length
    
    if (appDecks[UID]) {
      appDecks[UID].questions.push(newQuestion)
    }

    const { id, name, questions, image } = appDecks[UID]

    if (appDecks[UID].questions.length > oldSize) {
      const deckWithNewQuestion = appDecks[UID]
      const deckToUpdate = appDecks.filter(deck => deck.UID = id)
      
      const newDecks = appDecks.filter(deck => deck.UID === UID ? deckWithNewQuestion : deck)
      AsyncStorage.setItem('myDecks', JSON.stringify(newDecks))

      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'Home' })
        ]
      })
      
      navigation.dispatch(resetAction)
    }
  }

  asyncAddQuestion = async (question, answer, UID) => {
    const storageDecks = await AsyncStorage.getItem('myDecks').then(decks => decks )
    const appDecks = JSON.parse(storageDecks)

    const currentDeck = appDecks.filter(deck => UID === deck.UID)
    const newDeck = Object.assign(
      {}, 
      currentDeck,
      this.addNewQuestion(UID, { question, answer }, appDecks)
    )
  }
  
  addQuestion = ({ question, answer }) => {
    const { navigation  } = this.props
    const { state } = navigation
    const { UID } = state.params

    if (question, answer) {
      this.asyncAddQuestion(question, answer, UID)
    }
  }

  render() {
    const { navigation } = this.props
    const { state } = navigation
    const { UID } = state.params
    
    return (
      <View style={{ padding: 20, flex: 1, justifyContent: 'space-between' }}>
        <View>
          <View>
            <Text>Question: </Text>
            <TextInput
              style={{ 
                height: 40, 
                borderColor: 'gray', 
                borderWidth: 1,
                paddingLeft: 10,
              }}
              onChangeText={(question) => this.setState({ question })}
              placeholder='Type your question'
            />
          </View>
          <View style={{ marginTop: 10 }}>
            <Text>Answer: </Text>
            <TextInput
              style={{ 
                height: 40, 
                borderColor: 'gray', 
                borderWidth: 1,
                paddingLeft: 10,
              }}
              onChangeText={(answer) => this.setState({ answer })}
              placeholder='Type your answer'
            />
          </View>
        </View>
        
        {typeof UID !== 'undefined' &&
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity
              style={[styles.blockButton, { backgroundColor: 'green' }]}
              onPress={() => this.addQuestion(this.state)}
            >
              <Text style={styles.actions}>{'Add question'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.blockButton, { backgroundColor: 'purple' }]}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.actions}>{'Cancel'}</Text>
            </TouchableOpacity>
          </View>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  blockButton: {
    margin: 5,
    padding: 20,
    width: 130,
    justifyContent: 'center',
    alignItems: 'center'
  },
  actions: {
    color: 'white'
  }
})
export default NewQuestion