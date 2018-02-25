import React, { Component } from 'react'
import {
  AsyncStorage,
  Button,
  View,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import { ImagePicker } from 'expo'
import { NavigationActions } from 'react-navigation'

const navigateAction = key => NavigationActions.navigate({
  routeName: 'NewQuestion',
  params: {},
  action: NavigationActions.navigate({ routeName: key })
})

class NewDeck extends Component {
  state = {
    newDeck: {},
    deckImage: null,
  }

  componentWillMount = async () => {
    const storageDecks = await AsyncStorage.getItem('myDecks')
    const appDecks = JSON.parse(storageDecks)
    const newDeckID = appDecks.length + 1
    
    const newDeck = {
      id: newDeckID,
      name: '',
      image: '',
      questions: []
    }

    this.setState({
      appDecks,
      newDeck
    })
    
  }

  setDeckName = (name) => {
    const { newDeck } = this.state
    newDeck.name = name

    this.setState({ newDeck })
  }

  addDeck = async () => {
    const { appDecks, newDeck } = this.state
    const { navigation } = this.props
    try {
      appDecks.push(newDeck)
      await AsyncStorage.setItem('myDecks', JSON.stringify(appDecks))
      navigation.navigate('Detail', { ...newDeck, UID: newDeck.id })
    } catch (error) {
      throw new Error(error)
    }
  }

  setDeckImage = async () => {
    const { newDeck } = this.state
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
    })

    if (!result.cancelled) {
      newDeck.image = result.uri
      this.setState({ deckImage: result.uri })
    }
  }

  render() {
    const { navigation } = this.props
    const { newDeck, deckImage } = this.state

    return (
      <View style={{ padding: 20, flex: 1, justifyContent: 'space-between' }}>
        <View>
          <View>
            <Text>Deck Name: </Text>
            <TextInput
              style={{
                height: 40,
                borderColor: 'gray',
                borderWidth: 1,
                paddingLeft: 10,
              }}
              onChangeText={(name) => this.setDeckName(name)}
              placeholder='Type your deck name'
            />
          </View>
          <View style={{ marginTop: 10 }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Button
                title={deckImage ? "Change image" : "Choose an image"}
                onPress={this.setDeckImage}
              />
            </View>
          </View>
          {deckImage &&
            <Image source={{ uri: deckImage }} style={{ alignSelf: 'center', marginTop: 40, width: 200, height: 200 }} />}
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity
            style={[styles.blockButton, { backgroundColor: 'green' }]}
            onPress={() => this.addDeck()}
          >
            <Text style={styles.actions}>{'Add Deck'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.blockButton, { backgroundColor: 'purple' }]}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.actions}>{'Cancel'}</Text>
          </TouchableOpacity>
        </View>
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

export default NewDeck