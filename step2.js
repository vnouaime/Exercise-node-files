const fs = require('fs');
const process = require('process');
const axios = require('axios')

let arg = process.argv[2]

function cat(path) {
    /* 
    If path is valid, it is passed into readFile and console.logs the data retrieved.
    If invalid, console.logs the error and stops the code. 
    */

    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log("Error:", err);
            process.kill(1);
        }
        console.log(data);
    })
}

async function webCat(url) {
    /*
    Retrieves data from response in form of object from the url passed in. 
    If invalid url, console.logs error and stops code. 
    */

    try {
        let {data} = await axios.get(url);
        console.log(data);
    }
    catch (e) {
        console.log(`Error: ${e}`);
        process.kill(1);
    }
}

// If arg that is passed in command line is a url, webCat function is executed. Otherwise, cat function. 
if (arg.slice(0, 4) === 'http') {
    webCat(arg);
} else {
    cat(arg);
}