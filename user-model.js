const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        userName: String,
        googleId: String,
        thumbnail: String
    }
)

const User = mongoose.model(/*model name*/'user', /*Schema*/userSchema);

module.exports = User;

