const express = require("express");
const cors = require('cors')
const app = express();
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const pool = require('./db')
const PORT = process.env.DB_PORT ?? 3001;

app.use(cors())

app.get("/", async (req, res) => {
    const q = "select id, row_number() over (order by pontos desc, v desc, sg desc, gp desc, nome) as pos, nome, pontos, jogos, v, e, d, gp, gc, sg, pctg from tabela order by pontos desc, v desc, sg desc, gp desc, nome"
       try{
        const get = await pool.query(q)
        res.json(get.rows)
    } catch (err){
        console.error(err)
    }
    
});

app.post("/times", jsonParser, async (req, res) => {
    const {id, pos, nome, pontos, jogos, v, e, d, gp, gc, sg, pctg} = req.body;
    const q = "INSERT INTO tabela(id, pos, nome, pontos, jogos, v, e, d, gp, gc, sg, pctg) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)";
    
    try{
        const insert = await pool.query(q, [id, pos, nome, pontos, jogos, v, e, d, gp, gc, sg, pctg])
        res.json(insert)
    } catch (err){
        console.error(err)
    }
});

app.put("/times/:id", jsonParser, async (req, res) => {
    const {id} = req.params
    const { pos, pontos, jogos, v, e, d, gp, gc, sg, pctg } = req.body;
    const q =
        "UPDATE tabela SET pos = $1, pontos = $2, jogos = $3, v = $4, e = $5, d = $6, gp = $7, gc = $8, sg = $9, pctg = $10 WHERE id = $11";
    
    try{
        const update = await pool.query(q, [pos, pontos, jogos, v, e, d, gp, gc, sg, pctg, id])
        res.json(update);
    } catch (err){
        console.error(err)
    }
});

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}.`);
});
