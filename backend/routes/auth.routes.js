const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

router.post(
    "/register", 
    [
        check("name", "Минимальная длина имени 2 символа").isLength({ min: 2 }),
        check("email", "Некорректная почта").isEmail(),
        check("password", "Минимальная длина пароля 6 символов").isLength({ min: 6 })
    ],
    async(req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: "Некорректные данные при регистрации"
            })
        }

        const { name, city, email, password, bio, work, skills } = req.body;
        const findUser = await User.findOne({ email });

        if (findUser) {
            return res.status(404).json({ message: "Такой пользователь уже существует" });
        }

        const hashPassword = await bcrypt.hash(password, 7);
        const newUser = new User({
            name, city, email,
            bio, work, skills,
            password: hashPassword
        })

        await newUser.save();

        res.status(201).json({ message: "Пользователь создан" });
    } catch(e) {
        res.status(500).json({ message: "Ошибка сервера" });
    }
});

router.post(
    "/login", 
    [
        check("email", "Некорректная почта").normalizeEmail().isEmpty(),
        check("password", "Некорректный пароль").isEmpty().exists()
    ],
    async(req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty) {
            return res.status(400).json({
                errors: errors.array(),
                message: "Некорректные данные при входе"
            })
        }

        const { email, password } = req.body;
        const findUser = await User.findOne({ email });

        if (!findUser) {
            return res.status(404).json({ message: "Такого пользователя не существует" });
        }

        const comparePassword = await bcrypt.compare(password, findUser.password);
        
        if (!comparePassword) {
            return res.status(404).json({ message: "Данные неверны" });
        }

        const token = jwt.sign({ id: findUser._id }, config.get("jwtKey"), { expiresIn: "2h" });

        res.status(200).json({
            token,
            userInfo: {
                _id: findUser._id,
                name: findUser.name,
                email: findUser.email,
                city: findUser.city,
                createdAt: findUser.createdAt,
                bio: findUser.bio,
                avatar: findUser.avatar,
                work: findUser.work,
                skills: findUser.skills
            }
        });
    } catch(e) {
        res.status(500).json({ message: "Ошибка сервера " + e.message });
    }
});

module.exports = router;