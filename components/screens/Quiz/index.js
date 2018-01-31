import React, { PureComponent } from 'react'
import { Animated, View, Text, Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import Carousel from 'react-native-snap-carousel'

import Question from '../../shared/Question'
import { MAIN_BG } from '../../../config/colors'
import { CAROUSEL_HEIGHT, EXIT_QUIZ, FINISH_QUIZ, WRONG_ANSWER, RIGHT_ANSWER } from '../../../config/constants'

const { width, height } = Dimensions.get('window')

class Quiz extends PureComponent {
  state = {
    score: 0,
    ended: false,
    genius: null,
    userAnswer: '',
    newColor: new Animated.Value(0)
  }

  snapCard = (callback = () => {}) => {
    const { score } = this.state
    const quizSize = this._carousel._getCustomDataLength() - 1
    const step = this._carousel._activeItem

    if (step === quizSize) {
      AsyncStorage.setItem('finishedQuiz', new Date().getTime())
      return alert(FINISH_QUIZ(score, quizSize))
    }
    
    callback()
    this._carousel.snapToNext()
  }
  
  upScore = () => this.setState({ score: this.state.score + 1 })

  renderCarouselItem = ({ item, index }) => {
    return (
      <Question
        {...this.state}
        {...item}
        key={index}
        onPress={() => {}}
        snapCard={this.snapCard}
        upScore={this.upScore}
      />
    )
  }

  render() {
    const { navigation = {} } = this.props
    const { params = {} } = navigation.state
    const { questions = [] } = params
    const { ended, score } = this.state

    return(
      <View style={styles.container}>
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
              onPress={() => navigation.navigate('Quiz', { questions })}
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
    height: 280,
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
  }
})

export default Quiz
