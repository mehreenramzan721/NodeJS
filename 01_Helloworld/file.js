const fs = require('fs');

const os = require('os');
console.log(os.cpus().length);

// fs.writeFileSync("./test.txt", "Hey There");

// // fs.writeFile("./test2.txt", "Hey There", (err)=>{});

// // // console.log(fs.readFileSync("./contacts.txt", "utf-8"));
// // // fs.readFileSync("./contacts.txt", "utf-8", (error , result)=>{
// // //     if(error){
// // //         console.log(error);
// // //     }else{
// // //         console.log(result);
// // //     }
// // // })

// // fs.appendFileSync("./test.txt", " Hey There Again");

// // fs.cpSync("./test.txt", "./test2.txt");

// // fs.unlinkSync("./test2.txt");

// // console.log(fs.statSync("./test.txt"));

// // fs.mkdirSync("my-doc");

// fs.mkdirSync("my-doc/s/t" , {recursive:false});
// the sequence in output is same
// blocking code
// console.log("1")
// const result = fs.readFileSync('contacts.txt', 'utf-8');
// console.log(result);
// console.log("2");

// we get different sequence in output
// non-blocking code
//1
// undefined
// 2
// mehreen : +92222222
console.log("1")
const result = fs.readFile('contacts.txt', 'utf-8', (error , result)=>{
    console.log(result);
});
console.log(result);
console.log("2");
