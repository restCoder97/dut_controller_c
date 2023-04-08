// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-analytics.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js"
import { collection, getDoc, addDoc, Timestamp,doc} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js"
import { query, orderBy, limit, where, onSnapshot,setDoc } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js"
import { databaseSelection } from "./main.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "REMOVED",
  authDomain: "REMOVED",
  projectId: "REMOVED",
  storageBucket: "REMOVED",
  messagingSenderId: "REMOVED",
  appId: "REMOVED",
  measurementId: "REMOVED"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
var selected_chamber = "";
var lastCommand = {};

export async function qurey(chamber,information){    
    const docRef = doc(db,chamber,information);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
      } else {
        console.log("No such document!");
      }
}

export async function completeEmitting(){
    await setDoc(doc(db,selected_chamber,"emitted"),lastCommand);
    await setDoc(doc(db,selected_chamber,"status"),{"status":"Sent:"});
    console.log("Notified Server!");
}

export async function connect(chamber){
    selected_chamber = chamber;
    await setDoc(doc(db,selected_chamber,"emitted"),{"Connected":"Success"});
    await setDoc(doc(db,selected_chamber,"status"),{"status":"Sent:"});
    const unsub = onSnapshot(
        doc(db, chamber, "command"), 
        { includeMetadataChanges: true }, 
        (doc) => {
            lastCommand = doc.data();
            databaseSelection(doc.data());
    });
}