const Pool = require("pg").Pool;
require('dotenv').config()

const pool = new Pool({
    host: "containers-us-west-146.railway.app",
    user: "postgres",
    password: "GfiszJ86CaJkbjoqoCe4",
    database: "railway",
    port: 6750,
});

module.exports = pool
 