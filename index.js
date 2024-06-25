const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./models/db.js');

const PORT = 8000;
const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("Server is working");
});

// Routes use ---------------------------
const feesRoutes = require('./routes/fees.route.js');
const studentRoutes = require('./routes/student.route.js');
app.use('/fees', feesRoutes);
app.use('/student', studentRoutes);

app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`)
})