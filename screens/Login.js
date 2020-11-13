import React from 'react';
import { Text, View, TouchableOpacity, TextInput, Image, StyleSheet, KeyboardAvoidingView, Modal, ScrollView} from 'react-native';
import * as firebase from 'firebase';
import db from '../config.js';

export default class Login extends React.Component{
    constructor(){
        super();
        this.state= {
            email: '',
            password: '',
            FirstName: '',
            LastName: '',
            mobile_no: '',
            address: '',
            username: '',
            password1: '',
            confirmpassword: '',
            isModalVisible: false
        }
    }


    showModal=()=>{
      return(
      <Modal
      animationType="fade"
      transparent={true}
      // visible= {this.state.isModalVisible}
      visible={this.state.isModalVisible}
      >
        <View style={styles.container}>
          <ScrollView style={{width:'100%'}}>
            <KeyboardAvoidingView>
              <Text style={styles.displayText}>Register</Text>
                  {console.log(this.state.isModalVisible)}
              <TextInput
              style={styles.inputBox}
              placeholder={'First Name'}
              maxLength={8}
              onChangeText={(text)=>{
                this.setState({FirstName: text});
              }}/>

              <TextInput
              style={styles.inputBox}
              placeholder={'Last Name'}
              maxLength={10}
              onChangeText={(text)=>{
                this.setState({LastName: text});
              }}/>

               <TextInput
              style={styles.inputBox}
              placeholder={'Mobile Number'}
              maxLength={10}
              onChangeText={(text)=>{
                this.setState({mobile_no: text});
              }}/>

               <TextInput
              style={styles.inputBox}
              placeholder={'address'}
              onChangeText={(text)=>{
                this.setState({address: text});
              }}/>

               <TextInput
              style={styles.inputBox}
              placeholder={'username'}
              onChangeText={(text)=>{
                this.setState({username: text});
              }}/>

               <TextInput
              style={styles.inputBox}
              placeholder={'password'}
              // secureTextEntry= {true}
              onChangeText={(text)=>{
                this.setState({password1: text});
              }}/>    

               <TextInput
              style={styles.inputBox}
              placeholder={'Confirm Password'}
              // secureTextEntry= {true}
              onChangeText={(text)=>{
                this.setState({confirmpassword: text});
              }}/>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </Modal>
      )
    }

    login=async(email,password)=>{
        firebase.auth().signInWithEmailAndPassword(email,password)
        .then(()=>{
          this.props.navigation.navigate('Drawer');
        })

        .catch((error)=>{
            var errorcode = error.code;
            var errormessage = error.message;
            console.log(errormessage);
            return alert(errormessage);
        });
        this.setState({email: '', password: ''});
    }

    signup=async(email,password)=>{
      console.log('enered signup');
      if(this.state.password1 !== this.state.confirmpassword){
        alert('password does not match');
        console.log('signup failed');
      }

      else{
        firebase.auth().createUserWithEmailAndPassword(email,password)
        .then(()=>{
            db.collection('users').add({
              FirstName: this.state.FirstName,
              LastName: this.state.LastName,
              mobile_no: this.state.mobile_no,
              address: this.state.address,
              confirmpassword: this.state.confirmpassword,
              password: this.state.password1,
              username: this.state.username 
            });
        });
        console.log('signup accessed');
        alert('successful signup');
        // this.setState({username: '', password1: '', isModalVisible: false});
      }
    }

    render(){
        return(
            <KeyboardAvoidingView>
                <View style={styles.container}>
                    <Text style={styles.submitButtonText}> Barter System App </Text>
                    <Text style={styles.submitButtonText1}> Login or Signup Here... </Text>
                      {
                        this.showModal()
                      }

                     <TouchableOpacity onPress={()=>{this.signup(this.state.username,this.state.password1)
                    this.setState({isModalVisible: true})}}>
                        <Text style={styles.submitButton}>Signup</Text>
                    </TouchableOpacity>         

                      <TouchableOpacity onPress={()=>{this.setState({isModalVisible: false})}}>
                        <Text style={styles.submitButton1}>Cancel</Text>
                    </TouchableOpacity>                                  

                    <Text style={styles.submitButtonText}>Login</Text>

                    <View style={styles.container}>
                    <TextInput style={styles.inputBox}
                    placeholder='abc@example.com'
                    keyboardType= 'email-address'
                    onChangeText={(text)=>{this.setState({email: text})}}
                    value=  {this.state.email}/>

                    <TextInput style={styles.inputBox}
                    placeholder='password'
                    secureTextEntry={true}
                    onChangeText={(text)=>{this.setState({password: text})}}
                    value={this.state.password}/>
                    </View>

                    <TouchableOpacity onPress={()=>{this.login(this.state.email,this.state.password)}}>
                        <Text style={styles.submitButton}>Log In</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      alignContent: 'center',
      margin: 10
    },
    displayText:{
      fontSize: 15,
      textDecorationLine: 'underline',
      textAlign: 'center',
      color: 'red',
      fontFamily: 'BOLD',
      fontSize: 25,
      margin: 15
    },
    scanButton:{
      backgroundColor: '#2196F3',
      padding: 10,
      margin: 10
    },
    buttonText:{
      fontSize: 15,
      textAlign: 'center',
      marginTop: 10
    },
    inputView:{
      flexDirection: 'row',
      margin: 20
    },
    inputBox:{
      width: 200,
      height: 40,
      borderWidth: 1.5,
      fontSize: 20,
      margin: 5
    },
    scanButton:{
      backgroundColor: '#66BB6A',
      width: 50,
      borderWidth: 1.5,
      borderLeftWidth: 0
    },
    submitButton:{
      backgroundColor: '#FBC02D',
      width: 80,
      height:50,
      margin :5,
      justifyContent: 'center',
      textAlign: 'center'
    },
    submitButton1:{
      backgroundColor: '#ff0000',
      width: 80,
      height:50,
      margin :5,
      justifyContent: 'center',
      textAlign: 'center'
    },
    submitButtonText:{
      padding: 10,
      textAlign: 'center',
      fontSize: 20,
      fontWeight:"bold",
      color: '#ff0000'
    },
    transactionAlert:{
      margin:10,
      color: 'red'
    },
    submitButtonText1:{
      padding: 10,
      textAlign: 'center',
      fontSize: 20,
      fontWeight:"bold",
      color: '#00ff00',
      margin: 5
    },
  });