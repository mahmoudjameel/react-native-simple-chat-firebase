import firebase from "firebase";
import { Alert } from "react-native";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyBC2PYXdxJ-nXRoul735D3vX3D83JmaWew",
  authDomain: "tiktokchalling.firebaseapp.com",
  databaseURL: "https://tiktokchalling-default-rtdb.firebaseio.com",
  projectId: "tiktokchalling",
  storageBucket: "tiktokchalling.appspot.com",
  messagingSenderId: "453562272916",
  appId: "1:453562272916:web:1766a2d4bf628bd7523881",
  measurementId: "G-VVFBFGLZPT",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// function for registering user
const registerUser = (email, password, fullName) => {
  console.log("firebase reg method run!");

  //calling firebase method for registering user
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      var userID = userCredential.user.uid;
      // calling firebase method for saving user details
      db.collection("allUsers")
        .add({
          email,
          fullName,
          userID,
        })
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
          Alert.alert(
            "SUCCESS",
            "You are successfully registered",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
              },
              { text: "OK", onPress: () => console.log("OK Pressed") },
            ],
            { cancelable: false }
          );
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
          var errorCode = error.code;
          var errorMessage = error.message;
          Alert.alert(
            "ERROR",
            errorMessage,
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
              },
              { text: "OK", onPress: () => console.log("OK Pressed") },
            ],
            { cancelable: false }
          );
        });
    })
    .catch((error) => {
      var errorMessage = error.message;
      Alert.alert(
        "ERROR",
        errorMessage,
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ],
        { cancelable: false }
      );
    });
};

// function for signing in user
const signInUser = (email, password) => {
  console.log("Signin user");
  // calling firebase method for signing in user
  return firebase.auth().signInWithEmailAndPassword(email, password);
};

// function for saving user's message
const saveUserMessage = (userMsg, userID) => {
  db.collection("allUsersMessage")
    .add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      userMsg,
      userID,
    })
    .then((res) => {
      console.log(`user msg sent!`);
    })
    .catch((error) => {
      console.log(`error => ${error}`);
    });
};

// function for signing out
const signOutUser = () => {
  // calling sign out firebase method
  return auth.signOut();
};

// function for calling all users data
const getAllUsersData = () => {
  return new Promise((resolve, reject) => {
    db.collection("allUsers")
      .get()
      .then((snapshot) => {
        var arr = [];
        snapshot.forEach((doc) => {
          arr.push({ ...doc.data() });
          resolve(arr);
        });
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// function for calling  current user data
const getCurrentUserData = (userID) => {
  return new Promise((resolve, reject) => {
    db.collection("allUsers")
      .get()
      .then((snapshot) => {
        var arr = [];
        snapshot.forEach((doc) => {
          console.log(`all docs == ${doc}`);
          arr.push({ ...doc.data() });
          resolve(arr);
        });
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// function for calling all users message
const getAllMsgs = () => {
  return new Promise((resolve, reject) => {
    db.collection("allUsersMessage")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        var arr = [];
        snapshot.forEach((doc) => {
          arr.push({ ...doc.data() });
          resolve(arr);
        });
      });
  });
};

export {
  registerUser,
  signInUser,
  auth,
  saveUserMessage,
  signOutUser,
  getAllUsersData,
  getAllMsgs,
  getCurrentUserData,
  db,
};
