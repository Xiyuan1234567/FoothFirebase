import * as fb from "firebase"
const firebase = fb.default
import { Alert } from "react-native"

export async function registration(email, password, displayName) {
  try {
    const userAuth = await firebase.auth().createUserWithEmailAndPassword(email, password)
    const currentUser = userAuth.user
    currentUser.updateProfile({
      displayName,
    })
    const db = firebase.firestore()
    db.collection("users").doc(currentUser.uid).set({
      email: currentUser.email,
      displayName: displayName,
      favorites: []
    })
    var success = true
  } catch (err) {
    success = false
    Alert.alert("There is something wrong", err.message)
  } finally {
    return success
  }
}

export async function signIn(email, password) {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password)
    var success = true
  } catch (err) {
    Alert.alert("There is something wrong!", err.message)
    success = false
  } finally {
    return success
  }
}

export async function loggingOut() {
  try {
    await firebase.auth().signOut()
  } catch (err) {
    Alert.alert("There is something wrong!", err.message)
  }
}