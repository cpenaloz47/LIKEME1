const express = require('express')
const cors = require('cors')
const app = express()
const path = require("path");

const envPath = path.resolve(__dirname, ".env");
require("dotenv").config({ path: envPath })

const pool = require('./database/db.js')

const PORT = 3001
app.use(express.json())
app.use(cors())

app.listen(PORT, console.log("funcionando"));

app.get('/posts', async(req,res) => {

    const result = await pool.query('select * from posts')
    res.json(result.rows)

})

app.post('/posts', async(req,res) => {

    try {
        const { titulo, url, descripcion} = req.body
        const values = [titulo, url, descripcion]
        const resul = await pool.query("insert into posts(titulo,img,descripcion) values ($1,$2,$3)", values)
        res.send ("Posts añadido correctamente")
    } catch (error) {
        console.error("error al guardar posts")
        res.status(500).json(
            {
                error: error.code,
                message: error.message
            }
        )
    }
})

app.put('/posts/like/:id', async(req,res) => {

    try {
        const { id } = req.params
        const values = [id]
        const resul = await pool.query("update posts set likes = likes + 1 where id = $1", values)
        res.send ("Posts Actualizado correctamente " + id)
    } catch (error) {
        console.error("error al Actualizar like posts")
        res.status(500).json(
            {
                error: error.code,
                message: error.message
            }
        )
    }
})

app.delete('/posts/:id', async(req,res) => {

    try {
        const { id } = req.params
        const values = [id]
        const resul = await pool.query("delete from posts where id = $1", values)
        res.send ("Posts Eliminado correctamente " + id)
    } catch (error) {
        console.error("error al Eliminar posts")
        res.status(500).json(
            {
                error: error.code,
                message: error.message
            }
        )
    }
})