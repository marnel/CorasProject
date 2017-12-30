import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import ListItem  from '../widgets/ListItem'

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
    <View style={styles.appContainer} >
        
        <View style={styles.containerHeader}>
            <Text style={styles.headerText}> - Project Lists - </Text>
        </View>

        <View style={styles.listContainer}>
            <FlatList style={{ backgroundColor: 'white'}}
            data={this.state.dataSource}
            renderItem={({item}) => <ListItem item={item} /> }
            keyExtractor={(item, index) => item.Id}
            ItemSeparatorComponent={this.renderSeparator}
            />
        </View>
       
        <View style={styles.containerBtn}>
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
    fetch('https://dev.coras.com/odata/Connections(\'E3CC8646-243C-4D95-BD84-67224112411D\')/Lists(\'5a4cbf9b-1996-4ace-9a00-51115b6c6e87\')/ListItems?%24top=25000&%24orderby=Title&%24filter=AssignedTo%2Fany(s%3A+s%2FId+eq+%27dd836a5c-5fef-4a97-8e1d-7734a59ebddb%27)&%24count=true',{
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
    appContainer: {
       flex: 1, 
       backgroundColor: 'white',
       alignSelf: 'stretch',
    },
    containerHeader: {
        alignItems: 'center',
        height: 90,
        justifyContent: 'flex-end',
        paddingBottom: 15,
    },
    headerText: {
        fontSize: 24,
        color: 'black',
    },
    listContainer: {
        flex: 6,
    },
    containerBtn: {
        flex: 0,
        justifyContent: 'flex-end'
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

