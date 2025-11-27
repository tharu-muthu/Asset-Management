require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const assetRoutes = require('./routes/assets');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/assets', assetRoutes);

sequelize.sync({ force: false })
    .then(() => {
        console.log('Database connected & synced');
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => console.error('Database connection error:', err));