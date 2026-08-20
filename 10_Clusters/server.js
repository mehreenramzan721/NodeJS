const cluster = require('node:cluster')
const os = require('os')
const totalCpus = os.cpus().length;
// another method:
// const totalCpus = os.availableParallelism();
// console.log(totalCpus)
const express = require('express');
const app = express();

const PORT = 8000;


if (cluster.isPrimary) {
    // Fork workers.
    for (let i = 0; i < totalCpus; i++) {
        cluster.fork();
    }
} else {

    app.get('./', (req, res) => {
        return res.json(`Hello from server ${process.pid}`)
    })

    app.listen(PORT, () => console.log(`Hello from server23 ${process.pid}`))
}