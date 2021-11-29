const crypto = require('crypto');

const generateRandom = (byte) => {
    const stringByte = crypto.randomBytes(5, (err, buffer) => {
        const token = buffer.toString('hex');
        return token;
    })

    return stringByte;
}

module.exports = generateRandom;