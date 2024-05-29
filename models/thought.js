const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
    auto: true
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280
  },
  username: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
  toJSON: { getters: true },
  id: false
});

const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    maxlength: 280
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAtVal) => createdAtVal.toISOString()
  },
  username: {
    type: String,
    required: true
  },
  reactions: [reactionSchema]
}, {
  toJSON: { getters: true, virtuals: true },
  id: false
});

thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Thoughts = model('Thoughts', thoughtSchema);
module.exports = Thoughts;