const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String, required: true, default: "" },
    city: { type: String, required: true, default: "" },
    description: { type: String, required: true, default: "" },
    date: { type: Date, required: true },
    posts: [{ type: Types.ObjectId, ref: "post" }]
})

module.exports = model("user", schema);