const router = require("express").Router();
const Post = require("../models/Post");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/add", authMiddleware, async(req, res) => {
    try {
        const { title, description } = req.body;
        const newPost = new Post({
            title, description
        })

        await newPost.save();

        res.status(201).json({ message: "Пост опубликован" });
    } catch(e) {
        res.status(500).json({ message: "Ошибка сервера" });
    }
})

router.delete("/delete/:id", authMiddleware, async(req, res) => {
    try {
        const findPost = await Post.findById(req.params.id);

        if (!findPost) {
            return res.status(400).json({ message: "Пост не найден" });
        }

        await Post.deleteOne({
            _id: req.params.id
        })

        res.status(200).json({ message: "Пост удален" });
    } catch(e) {
        res.status(500).json({ message: "Ошибка сервера" });
    }
})

router.put("/change/:id", authMiddleware, async(req, res) => {
    try {
        const { title, description } = req.body;
        const findPost = await Post.findById(req.params.id);

        if (!findPost) {
            return res.status(400).json({ message: "Пост не найден" });
        }

        await Post.updateOne({
            _id: req.params.id
        }, {$set: {
            title: title || findPost.title,
            description: description || findPost.description
        }})

        res.status(200).json({ message: "Пост изменен" });
    } catch(e) {
        res.status(500).json({ message: "Ошибка сервера" });
    }
})

router.get("/", authMiddleware, async(req, res) => {
    try {
        const posts = await Post.find();

        res.status(200).json(posts);
    } catch(e) {
        res.status(500).json({ message: "Ошибка сервера" });
    }
})

router.get("/:id", authMiddleware, async(req, res) => {
    try {
        const findPost = await Post.findById(req.params.id);

        if (!findPost) {
            return res.status(400).json({ message: "Пост не найден" });
        }

        res.status(200).json(findPost);
    } catch(e) {
        res.status(500).json({ message: "Ошибка сервера" });
    }
})

module.exports = router;