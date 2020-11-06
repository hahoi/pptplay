import firebase from "firebase/app"

import "firebase/auth"
import "firebase/database"
import 'firebase/firestore'
import 'firebase/storage'
import "firebase/functions"



// Contact
const firebaseConfig = {
  apiKey: "AIzaSyBfWfOYHX9mK6Ye_c5Sj3oN5pCh2FleI3Y",
  authDomain: "contact-6c710.firebaseapp.com",
  databaseURL: "https://contact-6c710.firebaseio.com",
  projectId: "contact-6c710",
  storageBucket: "contact-6c710.appspot.com",
  messagingSenderId: "1019309398500",
  appId: "1:1019309398500:web:0248536b83679c577acff1"
};


// //PTHGDB
// var firebaseConfig = {
//   apiKey: "AIzaSyBYCDtdD4-sjpgDvB4gRjSqOq9w7KjDe38",
//   authDomain: "pthgdb-9549c.firebaseapp.com",
//   databaseURL: "https://pthgdb-9549c.firebaseio.com",
//   projectId: "pthgdb-9549c",
//   storageBucket: "pthgdb-9549c.appspot.com",
//   messagingSenderId: "404918654035",
//   appId: "1:404918654035:web:4a7a1e1f7d7d6dd05a62a6"
// }


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// ImportantCase
// const firebaseConfig = {
//   apiKey: "AIzaSyCDXQAwxWKtNM_TA8PC2o7BOqREDeMDKPE",
//   authDomain: "importantcace.firebaseapp.com",
//   databaseURL: "https://importantcace.firebaseio.com",
//   projectId: "importantcace",
//   storageBucket: "importantcace.appspot.com",
//   messagingSenderId: "526621767955",
//   appId: "1:526621767955:web:72d7289186b4eba53d82e6",
//   measurementId: "G-3K20ED9VH5"
// };





const firebaseApp = firebase.initializeApp(firebaseConfig)
const firebaseAuth = firebaseApp.auth()
const firebaseDb = firebaseApp.database()
const dbFirestore = firebaseApp.firestore()
const dbStorage = firebaseApp.storage()
const dbFunctions = firebaseApp.functions()

export { firebaseApp, firebaseAuth, firebaseDb, dbFirestore, dbStorage, dbFunctions }