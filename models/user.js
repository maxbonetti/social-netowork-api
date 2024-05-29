const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, match: [/.+\@.+\..+/, 'Please enter a valid email address'] },
  thoughts: [{ type: Schema.Types.ObjectId, ref: 'Thought' }],
  friends: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

const User = model('User', userSchema);
module.exports = User;