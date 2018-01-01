import React from 'react';
import { Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity, AsyncStorage, StyleSheet, ActivityIndicator, Keyboard } from 'react-native';

export default class Login extends React.Component {
      
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            animating: false,
        }
    }

    componentDidMount() {
        this._loadInitialstate().done();
    }

    _loadInitialstate = async () => {
        var value = await AsyncStorage.getItem('user')
        if (value !== null){
            this.props.navigation.navigate('Profile')
        }
    }
    
    render() {
        return (
        <KeyboardAvoidingView behavior='padding' style={styles.wrapper}>
            <View style={styles.container}>
                <Text style={styles.header}> - LOGIN - </Text>
                <TextInput style={styles.textInput} placeholder='Username'
                        onChangeText={(username) => this.setState({username})}
                        underlineColorAndroid='transparent'
                        editable={!this.state.animating}
                />
                <TextInput style={styles.textInput} placeholder='Password'
                        onChangeText={(password) => this.setState({password})}
                        underlineColorAndroid='transparent'
                        editable={!this.state.animating}
                />
              
                <View style={styles.activityIndicator}>
                {  this.state.animating ?  <ActivityIndicator style={{padding: 20}} size = 'large' color = 'black'/> : null  }
                </View>
 
                <TouchableOpacity style={styles.btn} onPress={this.login} disabled={this.state.animating}>
                    <Text>Log in</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
  }

  login = () => {
      var self = this;
      this.setState({animating: true})
      Keyboard.dismiss()
      fetch('https://dev.coras.com/OAuth/Token',{
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: 'username=' + this.state.username + '&password=' + this.state.password + '&grant_type=password'
      })
      .then((response) => response.json())
      .then((res) => {
          if (res.error){
              alert('Invalid Login!!')
          }
          else {
            self.props.navigation.navigate('Profile', { access_token: res.access_token })
          } 
          self.setState({animating: false})
      })
      .done()
  }
}

const styles = StyleSheet.create({
    wrapper: {
       flex: 1, 
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2896d3',
        paddingLeft: 40,
        paddingRight: 40,
    },
    header: {
        fontSize: 24,
        marginBottom: 60,
        color: '#fff',
    },
    textInput: {
        alignSelf: 'stretch',
        padding: 16,
        marginBottom: 20,
        backgroundColor: '#fff',
    },
    btn: {
        alignSelf: 'stretch',
        backgroundColor: '#01c853',
        padding: 20,
        alignItems: 'center',
    },
    activityIndicator: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
     }
})

