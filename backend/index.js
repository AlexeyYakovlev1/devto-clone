const express = require('express');
const mongoose = require('mongoose');
const config = require('config');

const app = express();
const PORT = config.get("port") || 5000;
const URL = config.get("mongoUrl");

app.use(express.json({ extended: true }));

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/users", require("./routes/user.routes"));
app.use("/api/posts", require("./routes/post.routes"));
app.use("/api/comments", require("./routes/comment.routes"));

const start = async() => {
    try {
        await mongoose.connect(URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })

        app.listen(PORT, () => {
            console.log("server has been started");
        })
    } catch(e) {
        console.log(e.message);
        process.exit(1);
    }
}

start();