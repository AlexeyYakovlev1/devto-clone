const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

router.post("/register", async(req, res) => {
    try {
        const { name, city, date, email, password } = req.body;
        const findUser = await User.findOne({ email });

        if (findUser) {
            return res.status(404).json({ message: "Такой пользователь уже существует" });
        }

        const hashPassword = await bcrypt.hash(password, 7);
        const newUser = await new User({
            name, city,
            date, email,
            password: hashPassword
        })

        await newUser.save();

        res.status(201).json({ message: "Пользователь создан" });
    } catch(e) {
        res.status(500).json({ message: "Ошибка сервера" });
    }
});

router.post("/login", async(req, res) => {
    try {
        const { email, password } = req.body;
        const findUser = await User.findOne({ email });

        if (!findUser) {
            return res.status(404).json({ message: "Такого пользователя не существует" });
        }

        const comparePassword = await bcrypt.compare(password, findUser.password);
        
        if (!comparePassword) {
            return res.status(404).json({ message: "Данные неверны" });
        }

        const token = jwt.sign({ id: findUser.id }, config.get("jwtKey"), { expires: "2h" });

        res.status(200).json({
            token,
            userInfo: {
                _id: findUser._id,
                name: findUser.name,
                email: findUser.email,
                city: findUser.city,
                date: findUser.date,
                description: findUser.description,
                avatar: findUser.avatar
            }
        });
    } catch(e) {
        res.status(500).json({ message: "Ошибка сервера" });
    }
});

module.exports = router;