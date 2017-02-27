import firebase from 'firebase'

try {
  var config = {
    apiKey:             process.env.API_KEY,
    authDomain:         process.env.AUTH_DOMAIN,
    databaseURL:        process.env.DATABASE_URL,
    storageBucket:      process.env.STORAGE_BUCKET,
    messagingSenderId:  process.env.MESSAGINGSENDER_ID
  };
  
  firebase.initializeApp(config);
} catch (e) {
  
}

export var githubProvider = new firebase.auth.GithubAuthProvider()
export var facebookProvider = new firebase.auth.FacebookAuthProvider()
export var googleProvider = new firebase.auth.GoogleAuthProvider()
export var firebaseRef = firebase.database().ref()

export default firebase
