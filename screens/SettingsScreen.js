import React,{Component}from 'react';
import {
    View,
    Text,
    TextInput,
    KeyboardAvoidingView,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ScrollView} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import  MyHeader from '../components/MyHeader';


export default class SettingScreen extends Component{
    constructor(){
        super();
        this.state={
            FirstName: '',
            LastName: '',
            Address: '',
            contact: '',
            email: ''
        }
    }

    update=async()=>{
        var user= firebase.auth().currentUser();
        var E_mail= user.username;
        db.collection('users').where('email', '==', 'E_mail').get()
        .then((snapShot)=>{
            snapShot.forEach((doc)=>{
                var data = doc.data();
                this.setState({email: data.email_id,
                FirstName: data.FirstName,
            LastName: data.LastName,
        contact: data.mobile_no,
    Address: data.address})
            })
        }); 
    }
    componentDidMount(){
        this.update();
    }
    render(){
        return(
            <View style={styles.container}>
                <MyHeader title= 'Settings Screen'/>
                <View style={styles.profileContainer}>
                    <TextInput style={styles.loginBox}
                        placeholder={'First Name'}
                        onChangeText={(text)=>{this.setState({FirstName: text})}}
                        value={this.state.FirstName}
                    />
                    <TextInput style={styles.loginBox}
                        placeholder={'Last Name'}
                        onChangeText={(text)=>{this.setState({LastName: text})}}
                        value={this.state.LastName}
                    />
                    <TextInput style={styles.loginBox}
                        placeholder={'Address'}
                        onChangeText={(text)=>{this.setState({Address: text})}}
                        multiline={true}
                        value={this.state.Address}
                    />
                    <TextInput style={styles.loginBox}
                        placeholder={'contact number'}
                        onChangeText={(text)=>{this.setState({contact: text})}}
                        keyboardType='numeric'
                        value={this.state.contact}
                    />
                    <TouchableOpacity style={styles.button} onPress={()=>{this.update}}>
                        <Text style={styles.registerButtonText}>Save</Text>
                    </TouchableOpacity>
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