const fs = require('fs');

fs.writeFileSync("./test.txt", "Hey There");

fs.writeFile("./test2.txt", "Hey There", (err)=>{});

// console.log(fs.readFileSync("./contacts.txt", "utf-8"));
// fs.readFileSync("./contacts.txt", "utf-8", (error , result)=>{
//     if(error){
//         console.log(error);
//     }else{
//         console.log(result);
//     }
// })

fs.appendFileSync("./test.txt", " Hey There Again");

fs.cpSync("./test.txt", "./test2.txt");

fs.unlinkSync("./test2.txt");

console.log(fs.statSync("./test.txt"));

fs.mkdirSync("my-doc");

fs.mkdirSync("my-doc/s/t" , {recursive:true});