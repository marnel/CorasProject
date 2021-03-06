import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator, ToolbarAndroid } from 'react-native'
import ListItem  from '../widgets/ListItem'
import { Icon } from 'react-native-elements'
import { observer, inject } from 'mobx-react'
import Icon2 from 'react-native-vector-icons/FontAwesome'
import _ from 'lodash'


class Profile extends React.Component {
  
    constructor() {
        super();
       
        this.state = {
            dataSource: null,
            isAnimating: false,
        }
    }

    componentDidMount() {
        this.getAppLists();
    }
    
    render() {
    
    if (this.props.store.itemsDS !== null){
        return (
        <View style={styles.appContainer} >

            <View style={styles.containerHeader}>
                <ToolbarAndroid title={this.props.store.item} 
                                style={{backgroundColor: '#2c97dd', height: 58}} 
                                titleColor="white"
                                actions={[{title: 'Sort: Due Date (ASC)', show: 'never'}, 
                                          {title: 'Sort: Due Date (DESC)', show: 'never'},
                                          {title: 'Sort: Title (ASC)', show: 'never'},
                                          {title: 'Sort: Title (DESC)', show: 'never'}]}
                                onActionSelected={this.onActionSelected} 
                />
            </View>

            <View style={styles.listContainer}>
                <FlatList style={{ backgroundColor: 'white'}}
                data={this.props.store.itemsDS}
                renderItem={({item}) => <ListItem item={item} token={this.props.navigation.state.params.access_token} /> }
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
    else 
    {
        return <ActivityIndicator />
    }
  }

  onActionSelected = (position) => {
    // Sort Due Date ASC
    if (position === 0){
        let newOrder = _.orderBy(this.props.store.itemsDS,['EndDate'],['asc'])
        this.props.store.itemsDS = newOrder
    }
    // Sort Due Date DESC
    if (position === 1){
        let newOrder = _.orderBy(this.props.store.itemsDS,['EndDate'],['desc'])
        this.props.store.itemsDS = newOrder
    }
    // Sort Title ASC
    else if (position === 2){
        let newOrder = _.orderBy(this.props.store.itemsDS,['Title'],['asc'])
        this.props.store.itemsDS = newOrder
    }
    // Sort Title ASC
    else if (position === 3){
        let newOrder = _.orderBy(this.props.store.itemsDS,['Title'],['desc'])
        this.props.store.itemsDS = newOrder
    }
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
        //console.log(responseJson)
        self.setState({
          //isLoading: false,
          dataSource: responseJson.value,
        }, function() {
          // do something with new state
        })
        this.props.store.itemsDS = responseJson.value
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
Profile = inject('store')(observer(Profile))
export default Profile


const styles = StyleSheet.create({
    appContainer: {
       flex: 1, 
       backgroundColor: 'white',
       alignSelf: 'stretch',
    },
    containerHeader: {
        height: 87,
        justifyContent: 'flex-end',
        paddingBottom: 5,
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

