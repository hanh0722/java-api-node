const fs = require('fs');

const removeFile = (path) => {
    fs.unlink(path, (err) => {
        console.log(err);
    })
}

module.exports = removeFile;