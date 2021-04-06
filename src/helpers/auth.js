import { auth } from "../services/firebase";
import firebase from "firebase/app";
   
const usersRef = firebase
.firestore()
.collection('users');

export function signin(email, password) {
    return auth().signInWithEmailAndPassword(email, password);
}

export function signup(email, password) {
  firebase
  .auth().createUserWithEmailAndPassword(email, password)
  .then(function(userCredentials) {
    usersRef
      .doc(`${userCredentials.user.uid}`)
      .set({
        // Set these up at a later date
        // firstName: values.firstName,
        // lastName: values.lastName,
        username: userCredentials.user.email.split("@")[0],
        uid: userCredentials.user.uid,
        photoURL: "https://kreceo.sfo2.digitaloceanspaces.com/ChatApp/ChatApp/default-profile-image.jpg",
      })
    })
}

export function signInWithGoogle() {
  const provider = new auth.GoogleAuthProvider();
  return auth().signInWithPopup(provider)
  .then(function(userCredentials) {
    usersRef
      .doc(`${userCredentials.user.uid}`)
      .set({
        // Set these up at a later date
        // firstName: values.firstName,
        // lastName: values.lastName,
        username: userCredentials.user.email.split("@")[0],
        uid: userCredentials.user.uid,
        photoURL: userCredentials.user.photoURL,
      })
    })
}

export function signInWithGitHub() {
    const provider = new auth.GithubAuthProvider();
    return auth().signInWithPopup(provider);
}

