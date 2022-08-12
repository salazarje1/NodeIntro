const fs = require('fs');
const util = require('util');
const axios = require('axios');
const { stringify } = require('querystring');

const readFile = util.promisify(fs.readFile);

const cat = async (path, file) => {
    try {
        const data = await readFile(path, 'utf-8');
        writeOrPrint(data, file);
    } catch(err) {
        console.error(`Error reading ${path}: `)
        console.error(err);
        process.exit(1);
    }
}

const webCat = async (url, file) => {
    try { 
        let res = await axios.get(url);
        writeOrPrint(res, file);

    } catch (err){
        console.error(`Error fetching ${url}:`)
        console.error(err);
    }
}

const writeOrPrint = (content, file) => {
    if (file) {
        fs.writeFile(file, content, 'utf-8', function(err) {
            if(err) {
                console.log(`Couldn't write to ${path}: `)
                console.log(err);
            }
        })
    } else {
        console.log(content);
    }
}

// console.log(process.argv);
if(process.argv.length === 2){
    process.exit(0);
} 

let path; 
let out;

if(process.argv[2] === '--out') {
    out = process.argv[3];
    path = process.argv[4];
} else {
    path = process.argv[2]; 
}

if (path.includes('http')){
    webCat(path, out);
} else {
    cat(path, out);
}