const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String, required: true, default: "https://i0.wp.com/www.ogloba.com/wp-content/uploads/2015/10/Ayo_250.png?fit=250%2C250&ssl=1" },
    city: { type: String, required: true, default: "" },
    bio: { type: String, required: true, default: "" },
    posts: [{ type: Types.ObjectId, ref: "post" }],
    work: { type: String, required: true, default: "" },
    skills: { type: String, required: true, default: "" },
    createdAt: { type: Date, required: true, default: Date.now }
})

module.exports = model("user", schema);