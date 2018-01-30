import React, { Component } from 'react'
import {
  AsyncStorage,
  StyleSheet,
  Dimensions, 
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'
import Carousel from 'react-native-snap-carousel'

import Deck from '../../shared/Deck'
import { MAIN_BG } from '../../../config/colors'
import { APP_LOGO } from '../../../config/images'
import { APP_HEADLINE, APP_SUBHEADLINE, CAROUSEL_HEIGHT, SEED_CARDS } from '../../../config/constants'

const { width, height } = Dimensions.get('window')

export default class Home extends Component {
  static navigationOptions = {
    title: 'Rockstar Quiz',
  }

  state = { decks: [] }

  componentWillMount = async () => {
    // Seed the app always with the demo quiz
    const filledDeck = JSON.stringify(SEED_CARDS)
    const storageDecks = await AsyncStorage.getItem('myDecks')
    const decks = JSON.parse(storageDecks)

    if (!decks || typeof decks !== 'object') {
      AsyncStorage.setItem('myDecks', filledDeck)
    }

    AsyncStorage.getItem('myDecks')
      .then(decks => {
        this.setState({ decks: JSON.parse(decks) })
      })
  }

  renderCarouselItem = ({ item, index }) => {
    const { navigation } = this.props
    const { decks } = this.state
    
    const navigateToDeck = () => navigation.navigate('Detail', { ...decks[index], UID: index })

    return (
      <Deck
        {...item}
        key={index}
        onPress={navigateToDeck}
        />
    )
  }

  render() {
    const { decks = [] } = this.state
    
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            resizeMode='contain'
            style={{
              width: 300,
              height: 120,
            }}
            source={{ uri: APP_LOGO }} 
          />
          <Text style={{ marginTop: 8, color: 'white', fontSize: 16 }}>
            {APP_HEADLINE}
          </Text>
        </View>
        <View style={styles.carouselRow}>
          {decks && decks.length == 0 && <ActivityIndicator size={1} />}
          {decks && <Carousel
            ref={(carousel) => { this._carousel = carousel }}
            data={decks}
            renderItem={this.renderCarouselItem}
            sliderWidth={width}
            itemWidth={300}
            customAnimationType='timing'
            inactiveSlideScale={0.8}
          />}
        </View>
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
  header: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  carouselRow: {
    display: 'flex',
    height: CAROUSEL_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50
  },
})
