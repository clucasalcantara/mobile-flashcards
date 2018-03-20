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
    answers: [],
    rightAnswer: null
  }

  componentWillMount = () => (
    <AppLoading
      startAsync={this._getAsyncDecks}
      onFinish={() => this.setState({ isReady: true })}
      onError={console.warn}
    />
  )

  addNewQuestion = async (UID, newQuestion, appDecks) => {
    const { navigation } = this.props
    const deck = appDecks[UID - 1] || appDecks[UID]

    const oldSize = deck.questions.length
    const { deckUID, name, questions, image } = appDecks[UID - 1] || appDecks[UID]

    if (deck) {
      deck.questions.push(newQuestion)
    }

    if (deck.questions.length > oldSize) {
      const deckWithNewQuestion = deck
      const deckToUpdate = appDecks.filter(deck => deck.UID = deckUID)
      const newDecks = appDecks.filter(deck => deck.UID === UID ? deckWithNewQuestion : deck)

      AsyncStorage.setItem('myDecks', JSON.stringify(newDecks))

      navigation.navigate('Detail', { ...deck, UID })
    }
  }

  asyncAddQuestion = async (question, rightAnswer, answers, UID) => {
    const appDecks = JSON.parse(await AsyncStorage.getItem('myDecks'))
    const currentDeck = appDecks.filter(deck => UID === deck.UID)
    const newQuestion = this.addNewQuestion(UID, { question, rightAnswer, answers }, appDecks)

    const newDeck = {
      ...currentDeck,
      newQuestion
    }
  }

  addQuestion = ({ question, rightAnswer, answers }) => {
    const { navigation } = this.props
    const { state } = navigation
    const { UID } = state.params

    if (question, rightAnswer, answers) {
      this.asyncAddQuestion(question, rightAnswer, answers, UID)
    }
  }

  _getAsyncDecks = async () => {
    const appDecks = await AsyncStorage.getItem('myDecks')
    this.setState({ appDecks: JSON.parse(appDecks) })
  }

  addChoice = (index, choice) => {
    const { answers } = this.state
    answers[index] = choice

    this.setState({ answers })
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
            <Text>Right Answer: </Text>
            <TextInput
              style={{
                height: 40,
                borderColor: 'gray',
                borderWidth: 1,
                paddingLeft: 10,
              }}
              onChangeText={(rightAnswer) => this.setState({ rightAnswer })}
              placeholder='Type your answer'
            />
          </View>
          <View>
            <Text>Option 1: </Text>
            <TextInput
              style={{
                height: 40,
                borderColor: 'gray',
                borderWidth: 1,
                paddingLeft: 10,
              }}
              onChangeText={(option1) => this.addChoice(0, option1)}
              placeholder='Type your option'
            />
          </View>
          <View style={{ marginTop: 10 }}>
            <Text>Option 2: </Text>
            <TextInput
              style={{
                height: 40,
                borderColor: 'gray',
                borderWidth: 1,
                paddingLeft: 10,
              }}
              onChangeText={(option2) => this.addChoice(1, option2)}
              placeholder='Type your option'
            />
          </View>
          <View style={{ marginTop: 10 }}>
            <Text>Option 3: </Text>
            <TextInput
              style={{
                height: 40,
                borderColor: 'gray',
                borderWidth: 1,
                paddingLeft: 10,
              }}
              onChangeText={(option3) => this.addChoice(2, option3)}
              placeholder='Type your option'
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
