const router = require("express").Router();
const Post = require("../models/Post");
const authMiddleware = require("../middlewares/auth.middleware");
const { check, validationResult } = require("express-validator");

router.post(
    "/add",
    [
        check("title", "Длина заголовка минимум 5 символов").isLength({ min: 5 }),
        check("description", "Длина описания минимум 10 символов").isLength({ min: 10 }),
        check("tags", "Должен быть хотя-бы один тег").isLength({ min: 1 })
    ],
    authMiddleware, async(req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: "Некорректные данные"
            })
        }

        const { title, description, tags, coverPhoto } = req.body;
        const newPost = new Post({
            title, description, tags, coverPhoto, owner: req.user.id
        })

        await newPost.save();

        res.status(201).json({ message: "Пост опубликован" });
    } catch(e) {
        res.status(500).json({ message: "Ошибка сервера: " + e.message });
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
        res.status(500).json({ message: "Ошибка сервера: " + e.message });
    }
})

router.put(
    "/change/:id",
    [
        check("title", "Длина заголовка минимум 5 символов").isLength({ min: 5 }),
        check("description", "Длина описания минимум 10 символов").isLength({ min: 10 }),
        check("tags", "Должен быть хотя-бы один тег").isLength({ min: 1 })
    ],
    authMiddleware, async(req, res) => {
    try {
        const { title, description, tags, coverPhoto } = req.body;
        const findPost = await Post.findById(req.params.id);

        if (!findPost) {
            return res.status(400).json({ message: "Пост не найден" });
        }

        await Post.updateOne({
            _id: req.params.id
        }, {$set: {
            title: title || findPost.title,
            description: description || findPost.description,
            tags: tags || findPost.tags,
            coverPhoto: coverPhoto || findPost.coverPhoto,
            createdAt: new Date()
        }})

        res.status(200).json({ message: "Пост изменен" });
    } catch(e) {
        res.status(500).json({ message: "Ошибка сервера: " + e.message });
    }
})

router.get("/", authMiddleware, async(req, res) => {
    try {
        const posts = await Post.find();

        res.status(200).json(posts);
    } catch(e) {
        res.status(500).json({ message: "Ошибка сервера: " + e.message });
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
        res.status(500).json({ message: "Ошибка сервера: " + e.message });
    }
})

router.get("/owner/:id", authMiddleware, async(req, res) => {
    try {
        const findPost = await Post.find({owner: req.params.id});

        if (!findPost) {
            return res.status(400).json({ message: "Пост не найден" });
        }

        res.status(200).json(findPost);
    } catch(e) {
        res.status(500).json({ message: "Ошибка сервера: " + e.message });
    }
})

module.exports = router;