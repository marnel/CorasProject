import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet, FlatList } from 'react-native'

export default class Profile extends React.Component {
  
    constructor() {
        super();
       
        this.state = {
            dataSource:  [{Title: '', Id: 0}]
        }
    }

    componentDidMount() {
        this.getAppLists();
    }
    
    render() {
    return (
    <View style={styles.wrapper} >
        
        <View style={styles.containerHeader}>
            <Text style={styles.header}> - Project Lists - </Text>
        </View>

        <View style={styles.listContainer}>
            <FlatList style={{ backgroundColor: 'white'}}
            data={this.state.dataSource}
            renderItem={({item}) => <Text style={styles.item}>{item.Title}</Text>}
            keyExtractor={(item, index) => item.Id}
            ItemSeparatorComponent={this.renderSeparator}
            />
        </View>
       
        <View style={styles.container}>
            <TouchableOpacity style={styles.btn} onPress={this.logout}>
                <Text>Log Out</Text>
            </TouchableOpacity>
        </View>
    </View>
    )
  }

  logout = () => {
      this.props.navigation.navigate('Home')
  }

  getAppLists = () => {
    let self = this;
    fetch('https://dev.coras.com/odata/Connections(\'E3CC8646-243C-4D95-BD84-67224112411D\')/Lists?$orderby=Title&$select=Title,+Id',{
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;odata',
            'AppId': 'cd57ab8b-e226-44fb-89d9-c7eb571ae864',
            'Authorization': 'Bearer ' + this.props.navigation.state.params.access_token
        },
        
    })
    .then((response) => response.json())
    .then((responseJson) => {
        console.log(responseJson)
        self.setState({
          //isLoading: false,
          dataSource: responseJson.value,
        }, function() {
          // do something with new state
        });
      })
      .catch((error) => {
        console.error(error);
      })
    .done(() => {
        
    })
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          backgroundColor: "#CED0CE",
        }}
      />
    );
  };
}

const styles = StyleSheet.create({
    wrapper: {
       flex: 1, 
       flexDirection: 'column',
       flexWrap: 'wrap',
       backgroundColor: 'white',
       alignContent: 'center'
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        paddingLeft: 40,
        paddingRight: 40,
        alignContent: 'center',
        paddingTop: 15
 
    },
    containerHeader: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        paddingLeft: 40,
        paddingRight: 40,
        alignItems: 'center',
        top: 40
    },
    listContainer: {
        flex: 5,
        flexDirection: 'column',
        backgroundColor: '#fff',
        alignSelf: 'stretch',
    },
    header: {
        fontSize: 24,
        marginBottom: 60,
        color: 'black',
    },
    btn: {
        alignSelf: 'stretch',
        backgroundColor: '#01c853',
        padding: 20,
        alignItems: 'center',
    },
    item: {
        fontSize: 21,
        height: 50,
        paddingLeft: 20,
        paddingTop: 10
    }
})

