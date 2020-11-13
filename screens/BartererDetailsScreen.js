import React,{Component} from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Alert} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader';
import { Card } from 'react-native-elements';

export default class BarterrerDetailsScreen extends Component{
  constructor(props){
    super(props);
    this.state={
        userId: firebase.auth().currentUser.email,
        receiverId: this.props.navigation.getParam('Details')['BartererId'],
        requestId: this.props.navigation.getParam('Details')['BarterId'],
        bookName: this.props.navigation.getParam('Details')['ItemName'],
        requestReason: this.props.navigation.getParam('Details')['ItemDescription'],
        receiverName: '',
        receiverContact: '',
        receiverAddress: '',
        receiverRequestDOCId: ''
    }
}  

getRecieverDetails=()=>{
  db.collection('users').where('username','==',this.state.receiverId).get()
  .then((Snapshot)=>{
      Snapshot.forEach((doc)=>{
          this.setState({
              receiverName: doc.data().FirstName,
              receiverContact: doc.data().mobile_no,
              receiverAddress: doc.data().address
          })
      })
  })

  db.collection('BarterItems').where('BarterId','==',this.state.requestId).get()
  .then((Snapshot)=>{
      Snapshot.forEach((doc)=>{
          this.setState({
              receiverRequestDOCId: doc.data().BarterId
          })
      })
  })
}

componentDidMount(){
  this.getRecieverDetails();
}

updateBookStatus=()=>{
    console.log(this.state.receiverId);
    db.collection('all_donations').add({
      ItemName         : this.state.bookName,
      requestId        : this.state.requestId,
      'BarterOfferedBy'  : this.state.receiverName,
      BarterAcceptId   : this.state.userId,
      BarterStatus     :  "customer Interested"
    })
  }

  addNotification=()=>{
      var message = this.state.userId+ ' has Shown Interest In Exchanging Items';

      db.collection('all_notifications').add({
          "targetedUserId": this.state.receiverId,
          "donor_id": this.state.userId,
          "BarterId": this.state.requestId,
          "itemName": this.state.bookName,
          "Date": firebase.firestore.FieldValue.serverTimestamp(),
          "NotificationStatus": 'unread',
          "Message": message
      })
  }
render(){
  return(
      <View style={styles.container}>
          <MyHeader title={this.state.receiverName+'Details'}/>
          <View style={styles.container}>

              <Card title={'Item Information'} titleStyle={{fontSize: 20}}>
              <Card>
                  <Text style={{fontWeight: 'bold'}}>
                      Name: {this.state.bookName}
                  </Text>
              </Card>
              <Card>
                  <Text style={{fontWeight: 'bold'}}>
                      Item Description: {this.state.requestReason}
                  </Text>
              </Card>
          </Card>

          </View>

          <View style={styles.container}>

              <Card title={'Reciever Information'} titleStyle={{fontSize: 20}}>

                  <Card>
                      <Text style={{fontWeight:'bold'}}>
                          Name: {this.state.receiverName}
                      </Text>
                  </Card>

                  <Card>
                      <Text style={{fontWeight:'bold'}}>
                          Address: {this.state.receiverAddress}
                      </Text>
                  </Card>

                  <Card>
                      <Text style={{fontWeight:'bold'}}>
                          contact: {this.state.receiverContact}
                      </Text>
                  </Card>
              </Card>
          </View>
          
          <View style={styles.container}>
              {this.state.receiverId !== this.state.userId
              ?
              (<TouchableOpacity style={styles.registerButton} onPress={()=>{this.addNotification(); this.updateBookStatus(); this.props.navigation.navigate('MyBarters');}}>
                  <Text style={styles.registerButtonText}> I Want To Barter </Text>
              </TouchableOpacity> ) :
              null
              }
          </View>
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
profileContainer:{
flex:1,
justifyContent:'center',
alignItems:'center',
},
title :{
fontSize:65,
fontWeight:'300',
paddingBottom:30,
color : '#ff3d00'
},
loginBox:{
width: 300,
height: 40,
borderBottomWidth: 1.5,
borderColor : '#ff8a65',
fontSize: 20,
margin:10,
paddingLeft:10
},
KeyboardAvoidingView:{
flex:1,
justifyContent:'center',
alignItems:'center'
},
modalTitle :{
justifyContent:'center',
alignSelf:'center',
fontSize:30,
color:'#ff5722',
margin:50
},
modalContainer:{
flex:1,
borderRadius:20,
justifyContent:'center',
alignItems:'center',
backgroundColor:"#ffff",
marginRight:30,
marginLeft : 30,
marginTop:80,
marginBottom:80,
},
formTextInput:{
width:"75%",
height:35,
alignSelf:'center',
borderColor:'#ffab91',
borderRadius:10,
borderWidth:1,
marginTop:20,
padding:10
},
registerButton:{
width:200,
height:40,
alignItems:'center',
justifyContent:'center',
borderWidth:1,
borderRadius:10,
marginTop:30
},
registerButtonText:{
color:'#ff5722',
fontSize:15,
fontWeight:'bold'
},
cancelButton:{
width:200,
height:30,
justifyContent:'center',
alignItems:'center',
marginTop:5,
},

button:{
width:300,
height:50,
justifyContent:'center',
alignItems:'center',
borderRadius:25,
backgroundColor:"#ff9800",
shadowColor: "#000",
shadowOffset: {
  width: 0,
  height: 8,
},
shadowOpacity: 0.30,
shadowRadius: 10.32,
elevation: 16,
padding: 10
},
buttonText:{
color:'#ffff',
fontWeight:'200',
fontSize:20
}
});