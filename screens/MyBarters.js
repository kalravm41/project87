import React ,{Component} from 'react'
import {View, Text,TouchableOpacity,ScrollView,FlatList,StyleSheet} from 'react-native';
import {Card,Icon,ListItem} from 'react-native-elements'
import MyHeader from '../components/MyHeader.js'
import firebase from 'firebase';
import db from '../config.js'
import { unstable_renderSubtreeIntoContainer } from 'react-dom';

export default class MyBarters extends Component {
    static navigationOptions = { header: null };

    constructor(){
        super()
        this.state = {
          userId : firebase.auth().currentUser.email,
          allBarters : []
        }
        this.requestRef= null
      }

      getAllDonations =()=>{
        this.requestRef = db.collection("all_donations").where("BarterAcceptId" ,'==', this.state.userId)
        .onSnapshot((snapshot)=>{
          var allDonations = snapshot.docs.map(document => document.data());
          this.setState({
            allDonations : allDonations,
          });
        })
      }

    //   SentBook=()=>{
    //     console.log(this.state.receiverId);
    //     db.collection('all_donations').add({
    //       ItemName         : this.state.bookName,
    //       requestId        : this.state.requestId,
    //       'Barted By'  : this.state.receiverName,
    //       BarterAcceptedBy   : this.state.userId,
    //       BarterStatus     :  "Barted"
    //     })
    //   }

    getNotifications=(bookDetails,requestStatus)=>{
        var requestId = bookDetails.requestId;
        var donorId = bookDetails.BarterAcceptId;
        var BarterStatus = bookDetails.BarterStatus;
        db.collection('all_notifications')
        .where('BarterId','==',requestId)
        .where('donor_id','==',donorId)
        .get()
        .then((snapshot)=>{
          snapshot.forEach((doc)=>{
            var message= requestStatus;
            if(BarterStatus === 'bookSent'){message=donorId+'Sent You The Book'}
            else{message=donorId+'Has Shown Intrest In Donating The Book'}
            db.collection('all_notifications').doc(doc.id).update({
              'message': message,
              'notificationStatus': 'unread',
              'Date': firebase.firestore.FieldValue.serverTimestamp()
            })
          })
        })
      }

    SentBook=(bookDetails)=>{
        if(bookDetails.BarterStatus === 'Barted'){
          var requestStatus= 'BartereInterested';
          db.collection('all_donations').doc(bookDetails.doc.id).update({
            'BarterStatus': 'BartererInterested'
          })
          this.getNotifications(bookDetails,requestStatus)
        }
        else{
         var requestStatus= 'bookSent';
         db.collection('all_donations').doc(bookDetails.doc.id).update({
           'BarterStatus': 'bookSent'
         })
         this.getNotifications(bookDetails,requestStatus)
       }
      }

      keyExtractor = (item, index) => index.toString()

      renderItem = ( {item, i} ) =>(
        <ListItem
          key={i}
          title={item.ItemName}
          subtitle={"Bartered By : " + item.BarterOfferedBy  +"\nStatus : " + item.BarterStatus}
          leftElement={<Icon reverseColor name='book'type="font-awesome" color ='#696969'/>}
          titleStyle={{ color: 'black', fontWeight: 'bold' }}
          rightElement={
              <TouchableOpacity style={styles.button}
              onPress={()=>{this.SentBook(item);}}>
                <Text style={{color:'#ffff'}}>Barter</Text>
              </TouchableOpacity>
            }
          bottomDivider
        />
      )
   
   
      componentDidMount(){
        this.getAllDonations()
      }
   
      componentWillUnmount(){
        this.requestRef();
      }

      render(){
        return(
          <View style={{flex:1}}>
            <MyHeader navigation={this.props.navigation} title="My Barters"/>
            <View style={{flex:1}}>
                  <FlatList
                    keyExtractor={this.keyExtractor}
                    data={this.state.allDonations}
                    renderItem={this.renderItem}
                  />
            </View>
          </View>
        )
      }
}

const styles = StyleSheet.create({
    button:{
      width:100,
      height:30,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:"#ff5722",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 8
       },
      elevation : 16
    },
    subtitle :{
      flex:1,
      fontSize: 20,
      justifyContent:'center',
      alignItems:'center'
    }
  });