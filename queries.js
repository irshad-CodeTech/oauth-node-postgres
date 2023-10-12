const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'oauth',
  password: '1234',
  port: 5432,
})