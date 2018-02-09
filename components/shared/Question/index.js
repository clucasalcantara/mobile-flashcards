import React, { Component } from 'react'
import { Text, TextInput, View, StyleSheet, TouchableOpacity, Animated } from 'react-native'
import { NavigationActions } from 'react-navigation'

import { RIGHT_ANSWER, WRONG_ANSWER, FINISH_QUIZ} from '../../../config/constants'


class Question extends Component {
  state = {
    genius: null,
    userAnswer: '',
    newColor: new Animated.Value(0)
  }

  validateAnswer = () => {
    const { animatedColor, userAnswer } = this.state
    const { 
      answer, 
      upScore, 
      snapCard,
      position,
      quizSize,
      score,
      navigation,
      questions,
      name,
    } = this.props
    const ended = quizSize === position
    
    if (!ended) {
      if (userAnswer === answer) {
        upScore(position)
        return snapCard(alert(RIGHT_ANSWER))
      } else {
        this.setState({
          genius: false,
        })
        this.wrongAnswer()
        return snapCard(alert(WRONG_ANSWER(userAnswer, answer)))
      }      
    } else {
      if (userAnswer === answer) {
        upScore(position)
        return snapCard(alert(RIGHT_ANSWER))
      } else {
        this.setState({
          genius: false,
        })
        this.wrongAnswer()
        alert(WRONG_ANSWER(userAnswer, answer))
        alert(FINISH_QUIZ(score, quizSize))
      }      
    }    

    return FINISH_QUIZ(score, quizSize)
  }

  wrongAnswer = () => {
    const { newColor, snapCard, quizSize, score, position } = this.props
    
    if ((quizSize === position) || (quizSize < position)) return FINISH_QUIZ(score, quizSize)

    Animated.sequence([
      Animated.timing(newColor, {
        delay: 500,
        duration: 500,
        toValue: 1
      }),
      Animated.timing(newColor, {
        delay: 1500,
        duration: 500,
        toValue: 0
      })
    ]).start()
  }

  render() {
    console.log(this.props)
    const { question, answer, userAnswer = '', newColor } = this.props
    const AnimatedButton = Animated.createAnimatedComponent(TouchableOpacity)
    
    const backgroundColor = newColor.interpolate({
      inputRange: [0, 1],
      outputRange: ['white', 'darkred']
    })

    const textColor = newColor.interpolate({
      inputRange: [0, 1],
      outputRange: ['black', 'white']
    })
    
    return(
      <Animated.View style={[styles.questionBox, { backgroundColor }]}>
        <Animated.Text style={[styles.question, { color: textColor }]}>{question}</Animated.Text>
        <TextInput
          style={{
            height: 40,
            width: 280,
            borderColor: 'gray',
            borderWidth: 1,
            paddingLeft: 10
          }}
          onChangeText={(answer) => this.setState({ userAnswer: answer })}
          placeholder='Type your answer'
        />
        <AnimatedButton
          style={[styles.blockButton, { backgroundColor: 'green' }]}
          onPress={() => this.validateAnswer()}
        >
          <Text style={styles.actions}>{'Answer!'}</Text>
        </AnimatedButton>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  questionBox: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 300,
    height: 180,
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