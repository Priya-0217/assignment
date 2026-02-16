const userModel = require('../models/usermodel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


async function register(req, res) {
    try {
        const { username, email, password, role='user' } = req.body;
        const existingUser = await userModel.findOne(
            { $or: [{ email }, { username }] }
        );
        if (existingUser) {
            return res.status(409).json({ message: 'Email or username already in use' });

        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const User = await userModel.create({
            username,
            email,
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

async function login(req, res) {
    try {
        const { username, email, password } = req.body;

        const user = await userModel.findOne({
            $or: [{ email }, { username }]
        });

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

    module.exports = {
        register,
        login
    }