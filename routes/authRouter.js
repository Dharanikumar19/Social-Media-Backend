const router = require("express").Router();
const User = require("../models/userModel")
const bcrypt = require("bcrypt")

//Register
router.post("/register", async (req, res) => {

    try {
        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(req.body.password, salt)

        const newUser = await new User({
            username: req.body.username,
            email: req.body.email,
            city: req.body.city,
            state: req.body.state,
            password: hashpassword,
        });
        const user = await newUser.save();
        res.status(200).json(user)

    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})


router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if(!user) return res.status(404).json("User not found")
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        if(!validPassword) return res.status(400).json("Email ID or Password is Invalid")

        res.status(200).json(user)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})




module.exports = router;