import Firebase from 'firebase/app';
import 'firebase/database';

var firebaseConfig = {
     apiKey: "AIzaSyBONBW-IZM0yQB948THk8rMZ-9CVnE620Q",
     authDomain: "money-manager-c52a1.firebaseapp.com",
     databaseURL: "https://money-manager-c52a1.firebaseio.com",
     projectId: "money-manager-c52a1",
     storageBucket: "money-manager-c52a1.appspot.com",
     messagingSenderId: "153168608515",
     appId: "1:153168608515:web:70ecb7a8f8477a8be67d36"
};
// Initialize Firebase
const app = Firebase.initializeApp(firebaseConfig);
const db = app.database();
export default db;