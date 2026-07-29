const fs = require('fs');

fs.writeFileSync("./test.txt", "Hey There");

fs.writeFile("./test2.txt", "Hey There", (err)=>{});
