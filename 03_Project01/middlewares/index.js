function logReqRes(fileName){
    return function(req, res, next){
        fs.appendFile(fileName, `\n${new Date()}: ${req.method} , ${req.path} ${req.url}\n`, (err) => {
                if (err) console.error('Error writing to log file:', err);
            });
            console.log("Hello from middleware 1 ")
            //this below retrun will only end the code here so we have to just call next not this line 
            // return res.json({status: 'success', message: 'Hello from middleware 1'});
            next();

    }
}

module.exports = logReqRes;