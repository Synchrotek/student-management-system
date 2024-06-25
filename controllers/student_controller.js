const pool = require('../models/db.js');

const addStudent = async (req, res) => {
    const { name } = req.body;
    await pool.query(`INSERT INTO students (name)
    VALUES ($1) `, [name], (error, result) => {
        if (error) {
            return res.status(500).send("Error: ", error);
        }
        return res.status(201).send(`Student data create.`);
    });
}

const getStudent = async (req, res) => {
    const student_id = req.params.student_id;
    await pool.query(`SELECT * FROM students WHERE rollno=$1`, [student_id], (error, result) => {
        if (error) {
            return res.status(500).json({ Error: error });
        }
        return res.send(JSON.stringify(result.rows));
    });
}

const getAllStudent = async (req, res) => {
    await pool.query(`SELECT * FROM students`, (error, result) => {
        if (error) {
            return res.status(500).json({ Error: error });
        }
        return res.send(JSON.stringify(result.rows));
    });
}

const updateStudent = async (req, res) => {
    const student_id = req.params.student_id;
    const { name } = req.body;
    await pool.query(`UPDATE students SET name=$1 WHERE rollno=$2`, [name, student_id], (error, result) => {
        if (error) {
            return res.status(500).json({ Error: error });
        }
        return res.send("Student details updated.");
    });
}

const deleteStudent = async (req, res) => {
    const student_id = req.params.student_id;
    await pool.query(`DELETE FROM students WHERE rollno=$1`, [student_id], (error, result) => {
        if (error) {
            return res.status(500).json({ Error: error });
        }
        return res.send("Student deleted.");
    });
}

module.exports = {
    addStudent, getStudent, getAllStudent,
    updateStudent, deleteStudent
}