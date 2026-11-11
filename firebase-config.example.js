// Template for firebase-config.js, the Firebase web config the page uses. firebase-config.js is
// not committed (see .gitignore): on GitHub Pages the deploy workflow writes it from repository
// secrets. For local testing, copy this file to firebase-config.js and fill in the values from
// the Firebase console: Project settings > General > Your apps > SDK setup and configuration.
export const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};
