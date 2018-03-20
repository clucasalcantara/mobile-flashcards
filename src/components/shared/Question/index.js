import React, { Component } from 'react'
import { Button, Text, TextInput, View, StyleSheet, TouchableOpacity } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { RkButton, RkChoiceGroup, RkChoice } from 'react-native-ui-kitten'

import { RIGHT_ANSWER, WRONG_ANSWER, FINISH_QUIZ} from '../../../config/constants'


class Question extends Component {
  state = {
    ended: false,
    userAnswer: '',
  }

  validateAnswer = () => {
    const { animatedColor, userAnswer, localScore } = this.state
    const {
      answers,
      rightAnswer,
      upScore,
      noScore,
      snapCard,
      position,
      quizSize,
      score,
      navigation,
      questions,
      name,
    } = this.props
    const ended = position >= quizSize

    if (!ended) {
      if (answers[userAnswer] === rightAnswer) {
        upScore(position)
        return snapCard()
      } else {
        noScore(answers[userAnswer], rightAnswer)
        return snapCard()
      }
    } else {
      if (answers[userAnswer] === rightAnswer) {
        upScore(position, ended)
        return snapCard()
      } else {
        noScore(answers[userAnswer], rightAnswer, score)
        return snapCard()
      }
    }
  }

  render() {
    const { question, rightAnswer, answers } = this.props

    return(
      <View style={styles.questionBox}>
        <Text style={styles.question}>{question}</Text>
        <Text>Choose your option</Text>
        <RkChoiceGroup
          style={{ padding: 10 }}
          onChange={(index) => this.setState({ userAnswer: index })}
          radio>
          {
            answers.map((option, index) => (
              <TouchableOpacity key={`option-${index}`} choiceTrigger>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <RkChoice style={{ margin: 10 }} rkType='radio' />
                  <Text>{option}</Text>
                </View>
              </TouchableOpacity>
            ))
          }
        </RkChoiceGroup>
        <RkButton
              style={[styles.blockButton, { backgroundColor: 'green' }]}
              onPress={() => this.validateAnswer()}>
              <Text style={styles.actions}>{'Answer!! :)'}</Text>
        </RkButton>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  questionBox: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 300,
    height: 350,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: 'rgba(0,0,0,0.25)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  question: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: 'bold'
  },
  blockButton: {
    marginBottom: 15,
    padding: 20,
  },
  actions: {
    color: 'white'
  }
})

export default Question
