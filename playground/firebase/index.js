import firebase from 'firebase'

var config = {
  apiKey: 'AIzaSyBR3rNF7XZ3_YBURCjLs177TAgqwg7RQSw',
  authDomain: 'your-todos.firebaseapp.com',
  databaseURL: 'https://your-todos.firebaseio.com',
  storageBucket: 'your-todos.appspot.com',
  messagingSenderId: '15952900851'
};
firebase.initializeApp(config);

var firebaseRef = firebase.database().ref()

firebaseRef.set({
  app: {name: 'Poldo', version: '0.1'},
  isRunning: true,
  user: {
    name: 'Dav',
    age: 44
  }
}).then( () => {
  console.log('Set completed')
}, (e) => {
  console.log('Set failed');
})

var todosRef = firebaseRef.child('todos')

todosRef.on('child_added', (snapshot) => {
  console.log('Todo added', snapshot.key, snapshot.val());
})

var newTodoRef = todosRef.push({text: 'test1'})
var newTodoRef = todosRef.push({text: 'test2'})


// Arrays
// var notesRef = firebaseRef.child('notes')
//
// notesRef.on('child_added', (snapshot) => {
//   console.log('child_added', snapshot.key, snapshot.val());
// })
//
// notesRef.on('child_changed', (snapshot) => {
//   console.log('child_changed', snapshot.key, snapshot.val());
// })
//
// notesRef.on('child_removed', (snapshot) => {
//   console.log('child_removed', snapshot.key, snapshot.val());
// })
//
// var newNoteRef = notesRef.push({
//   text: 'Walk the dogs'
// })
// console.log('Todo id', newNoteRef.key);
// //newNoteRef.remove()


// Listeners
// firebaseRef.child('user').on('value', (snapshot) => {
//   console.log('Got a value', snapshot.val());
// })

// firebaseRef.child('user').update({name: 'Joe'})
// firebaseRef.child('app').update({name: 'Toldo'})

// firebaseRef.child('app').once('value').then((snapshot)=>{
//   console.log('Got etire db', snapshot.key, snapshot.val())
// }, (e)=>{
//   console.log('Error');
// })
//
// Remove items
// firebaseRef.update({
//   isRunning: null
// })
//
// firebaseRef.child('user/age').remove()

// firebaseRef.child('app').update({
//   version: '2.0',
//   name: null
// })

// Updates
// firebaseRef.update({
//   'app/name': 'Todo App2',
//   'user/name': 'Mad'
// })

// firebaseRef.child('app').update({
//   name: 'Zwiper'
// })
//
// firebaseRef.child('user').update({
//   name: 'Undper'
// })

// firebaseRef.update({
//   isRunning: false,
//   'app/name': 'Todo App2'
// })

// Set
// firebaseRef.child('app').set({
//   name: 'Zwiper'
// })
