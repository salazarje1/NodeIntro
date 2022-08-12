const fs = require('fs');


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

// console.log(process.argv);
if(process.argv.length === 2){
    process.exit(0);
} else {
    let path = process.argv[2];
    cat(path);
}