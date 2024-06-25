// app.js
const postgres = require('postgres');
require('dotenv').config();

let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;

const sql = postgres({
    host: PGHOST,
    database: PGDATABASE,
    username: PGUSER,
    password: PGPASSWORD,
    port: 5432,
    ssl: 'require',
    connection: {
        options: `project=${ENDPOINT_ID}`,
    },
});

async function getPgVersion() {
    const result = await sql`select version()`;
    console.log(result);
}

getPgVersion();

/*
# Do not expose your Neon credentials to the browser

PGHOST = 'ep-sweet-math-a1pjc4md-pooler.ap-southeast-1.aws.neon.tech'
PGDATABASE = 'Student-management-system'
PGUSER = 'Student-management-system_owner'
PGPASSWORD = 'jNo9xis7DkUc'
ENDPOINT_ID = 'ep-sweet-math-a1pjc4md-pooler'
 */