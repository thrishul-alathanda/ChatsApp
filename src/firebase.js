import firebase from "firebase/app";
import "firebase/auth";

export const auth = firebase.initializeApp({
    apiKey: "AIzaSyBFt7WexvoZM00LuKO_jVc9dyBAQSU0zr8",
    authDomain: "chatsapp-fc6ba.firebaseapp.com",
    projectId: "chatsapp-fc6ba",
    storageBucket: "chatsapp-fc6ba.appspot.com",
    messagingSenderId: "611846751978",
    appId: "1:611846751978:web:9f4ed3f380bbb8f9c43993"
}).auth();