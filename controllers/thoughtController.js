const Thought = require('../models/thought');

module.exports = {
  getAllThoughts: async (req, res) => {
    try {
      const thoughts = await Thought.find().populate('user');
      res.json(thoughts);
    } catch (err) {
      res.status(500).json({ message: "Error fetching thoughts", error: err });
    }
  },

  getThoughtById: async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.thoughtId);
      if (!thought) {
        return res.status(404).json({ message: "Thought not found" });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json({ message: "Error fetching thought", error: err });
    }
  },

  createThought: async (req, res) => {
    try {
      const thought = await Thought.create({ ...req.body, user: req.body.userId });
      res.status(201).json(thought);
    } catch (err) {
      res.status(400).json({ message: "Error creating thought", error: err });
    }
  },

  updateThought: async (req, res) => {
    try {
      const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true, runValidators: true });
      if (!thought) {
        return res.status(404).json({ message: "Thought not found" });
      }
      res.json(thought);
    } catch (err) {
      res.status(400).json({ message: "Error updating thought", error: err });
    }
  },

  deleteThought: async (req, res) => {
    try {
      const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
      if (!thought) {
        return res.status(404).json({ message: "Thought not found" });
      }
      res.json({ message: "Thought deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: "Error deleting thought", error: err });
    }
  }
};