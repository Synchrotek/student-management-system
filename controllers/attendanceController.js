const pool = require('../models/db');

// API to enter entry time and exit time for a particular roll number
const addAttendance = async (req, res) => {
    const { rollno, entry_time, exit_time } = req.body;
    try {
        const insertQuery = `
            INSERT INTO attendance (rollno, entry_time, exit_time)
            VALUES ($1, $2, $3)
            ON CONFLICT (rollno, date) DO UPDATE
            SET entry_time = excluded.entry_time,
                exit_time = excluded.exit_time
        `;
        await pool.query(insertQuery, [rollno, entry_time, exit_time]);
        
        res.status(201).json({ message: 'Attendance added successfully' });
    } catch (error) {
        console.error('Error adding attendance:', error);
        res.status(500).json({ error: 'Failed to add attendance' });
    }
};

// API to fetch present time for a month for a particular roll number
const getPresentTimeForMonth = async (req, res) => {
    const { rollno, month } = req.params;

    try {
        const query = `
            SELECT SUM(exit_time - entry_time) as total_present_time
            FROM attendance
            WHERE rollno = $1
            AND EXTRACT(MONTH FROM date) = $2
        `;
        const result = await pool.query(query, [rollno, month]);

        const totalPresentTime = result.rows.length ? result.rows[0].total_present_time : '0 seconds';
        res.json({ total_present_time: totalPresentTime });
    } catch (error) {
        console.error('Error fetching present time:', error);
        res.status(500).json({ error: 'Failed to fetch present time' });
    }
};

module.exports = {
    addAttendance,
    getPresentTimeForMonth
};
