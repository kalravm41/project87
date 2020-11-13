import * as firebase from 'firebase';
require('@firebase/firestore')

var firebaseConfig = {
  apiKey: "AIzaSyDmZO9lmcRjmh6RS03rk9jVdePIDhG8oZ4",
  authDomain: "kalr-a34f0.firebaseapp.com",
  databaseURL: "https://kalr-a34f0.firebaseio.com",
  projectId: "kalr-a34f0",
  storageBucket: "kalr-a34f0.appspot.com",
  messagingSenderId: "905557914016",
  appId: "1:905557914016:web:d92040727b11a149def4c5"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();