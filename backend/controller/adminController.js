const jwt = require("jsonwebtoken");
const Admin = require("../model/Admin");

const loginAdmin = async (req, res) => {
const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
    return res.status(401).json({ message: "Invalid credentials" });
    }
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
    });
    res.json({ token });
};

module.exports = { loginAdmin };