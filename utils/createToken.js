const jwt = require('jsonwebtoken');
// payLoad is a data in token
const generateToken = (payLoad) => {
        const token = jwt.sign({ userID: payLoad }, process.env.PRIVATEKEY,
                { expiresIn: process.env.JWT_EXPIRE }
        );
        return token
}

module.exports = { generateToken }