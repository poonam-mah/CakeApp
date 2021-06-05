import React from 'react';
import {View,StatusBar} from 'react-native';
import Form from './components/registration';
import firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyBtM1Q0dqAm4F2lc1YV36v52mrJZO6L5Qk",
  authDomain: "cakeapp-fe596.firebaseapp.com",
  projectId: "cakeapp-fe596",
  storageBucket: "cakeapp-fe596.appspot.com",
  messagingSenderId: "829929256610",
  appId: "1:829929256610:web:508f9218e0171791fc89fb"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default function App() {
  return (
    <View style={{flex:1}}>
      <StatusBar/>
      <Form/>
    </View>
  );
}