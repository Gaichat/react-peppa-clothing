import firebase from "firebase/app";
import  'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDgDzMl9libjW5-P1D_PUYBsMriBPQozF8",
    authDomain: "peppa-clothing.firebaseapp.com",
    databaseURL: "https://peppa-clothing.firebaseio.com",
    projectId: "peppa-clothing",
    storageBucket: "peppa-clothing.appspot.com",
    messagingSenderId: "319771795824",
    appId: "1:319771795824:web:86bec5a56c555792d3afb5"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    //if there is no userAuth
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists){
        const {displayName, email} = userAuth;
        const createdAt = new Date();
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData}
            );
        }catch (error){
            console.log('error creating user', error.message());
        }
    }
    return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});
export  const SignInWithGoogle = () => auth.signInWithPopup(provider);
