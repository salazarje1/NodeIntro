const fs = require('fs');
const axios = require('axios');


const cat = (path) => {
    fs.readFile(path, 'utf-8', (err, data) => {
        if(err) {
            console.error(`Error reading ${path}: `)
            console.error(err);
            process.exit(1);
        }
        console.log(data);
    })
}

const webCat = async (url) => {
    try { let res = await axios.get(url);
    console.log(res);
    } catch (err){
        console.error(`Error fetching ${url}:`)
        console.error(err);
    }
}

// console.log(process.argv);
if(process.argv.length === 2){
    process.exit(0);
} else {
    let arg = process.argv[2];
    if(arg.includes('http')){
        webCat(arg);
    } else if(arg.includes('.txt')) {
        cat(arg);
    } else {
        console.log("Check file path or url (url should start with http).")
    }
}