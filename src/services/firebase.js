import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
const config = {
    apiKey: "AIzaSyCAALEn5LQbxWUM0aGOBIhXzOgZvR239kg",
    authDomain: "chatty-d512e.firebaseapp.com",
    databaseURL: "https://chatty-d512e-default-rtdb.firebaseio.com/",
    projectId: "chatty-d512e",
  };
  firebase.initializeApp(config);
  export const auth = firebase.auth;
  export const db = firebase.database();
  export const firestore = firebase.firestore;