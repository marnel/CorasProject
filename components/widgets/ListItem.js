import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import Swipeout from 'react-native-swipeout'
import moment from 'moment'
import { Icon } from 'react-native-elements'


export default class ListItem extends React.Component {

    constructor(){
        super()
 
    }

    render(){
        // Buttons
        var swipeoutBtns = [
            {
                component: new ImageButton('done', 'green'),
                onPress: this.btnCompleteClick,
                backgroundColor: '#eaebed'
            },
            {
                component: new ImageButton('mode-edit', 'orange'),
                backgroundColor: '#eaebed'
            },
            {
                component: new ImageButton('delete'),
                backgroundColor: '#eaebed',
            }
        ]
        return (
            <Swipeout right={swipeoutBtns} backgroundColor="white">
                <View style={styles.listItemContainer}>
                    <View style={styles.taskTitleContainer}>
                        <Text style={styles.taskTitle}>{this.props.item.Title}</Text>
                        <View style={{alignItems: 'flex-end', flex: 1, paddingRight: 5, paddingTop: 5}}>
                            <View style={{width:40, height: 40, backgroundColor: '#1aaf5d', borderRadius: 20, alignItems: 'center', justifyContent: 'center'}}><Text style={{color: 'white', fontSize: 20}}>M</Text></View>
                        </View>
                    </View>
                    <View style={styles.dateContainer}>
                        <Text style={{paddingLeft:15, paddingBottom: 5, color: 'grey', fontSize: 12, alignSelf: 'flex-end'}}>{this.props.item.Project.Title}</Text>
                        <View style={{flex: 1, alignItems: 'flex-end', paddingRight: 10}}>
                            <Text style={{color: 'coral', paddingBottom: 5, fontSize: 12}}>{this._getDateString(this.props.item.EndDate)}</Text>
                        </View>
                    </View>
                </View>
            </Swipeout>
        )
    }

    btnCompleteClick =() => {
       // alert(this.props.item.Project.Title)
       //alert(this.props.token)
        this.props.item.TaskStatusR_1508195821838 = 'Completed'
        this._markItemComplete(this.props.item)
        //alert(JSON.stringify(this.props.item.Project.Title))
        //alert(this.props.item.Title + ' ' + this.props.item.Id)
    }

    _getDateString = (date) => {
        const d = moment(date)
        if (d.isAfter(new Date(1900, 1, 1))){
            return 'due ' + moment(d).format('MM/DD/YYYY')
        }
        return ''
    }

    _markItemComplete = (item) => {
        console.log(item)
        let self = this;
        fetch('https://dev.coras.com/odata/Connections(\'E3CC8646-243C-4D95-BD84-67224112411D\')/Lists(\'5a4cbf9b-1996-4ace-9a00-51115b6c6e87\')/ListItems(\'' + item.Id + '\')',{
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;odata',
            'AppId': 'cd57ab8b-e226-44fb-89d9-c7eb571ae864',
            'Authorization': 'Bearer ' + this.props.token,
            'IF-Match': '*'
        },
        body: JSON.stringify(item)
        
        })
        .then((response) => response.json())
        .then((responseJson) => {
            alert(JSON.stringify(responseJson))
        })
        .catch((error) => {
            console.error(error);
        })
        .done(() => {
            
        })
    }
}

const ImageButton = (btn, color = 'black') => {
    return (
        <View style={{flex: 1, justifyContent: 'center'}}>
            <Icon name={btn} color={color} />
        </View>
    )
}

const styles = StyleSheet.create({
    listItemContainer: {
        height: 75,
        flex: 1,
    },
    taskTitleContainer: {
        flexDirection: 'row',
        flex: 1,
    },
    dateContainer: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'flex-end'
    },
    taskTitle: {
        fontSize: 16,
        paddingLeft: 10,
        paddingTop: 15,
        flex: 1,

    }
})