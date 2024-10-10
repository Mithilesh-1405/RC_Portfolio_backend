const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        first_name: {
            type: String,
        },
        last_name: {
            type: String,
        },
        email: {
            type: String,
        },
        phone: {
            type: String,
        },
        message: {
            type: [String],
        },
    },
    {
        timestamps: true,
    }
);

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
