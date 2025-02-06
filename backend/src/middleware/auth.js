const jwt = require('jsonwebtoken');
const User = require('../models/user');


const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        console.log("Token received: ", token); // Debugging
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded token: ", decoded); // Debugging
        

        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

        if (!user) {
            throw new Error();
        }
        req.token = token;
        req.user = user;
        next();
    } catch (error) {
        console.log("Authentication failed: ", error.message); // Debug
        
        res.status(401).send({ error: 'Please authenticate' });
    }
}

module.exports = auth