const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now },
    owner: { type: Types.ObjectId, ref: "user" },
    likes: { type: Number, default: 0 },
    comments: [{ type: Types.ObjectId, ref: "comment" }]
})

module.exports = model("post", schema);