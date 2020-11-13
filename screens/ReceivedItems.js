import React,{Component} from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert} from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader';

export default class ReceivedItems extends Component{
    constructor(){
        super();
        this.state={
            userId: firebase.auth().currentUser.email,
            allReceivedItems: ''
        }
    }

getReceivedItems=async()=>{
    db.collection('all_receivedItems').where("Item Got To",'==',this.state.userId).get()
    .then(snapshot=>{
        snapshot.forEach(doc=>{
            this.setState({
                allReceivedItems: doc.data()
            })
        })
    })
}

keyExtractor = (item, index) => index.toString()

renderItem = ( {item, i} ) =>(
  <ListItem
    key={i}
    title={item.ItemName}
    subtitle={"Received From :" + item.ReceivedFrom }
    leftElement={<Icon name="home" type="font-awesome" color ='#696969'/>}
    titleStyle={{ color: 'black', fontWeight: 'bold' }}
    bottomDivider
  />
)

componentDidMount(){
    this.getReceivedItems();
}

render(){
    return(
        <View style={styles.container}>
            <View style={{flex:0.1}}>
              <MyHeader title={"Received Items"} navigation={this.props.navigation}/>
            </View>
        <FlatList
        keyExtractor={this.keyExtractor}
        data={this.state.allReceivedItems}
        renderItem={this.renderItem}
        />
        </View>
    );
}
}

const styles = StyleSheet.create({
    container:{
     flex:1,
     backgroundColor:'#F8BE85',
     alignItems: 'center',
     justifyContent: 'center'
   },
})