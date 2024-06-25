CREATE DATABASE studentsdb;
\c studentsdb;


CREATE TABLE students (
    rollno SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE attendance (
    rollno INT NOT NULL,
    entry_time TIME NOT NULL,
    exit_time TIME NOT NULL,
    date DATE DEFAULT CURRENT_DATE,
    present_time INTERVAL GENERATED ALWAYS AS (exit_time - entry_time) STORED,
    PRIMARY KEY (rollno, date),
    FOREIGN KEY (rollno) REFERENCES students (rollno)
);

CREATE TABLE fees (
    rollno INT NOT NULL,
    course_id INT NOT NULL,
    ispaid BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (rollno, course_id),
    FOREIGN KEY (rollno) REFERENCES students (rollno),
    FOREIGN KEY (course_id) REFERENCES course (course_id)
);

CREATE TABLE course (
    course_id SERIAL PRIMARY KEY,
    total_fees INT NOT NULL
);
