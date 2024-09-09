const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret';

exports.signup = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create a new user
        const newUser = await User.create({ email, password: hashedPassword });

        // Generate a JWT token
        const token = jwt.sign({ userId: newUser._id }, jwtSecret, { expiresIn: '1h' });

        // Send the token in the response
        res.status(201).json({ token });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ message: 'Signup failed' });
    }
};

// Login controller
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Login failed' });
    }
};
