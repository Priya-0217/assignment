const jwt = require('jsonwebtoken');

async function authArtist(req, res, next) {
    const token = req.cookies.token; 
    
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }   
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);          
        if (decoded.role !== 'artist') {
            return res.status(403).json({ message: 'Forbidden' });
        }   
         
        req.user = decoded;
        next();
    } catch (err) {     
        console.error("AUTH ERROR:", err);
        res.status(500).json({ message: 'Server error' });
    }  } 

async function authUser(req,res,next) {
    const token = req.cookies.token;
    
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }   

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(decoded.role !== 'user') {
            return res.status(403).json({ message: 'Forbidden' });
        }
        req.user = decoded;
        next();
    }
    catch (err) {

        console.error("AUTH ERROR:", err);
        res.status(500).json({ message: 'Server error' });
    }
    
    
}


    module.exports = {
        authArtist,
        authUser,
        
    }