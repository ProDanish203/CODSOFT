import {Schema, model} from "mongoose";
import validator from "validator";

const UserSchema = Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: [true, "Username is taken, Please try another one"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email is already in use"],
        validate: validator.isEmail
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be greater than 6 characters"],
    },
    blogs: {
        type: [
            {
                type: Schema.Types.ObjectId,
                ref: "Blog"
            }
        ],
        default: []
    }
}, {timestamps: true });

export default model("User", UserSchema);