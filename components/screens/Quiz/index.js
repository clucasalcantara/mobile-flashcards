import React, { PureComponent } from 'react'
import { Animated, View, Text, Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import Carousel from 'react-native-snap-carousel'

import Question from '../../shared/Question'
import { MAIN_BG } from '../../../config/colors'
import { CAROUSEL_HEIGHT, EXIT_QUIZ } from '../../../config/constants'

const { width, height } = Dimensions.get('window')

class Quiz extends PureComponent {
  state = {
    ended: false,
    genius: null,
    userAnswer: '',
    newColor: new Animated.Value(0)
  }

  validateAnswer = () => {
    const { animatedColor, userAnswer } = this.state
    const { answer } = this.props
    if (userAnswer === answer) {
      return alert(RIGHT_ANSWER)
    }

    alert(WRONG_ANSWER(userAnswer, answer))

    this.setState({
      genius: false,
    })
    return this.wrongAnswer()
  }

  renderCarouselItem = ({ item, index }) => {
    // const navigateToDeck = () => navigation.navigate('Detail', { ...decks[index], UID: index })

    return (
      <Question
        {...this.state}
        {...item}
        key={index}
        onPress={() => {}}
      />
    )
  }

  render() {
    const { navigation = {} } = this.props
    const { params = {} } = navigation.state
    const { questions = [] } = params
    const { ended } = this.state

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
