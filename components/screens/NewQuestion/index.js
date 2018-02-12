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
import { AppLoading } from 'expo'

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

  componentWillMount = () => (
    <AppLoading
      startAsync={this._getAsyncDecks}
      onFinish={() => this.setState({ isReady: true })}
      onError={console.warn}
    />
  )

  addNewQuestion = async (UID, newQuestion) => {
    const { navigation } = this.props
    const appDecks = JSON.parse(await AsyncStorage.getItem('myDecks'))
    const deckUID = UID - 1

    const oldSize = appDecks[deckUID].questions.length

    
    if (appDecks[deckUID]) {
      appDecks[deckUID].questions.push(newQuestion)
    }

    const { id, name, questions, image } = appDecks[deckUID]

    if (appDecks[deckUID].questions.length > oldSize) {
      const deckWithNewQuestion = appDecks[deckUID]
      const deckToUpdate = appDecks.filter(deck => deck.deckUID = id)
      
      const newDecks = appDecks.filter(deck => deck.deckUID === deckUID ? deckWithNewQuestion : deck)
      AsyncStorage.setItem('myDecks', JSON.stringify(newDecks))

      navigation.navigate('Detail', { ...appDecks[deckUID], deckUID })
    }
  }

  asyncAddQuestion = async (question, answer, UID) => {
    const appDecks = JSON.parse(await AsyncStorage.getItem('myDecks'))
    const currentDeck = appDecks.filter(deck => UID === deck.UID)
    const newQuestion = this.addNewQuestion(UID, { question, answer }, appDecks)
    
    const newDeck = {
      ...currentDeck,
      newQuestion
    }
  }

  addQuestion = ({ question, answer }) => {
    const { navigation } = this.props
    const { state } = navigation
    const { UID } = state.params

    if (question, answer) {
      this.asyncAddQuestion(question, answer, UID)
    }
  }

  _getAsyncDecks = async () => {
    const appDecks = await AsyncStorage.getItem('myDecks')
    this.setState({ appDecks: JSON.parse(appDecks) })
  }

  render() {
    const { navigation } = this.props
    const { state } = navigation
    const { UID } = state.params
    const { isReady } = this.state
    
    return (
      <View style={{ padding: 20, flex: 1, justifyContent: 'space-between' }}>
        {!isReady && 
          <AppLoading
            startAsync={this._getAsyncDecks}
            onFinish={() => this.setState({ isReady })}
            onError={console.warn}
          />
        }
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