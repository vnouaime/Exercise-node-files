const fs = require('fs');
const process = require('process');
const axios = require('./.gitignore/node_modules/axios');

function handleOutput(text, out) { 
    /* 
    Handles output on whether --out flag was passed in. 
    Either appends file or console.logs the data inside it.
    */
    if (out) {
        fs.writeFile(out, text, {encoding: 'utf8', flag: 'a'}, err => {
            if (err) {
                console.log("ERROR:", err);
                process.kill(1);
            } 
        })     
    } else {
        console.log(text);
    }
}

function cat(path, out) {
    /* 
    If path is valid, it is passed into readFile and calls handleOutput function
    If invalid, console.logs the error and stops the code. 
    */

    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log("ERROR:", err);
            process.kill(1);
        } else {
            handleOutput(data, out);
        }  
    })
}

async function webCat(url, out) {
    /*
    Retrieves data from response in form of object from the url passed in. 
    Then, calls handleOutput function.

    If invalid url, console.logs error and stops code. 
    */

    try {
        let {data} = await axios.get(url);
        handleOutput(data, out);
    }
    catch (e) {
        console.log(`Error: ${e}`);
        process.kill(1);
    }
}

// Initializes variables to handle arguments in process.argv.
let path;
let out;

// If arg that is passed in command line is --out, other arguments following it are stored in out and path global variables.
if (process.argv[2] === "--out") {
    out = process.argv[3];
    path = process.argv[4];
} else {
    path = process.argv[2];
}

// If arg that is passed in starts with http, then function webCat is called. 
if (path.slice(0, 4) === 'http') {
    webCat(path, out);
} else {
    cat(path, out);
}

