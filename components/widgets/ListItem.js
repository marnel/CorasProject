import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import Swipeout from 'react-native-swipeout'

export default class ListItem extends React.Component {

    constructor(){
        super()
 
    }

    render(){
        // Buttons
        var swipeoutBtns = [
            {
            text: 'Complete',
            onPress: this.btnCompleteClick.bind(this),
            }
        ]
        return (
            <Swipeout right={swipeoutBtns} backgroundColor="white">
                <View>
                    <Text style={styles.item}>{this.props.item.Title}</Text>
                </View>
            </Swipeout>
        )
    }

    btnCompleteClick(){
        alert(this.props.item.Title + ' ' + this.props.item.Id)
    }
}

const styles = StyleSheet.create({
    item: {
        fontSize: 21,
        height: 50,
        paddingLeft: 20,
        paddingTop: 10
    }
})