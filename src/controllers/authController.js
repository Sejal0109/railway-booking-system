const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../prismaClient');

// User Registration
const registerUser = async (req, res) => {
    const { name, password,email } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
        data: { name, password: hashedPassword ,email:email}
    });

    res.json(user);
};

// User Login
const loginUser = async (req, res) => {
    const {  password,email } = req.body;

    const user = await prisma.user.findUnique({
        where: { email:email
        }
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
};

module.exports = { registerUser, loginUser };
