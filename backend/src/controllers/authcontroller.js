const userModel = require('../models/usermodel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


async function register(req, res) {
    try {
        const { username, email, password, role='user' } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'username, email and password are required' });
        }
        const usernameNorm = String(username).trim();
        const emailNorm = String(email).trim().toLowerCase();
        const existingUser = await userModel.findOne(
            { $or: [{ email: emailNorm }, { username: usernameNorm }] }
        );
        if (existingUser) {
            return res.status(409).json({ message: 'Email or username already in use' });

        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const User = await userModel.create({
            username: usernameNorm,
            email: emailNorm,
            password: hashedPassword,
            role
        });
        const token = jwt.sign({
            id: User._id,
            role: User.role,
        },process.env.JWT_SECRET)

        res.cookie('token', token)
    
      
        res.status(201).json({ message: 'User registered successfully' ,
            user: {
                id: User._id,
                username: User.username,
                role: User.role,
                email: User.email
            },
            
        });
    } 
    catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Server error' });
    }   }

async function me(req, res) {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id).select('username email role');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ user: { id: user._id, username: user.username, email: user.email, role: user.role } });
    } catch (error) {
        console.error('Error during me:', error);
        res.status(500).json({ message: 'Server error' });
    }
}
async function login(req, res) {
    try {
        const { username, email, password } = req.body;
        const conditions = [];
        if (email && String(email).trim().length > 0) {
            conditions.push({ email: String(email).trim().toLowerCase() });
        }
        if (username && String(username).trim().length > 0) {
            conditions.push({ username: String(username).trim() });
        }
        if (conditions.length === 0) {
            return res.status(400).json({ message: 'Email or username required' });
        }
        const user = await userModel.findOne(conditions.length === 1 ? conditions[0] : { $or: conditions });

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        if (!password) {
            return res.status(400).json({
                message: "Password required"
            });
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordValid) {
            return res.status(401).json({
                message: 'Invalid password'
            });
        }

        const token = jwt.sign({
            id: user._id,
            role: user.role,
        }, process.env.JWT_SECRET);

        res.cookie('token', token);

        res.status(200).json({
            message: 'Login successful'
        });

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

async function logout(req, res) {
    try {
        res.clearCookie('token');
        res.status(200).json({ message: 'Logged out' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}
    module.exports = {
        register,
        login,
        me,
        logout
    }
