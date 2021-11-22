const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    createdAt: { type: Date, required: true, default: new Date() },
    owner: { type: Types.ObjectId, ref: "user" },
    likes: { type: Number, default: 0 }
})

module.exports = model("post", schema);