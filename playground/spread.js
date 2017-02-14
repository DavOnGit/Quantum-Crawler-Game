// function add (a,b) {
//   return a + b
// }
//
// console.log(add(3,1))
//
// var toAdd = [9,5]
//
// console.log(add(...toAdd))

// var groupA = ['Jean','Cory']
// var groupB = ['Vik']
// var final = [3, ...groupA, ...groupB]
//
// console.log(final)

var person1 = ['Andy', 25]
var person2 = ['Jen', 29]

function greet(name,age){
  console.log(`Hi ${name}, you are ${age}`)
}

greet(...person1)
greet(...person2)

var names = ['Mike','Ben']
var final = ['Andraya', ...names]
final.forEach( (name) =>{
  console.log(`Hi ${name}`);
})
