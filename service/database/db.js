
const { Pool } = require('pg')
console.log(process.env.DB_HOST)

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  allowExitOnIdle: true
})


const getHealth = async () =>{
    try {
        const result = await pool.query("select now()")
        console.log('base de datos funcionando')
    } catch (error) {
        console.error('error al conectar la base de datos')
    }
}

getHealth()

module.exports = pool