import React, { PureComponent } from 'react'
import {
  AsyncStorage,
  Animated,
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import Carousel from 'react-native-snap-carousel'

import Question from '../../shared/Question'
import { MAIN_BG } from '../../../config/colors'
import {
  CAROUSEL_HEIGHT,
  EXIT_QUIZ, FINISH_QUIZ,
  WRONG_ANSWER,
  RIGHT_ANSWER
} from '../../../config/constants'

const { width, height } = Dimensions.get('window')

class Quiz extends PureComponent {
  state = {
    score: 0,
    step: 1,
    ended: false,
    genius: null,
    userAnswer: '',
    newColor: new Animated.Value(0)
  }

  componentWillMount = () => {
    const { navigation = {} } = this.props
    const { params = {}, name } = navigation.state
    const { questions = [] } = params

    // hijack to one question decks :P
    if (questions.length === 1) this.setState({ ended: true })
  }

  snapCard = (callback = () => { }, ended) => {
    const { score } = this.state
    const quizSize = this._carousel._getCustomDataLength() - 1
    const step = this._carousel._activeItem
    userSteps = this.state.step
    this.setState({
      step: (typeof userSteps !== 'string' && userSteps !== quizSize) 
        ? userSteps + 1 : 'FINAL QUESTION',
      ended: typeof userSteps !== 'string'
    })

    callback()
    this._carousel.snapToNext()
  }

  upScore = () => {
    const quizSize = this._carousel._getCustomDataLength() - 1
    const step = this._carousel._activeItem
    const { score } = this.state
    const localScore = score + 1

    if (step === quizSize) {
      this.setState({ score: localScore, ended: true })
      return alert(FINISH_QUIZ(localScore, quizSize))
    }
    
    this.setState({ score: localScore })

  }

  noScore = () => {
    const quizSize = this._carousel._getCustomDataLength() - 1
    const step = this._carousel._activeItem
    const { score } = this.state

    if (step === quizSize) {
      this.setState({ ended: true })
      return alert(FINISH_QUIZ(score, quizSize))
    }
  }

  getQuestionsCount = (step) => {
    const { navigation = {} } = this.props
    const { params = {} } = navigation.state
    const { questions = [] } = params
    const { ended } = this.state

    return typeof step === 'string'
      ? step : `question ${step} of ${questions.length} ${questions.length > 1 ? 'questions' : 'question'}`
  }

  renderCarouselItem = ({ item, index }) => {
    const { score } = this.state
    const quizSize = this._carousel._getCustomDataLength() - 1
    const { navigation = {} } = this.props
    const { params = {}, name } = navigation.state
    const { questions = [] } = params

    return (
      <Question
        {...this.state}
        {...item}
        key={index}
        position={index}
        snapCard={this.snapCard}
        upScore={this.upScore}
        noScore={this.noScore}
        quizSize={quizSize}
        questions={questions}
        navigation={navigation}
        name={name}
        score={score}
      />
    )
  }

  render() {
    const { navigation = {} } = this.props
    const { params = {} } = navigation.state
    const { questions = [], name } = params
    const { ended, score, step } = this.state

    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.actions}>{`Answering ${this.getQuestionsCount(step)}`}</Text>
        </View>
        <View style={styles.carouselRow}>
          <Carousel
            ref={(carousel) => { this._carousel = carousel }}
            data={questions}
            renderItem={this.renderCarouselItem}
            sliderWidth={width}
            itemWidth={300}
            customAnimationType='timing'
            inactiveSlideScale={0.8}
          />
        </View>
        {ended &&
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity
              style={[styles.blockButton, { backgroundColor: 'green' }]}
              onPress={() => navigation.navigate('Quiz', { questions, name: `${name}` })}
            >
              <Text style={styles.actions}>{'Restart Quiz'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.blockButton, { backgroundColor: 'purple' }]}
              onPress={() => navigation.navigate('Home')}
            >
              <Text style={styles.actions}>{EXIT_QUIZ}</Text>
            </TouchableOpacity>
          </View>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: MAIN_BG,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height,
  },
  carouselRow: {
    display: 'flex',
    height: 350,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50
  },
  blockButton: {
    margin: 5,
    padding: 20,
  },
  actions: {
    color: 'white'
  },
})

export default Quiz
