import firebase from 'firebase'

try {
  var config = {
    apiKey: 'AIzaSyBR3rNF7XZ3_YBURCjLs177TAgqwg7RQSw',
    authDomain: 'your-todos.firebaseapp.com',
    databaseURL: 'https://your-todos.firebaseio.com',
    storageBucket: 'your-todos.appspot.com',
    messagingSenderId: '15952900851'
  };
  
  firebase.initializeApp(config);
} catch (e) {
  
}

export var firebaseRef = firebase.database().ref()
export default firebase
