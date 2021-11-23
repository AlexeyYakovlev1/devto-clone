const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
    text: { type: String, required: true },
    owner: { type: Types.ObjectId, ref: "user" },
    createdAt: { type: Date, default: new Date() },
    likes: { type: Number, default: 0 }
});

module.exports = model("comment", schema);