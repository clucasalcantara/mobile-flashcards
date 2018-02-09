import React, { Component } from 'react'
import { AsyncStorage, View, StatusBar } from 'react-native'
import { Notifications, Permissions, Constants } from 'expo'
import moment from 'moment'

import { MainNavigator } from './config/navigation'

export default class App extends Component {
  async componentDidMount() {
    let result = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (Constants.isDevice && result.status === 'granted') {
      console.log('Notification permissions granted.')
    }
    Notifications.addListener(this._handleNotification)
  }

  scheduleNotification = async () => {
    const finished = !!await AsyncStorage.getItem('finishedQuiz')
    const localNotification = {
      title: 'Hey! Come back to study!',
      body: 'We are missing you, please come back soon :(',
      data: { type: 'delayed' }
    }
    
    const schedulingOptions = {
      time: (new Date()).getTime(),
      repeat: 'day'
    }

    if (!finished) {
      console.log('Scheduling local notification:', { localNotification, schedulingOptions })

      Notifications.scheduleLocalNotificationAsync(localNotification, schedulingOptions)
        .then(id => console.info(`Local notification scheduled (${id}) at ${moment(schedulingOptions.time).format()}`))
        .catch(err => console.error(err))
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />
        <MainNavigator />
      </View>
    )
  }
}
