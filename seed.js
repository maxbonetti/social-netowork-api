
const mongoose = require('mongoose');
const db = require('./config/connection');
const User = require('./models/User');
const Thought = require('./models/Thought');

// Sample users
const usersData = [
    { username: "Alice", email: "alice@example.com" },
    { username: "Bob", email: "bob@example.com" },
    { username: "Charlie", email: "charlie@example.com" },
    { username: "Frank", email: "frank@example.com" }
];

// Sample thoughts
const thoughtsData = [
    { thoughtText: "What a beautiful day!", username: "Alice" },
    { thoughtText: "I'm learning so much at this bootcamp!", username: "Bob" },
    { thoughtText: "Node.js is quite interesting.", username: "Charlie" },
    { thoughtText: "This is cool!", username: "Frank" }
];

// Connect to MongoDB
db.once('open', async () => {
    await User.deleteMany({});
    await Thought.deleteMany({});

    const users = await User.insertMany(usersData);
    const thoughts = await Thought.insertMany(thoughtsData.map(thought => ({
        ...thought,
        username: users.find(user => user.username === thought.username)._id
    })));

    for (let user of users) {
        const userThoughts = thoughts.filter(thought => thought.username.toString() === user._id.toString());
        user.thoughts = userThoughts.map(thought => thought._id);
        await user.save();
    }

    console.log("Database seeded!");
    process.exit(0);
});