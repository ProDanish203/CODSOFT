import {Schema, model} from "mongoose";

const BlogSchema = Schema({
    title: {
        type: String,
        required: [true, "Blog title is required"],
    },
    content: {
        type: String,
        required: [true, "Blog content is required"],
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    comments: {
        type: [
            {
                type: Schema.Types.ObjectId,
                ref: "Comment"
            }
        ],
        default: []
    },
    like: {
        type: [
            {
                type: Schema.Types.ObjectId,
                ref: "User"
            }
        ],
        default: []
    }
}, {timestamps: true });

export default model("Blog", BlogSchema);