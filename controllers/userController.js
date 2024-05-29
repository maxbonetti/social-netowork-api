const User = require('../models/user');

module.exports = {
  getUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: "Error fetching users", error: err });
    }
  },

  getSingleUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: "Error fetching user", error: err });
    }
  },

  createUser: async (req, res) => {
    try {
      const newUser = await User.create(req.body);
      res.status(201).json(newUser);
    } catch (err) {
      res.status(400).json({ message: "Error creating user", error: err });
    }
  },

  updateUser: async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true, runValidators: true });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (err) {
      res.status(400).json({ message: "Error updating user", error: err });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ message: "User deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: "Error deleting user", error: err });
    }
  }
};
