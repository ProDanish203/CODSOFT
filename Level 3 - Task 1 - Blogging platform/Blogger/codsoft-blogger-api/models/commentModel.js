import {Schema, model} from "mongoose";

const CommentSchema = Schema({
    text: {
        type: String,
        required: [true, "Text is required"],
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    parent: {
        type: Schema.Types.ObjectId,
        ref: "Blog"
    },
}, {timestamps: true });

export default model("Comment", CommentSchema);