import React from 'react'
import { StackNavigator } from 'react-navigation'
import { TouchableOpacity, Text } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

import Home from '../components/screens/Home'
import Detail from '../components/screens/Detail'
import NewDeck from '../components/screens/NewDeck'
import Quiz from '../components/screens/Quiz'
import NewQuestion from '../components/screens/NewQuestion'
import AddNewDeck from '../components/shared/AddNewDeck'

const MainNavigator = StackNavigator({
  Home: {
    screen: Home,
    navigationOptions: ({ navigation }) => ({
      headerRight: (
        <AddNewDeck {...navigation} />
      ),
      headerLeft: null
    })
  },
  Detail: {
    screen: Detail,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.name}`,
    })
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.name} Quiz`,
    })
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      title: 'Add new deck',
    }
  },
  NewQuestion: {
    screen: NewQuestion,
    navigationOptions: {
      title: 'Add new question',
    }
  },
  
}, {
  navigationOptions: ({ navigation }) => ({
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: 'darkgreen',
    },
    headerBackTitle: null,
  })
})

export {
  MainNavigator
}