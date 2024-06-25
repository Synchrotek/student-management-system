const pool=require('../models/db.js');

//insert new record for student opts course
const studentOptedCourse = (req,res)=>{
    const {rollno , courseId, isPaid}=req.body;
    pool.query('INSERT INTO fees( rollno, course_id, ispaid) VALUES ($1,$2,$3)',[rollno, courseId, isPaid],(error,results)=>{
        if (error) {

            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.status(200).json({msg:'Student Enrolled to the course sucessfully'});
        }
    })
}

//all courses that opted
const getAllFeeStructure = (req,res)=>{
    pool.query('SELECT * FROM fees ',(error , results)=>{
        if(error){
            res.status(500).json({error:'Internal Server Error'});
        } else {
            res.status(200).json(results.rows);
        }
    })
}

//update the status of course payment 
const changeStatus = (req,res)=>{
    const paid = true;
    const {rollno,course_id}=req.body
    pool.query('UPDATE fees SET ispaid = $1 WHERE rollno = $2 AND course_id = $3',[paid,rollno,course_id],(error,results)=>{
        if(error){
            res.status(500).json({error:'Internal server error'});
        } else {
            res.status(200).json({msg:'Student has paid for this course'});
        }
    } )
}

module.exports={
    getAllFeeStructure,studentOptedCourse,changeStatus
}