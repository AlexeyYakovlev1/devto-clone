const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const authMiddleware = require("../middlewares/auth.middleware");

router.delete("/delete/:id", authMiddleware, async(req, res) => {
    try {
        const findUser = await User.findById(req.params.id);
        const findPosts = await Post.find({ owner: req.params.id });

        if (!findUser) {
            return res.status(404).json({ message: "Пользователь не найден" });
        }

        if (findPosts.length) {
            await Post.deleteMany({
                owner: req.params.id
            })
        }
        
        await User.deleteOne({
            _id: findUser._id
        });
    } catch(e) {
        res.status(500).json({ message: "Ошибка" });
    }
})

router.put("/change/:id", authMiddleware, async(req, res) => {
    try {
        const { name, email, avatar, city, bio } = req.body;
        const findUser = await User.findById(req.params.id);

        if (!findUser) {
            return res.status(404).json({ message: "Пользователь не найден" });
        }

        await User.updateOne({
            _id: req.params.id
        }, {$set: {
            name: name || findUser.name,
            email: email || findUser.email,
            avatar: avatar || findUser.avatar,
            city: city || findUser.city,
            bio: bio || findUser.bio
        }})

        res.status(200).json({ message: "Пользователь изменен" });
    } catch(e) {
        res.status(500).json({ message: "Ошибка" });
    }
})

router.get("/", authMiddleware, async(req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ users });
    } catch(e) {
        res.status(500).json({ message: "Ошибка" });
    }
})

router.get("/:id", authMiddleware, async(req, res) => {
    try {
        const findUser = await User.findById(req.params.id);
        res.status(200).json({ findUser });
    } catch(e) {
        res.status(500).json({ message: "Ошибка" });
    }
})

module.exports = router;