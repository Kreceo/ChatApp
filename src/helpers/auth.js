import { auth } from "../services/firebase";
   
export function signin(email, password) {
    return auth().signInWithEmailAndPassword(email, password);
}

export function signInWithGoogle() {
    const provider = new auth.GoogleAuthProvider();
    return auth().signInWithPopup(provider)
    .then((result) => {
        const user = result.user;
        this.setState({
          user
        });
    });
}

export function signInWithGitHub() {
    const provider = new auth.GithubAuthProvider();
    return auth().signInWithPopup(provider);
}
