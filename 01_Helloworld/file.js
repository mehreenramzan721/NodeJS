const fs = require('fs');

fs.writeFileSync("./test.txt", "Hey There");

fs.writeFile("./test.txt", "Hey There", (err)=>{});
