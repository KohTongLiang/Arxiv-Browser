import firebase from 'firebase'
import '@firebase/firestore' // 👈 If you're using firestore
import ReduxSagaFirebase from 'redux-saga-firebase'

const myFirebaseApp = firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_STORAGE_BUCKET,
})

const rsf = new ReduxSagaFirebase(myFirebaseApp)
export default rsf