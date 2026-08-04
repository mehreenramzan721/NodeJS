const User = require('../models/user');
// const { v4: uuidv4 } = require('uuid')
const { setUser } = require('../service/auth')


async function handleUserSignUp(req, res) {
    try {
        const { name, email, password } = req.body;
        await User.create({ name, email, password });
        return res.redirect("/");
    } catch (err) {
        return res.status(400).render("signup", { error: "Signup failed. Email may already be in use." });
    }
}

async function handleUserLogin(req, res) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });
        if (!user) {
            return res.status(400).render("login", { error: "Invalid email or password" });
        }

        // const sessionId = uuidv4();
        // setUser(sessionId, user);

        const token = setUser(user)
        // res.cookie('uid', sessionId);
        res.cookie('uid', token);

        return res.redirect("/");
    } catch (err) {
        return res.status(500).render("login", { error: "Something went wrong" });
    }
}





module.exports = {
    handleUserSignUp,
    handleUserLogin
}