
const express = require('express');
const db = require('./config/connection');
const userRoutes = require('./routes/api/userRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use('/api/users', userRoutes);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
