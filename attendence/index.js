const express = require('express');
const app = express();
const attendanceRoutes = require('./routes/attendanceRoutes');

app.use(express.json()); 

app.use('/', attendanceRoutes); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
