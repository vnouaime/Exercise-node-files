const fs = require('fs');
const process = require('process')

function cat(path) {
    /* 
    If path is valid, it is passed into readFile and console.logs the data retrieved.
    If invalid, console.logs the error and stops the code. 
    */
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log("Error:", err)
            process.kill(1)
        }
        console.log(data)
    })
}

cat(process.argv[2])

