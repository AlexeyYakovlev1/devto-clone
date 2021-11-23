const router = require("express").Router();
const authMiddleware = require("../middlewares/auth.middleware")
const Comment = require("../models/comment");
const { check, validationResult } = require("express-validator");

router.post(
    "/add",
    [
        check("text", "Сообщение должно иметь минимум 6 символов").isLength({ min: 6 })
    ],
    authMiddleware, 
    async(req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: "Некорректные данные"
            })
        }

        const { text } = req.body;
        const newComment = new Comment({
            text,
            owner: req.user.id
        });

        await newComment.save();

        res.status(201).json({ message: "Комментарий опубликован" });
    } catch(e) {
        res.status(500).json({ message: "Ошибка сервера" });
    }
})

router.delete("/delete/:id", authMiddleware, async(req, res) => {
    try {
        const findComment = await Comment.findById(req.params.id);
        
        if (!findComment) {
            return res.status(404).json({ message: "Такого комментария не существует" });
        }

        await Comment.deleteOne({
            _id: findComment._id
        })

        res.status(201).json({ message: "Комментарий удален" });
    } catch(e) {
        res.status(500).json({ message: "Ошибка сервера" });
    }
})

router.put("/change/:id", authMiddleware, async(req, res) => {
    try {
        const { text } = req.body;
        const findComment = await Comment.findById(req.params.id);

        if (!findComment) {
            return res.status(404).json({ message: "Такого комментария не существует" });
        }

        await Comment.updateOne({_id: findComment.id}, {$set: {text, createdAt: new Date()}});

        res.status(201).json({ message: "Комментарий изменен" });
    } catch(e) {
        res.status(500).json({ message: "Ошибка сервера" });
    }
})

router.get("/", authMiddleware, async(req, res) => {
    try {
        const comments = await Comment.find();
        res.status(201).json({ comments });
    } catch(e) {
        res.status(500).json({ message: "Ошибка сервера" });
    }
})

router.get("/:id", authMiddleware, async(req, res) => {
    try {
        const findComment = await Comment.findById(req.params.id);
        res.status(201).json({ findComment });
    } catch(e) {
        res.status(500).json({ message: "Ошибка сервера" });
    }
})

module.exports = router;