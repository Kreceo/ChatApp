import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
const config = {
    apiKey: "AIzaSyCAALEn5LQbxWUM0aGOBIhXzOgZvR239kg",
    authDomain: "chatty-d512e.firebaseapp.com",
    databaseURL: "https://chatty-d512e-default-rtdb.firebaseio.com/"
  };
  firebase.initializeApp(config);
  export const auth = firebase.auth;
  export const db = firebase.database();