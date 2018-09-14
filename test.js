const EventEmitter = require('events');
const eventEmitter = new EventEmitter();

// Event emitter example
// eventEmitter.on('something', something);

// eventEmitter.emit('something',{id: 2, name:'Harsh'});

// function something(obj) {
//     console.log('something happened', obj.name);
// }
//----------------------------------------------------------------
//Callback 
// function GetName(name, Callback) {
//     setTimeout(() => {
//         Callback(name);
//     }, 2000);
// }

//  GetName('Harsh Raj', (a) =>{
//     console.log(a);
// });
//------------------------------------------------------------------
//using promises
// function GetName(name) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             //resolve(name);
//             reject(new Error("Some error occured."))
//         }, 2000);
//     })
// }
// var name = GetName("Harsh Raj")
//             .then(n => console.log(n))
//             .catch(err => console.log(err.message));
// const p1 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve(1);
//     }, 2000);
// })
// const p2 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve(2);
//     }, 2000);
// })

// //Promise.all([p1,p2])
// //  .then(r => console.log(r));

// Promise.race([p1,p2]).then(r => console.log(r));
//-------------------------------------------------------------------
//Using Async/Await

// async function showName(){
//     console.log("Extracting name");
//     var name = await getName();
//     console.log("Name ", name);
//     console.log("Here you go name");
// }
// console.log("Wait for name");
// function getName() {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve("Harsh raj");
//         }, 2000);
//     });
// }
// showName();


