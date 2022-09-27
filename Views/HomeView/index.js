import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import * as Font from "expo-font";
import { useFonts } from "expo-font";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPaperPlane, faUserAlt } from "@fortawesome/free-solid-svg-icons";
import {
  saveUserMessage,
  getAllUsersData,
  getAllMsgs,
  db,
} from "../../Config/firebase";
import { auth } from "../../Config/firebase";

export default function HomeView({ navigation }) {
  // this const will return boolean value
  const [loaded] = useFonts({
    Nunito: require("../../assets/fonts/Nunito-Bold.ttf"),
  });

  const [allUsersMsg, setAllUsersMsg] = useState([]);
  const [currentUserDetails, setCurrentUserDetails] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [forUpdating, setForUpdating] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      user ? setCurrentUserDetails(user) : setCurrentUserDetails(false);
    });
    db.collection("allUsersMessage")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        setAllUsersMsg(snapshot.docs.map((doc) => doc.data()));
      });
    getAllUsersData()
      .then((res) => {
        setAllUsers(res);
      })
      .catch((error) => {
        Alert.alert(
          "ERROR",
          error.message,
          [
            {
              text: "Cancel",
              style: "cancel",
            },
            { text: "OK" },
          ],
          { cancelable: false }
        );
      });

    // getAllMsgs()
    //     .then(res => { setAllUsersMsg(res) })
    //     .catch(error => {
    //         Alert.alert(
    //             "ERROR",
    //             error.message,
    //             [
    //                 {
    //                     text: "Cancel",
    //                     style: "cancel"
    //                 },
    //                 { text: "OK" }
    //             ],
    //             { cancelable: false }
    //         );
    //     })
  }, []);

  // getting user input message on change text
  const [userInputMessage, setUserInputMessage] = useState("");

  // saving user message
  const savingUserMessage = () => {
    saveUserMessage(userInputMessage, currentUserDetails.uid);
    setUserInputMessage("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.heading}>Chat With Friends </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("profileview", {
                userID: currentUserDetails.uid,
              });
            }}
          >
            <FontAwesomeIcon
              icon={faUserAlt}
              size={25}
              style={{ color: "#fff", margin: 10 }}
            />
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}
        >
          {allUsers.map((users) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("profileview", {
                    userID: users.userID,
                  });
                }}
                style={styles.box}
              >
                <Text style={styles.para}>{users.fullName.charAt(0)}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <Text style={styles.para}> . All Messages</Text>
      </View>
      <ScrollView style={styles.scroll}>
        <View style={styles.allMsgsContainer}>
          {allUsersMsg.map((msgs) => {
            if (currentUserDetails.uid === msgs.userID) {
              return (
                <View style={styles.mineMsg}>
                  <Text style={styles.para}>{msgs.userMsg}</Text>
                </View>
              );
            } else {
              return (
                <View style={styles.msgContainer}>
                  <View style={styles.avatar}>
                    {allUsers.map((users) => {
                      if (users.userID === msgs.userID) {
                        return (
                          <Text style={styles.para}>
                            {users.fullName.charAt(0)}
                          </Text>
                        );
                      }
                    })}
                  </View>
                  <View style={styles.userMsg}>
                    <Text style={styles.para}>{msgs.userMsg}</Text>
                  </View>
                </View>
              );
            }
          })}
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <TextInput
          style={styles.input}
          value={userInputMessage}
          placeholder="Type your message"
          placeholderTextColor="#8a8b9e"
          onChangeText={(text) => {
            setUserInputMessage(text);
          }}
        ></TextInput>
        <TouchableOpacity
          onPress={() => {
            savingUserMessage();
            setForUpdating("update");
          }}
        >
          <FontAwesomeIcon icon={faPaperPlane} size={25} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#35354c",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    flex: 0.4,
    width: "100%",
    textAlign: "left",
    justifyContent: "center",
    padding: 10,
  },
  scroll: {
    width: "100%",
    backgroundColor: "#fff",
    flex: 7,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  allMsgsContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  msgContainer: {
    width: "100%",
    flexDirection: "row",
  },
  avatar: {
    height: 60,
    width: 60,
    backgroundColor: "#35354c",
    borderRadius: 50,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  userMsg: {
    backgroundColor: "#f5f4f7",
    height: "auto",
    width: "80%",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    margin: 5,
    padding: 10,
  },

  mineMsg: {
    backgroundColor: "#e8eeee",
    height: "auto",
    width: "80%",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 25,
    margin: 5,
    padding: 10,
  },
  heading: {
    fontFamily: "Nunito",
    fontSize: 35,
    color: "#fff",
    textAlign: "center",
    paddingLeft: 20,
  },
  para: {
    fontFamily: "Nunito",
    fontSize: 18,
    color: "#9c9ca9",
  },
  box: {
    height: 80,
    width: 80,
    backgroundColor: "#fff",
    borderRadius: 50,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 50,
    padding: 10,
    // backgroundColor:"#e3e2e7",
    borderRadius: 20,
    fontFamily: "Nunito",
    width: "90%",
  },
  footer: {
    backgroundColor: "#fff",
    width: "100%",
    flex: 0.1,
    padding: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
