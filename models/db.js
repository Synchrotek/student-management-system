const Pool = require("pg").Pool;


const pool = new Pool({
    // user: "Student-management-system_owner",
    // host: "ep-sweet-math-a1pjc4md-pooler.ap-southeast-1.aws.neon.tech",
    // database: "Student-management-system",
    // port: 5433,
    // password: "jNo9xis7DkUc",
    connectionString: "postgresql://Student-management-system_owner:jNo9xis7DkUc@ep-sweet-math-a1pjc4md.ap-southeast-1.aws.neon.tech/Student-management-system?sslmode=require"
});


module.exports = pool;
