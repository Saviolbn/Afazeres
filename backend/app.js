const express = require("express");
const bodyParser = require("body-parser");
const { PrismaClient } = require("@prisma/client");
const cors = require("cors");

const prisma = new PrismaClient()
const app = express();
app.use(bodyParser.json())
app.use(cors())
const port = 3000;

app.post("/criar", async (req, res) => {
    const dados = await prisma.tarefas.create({
        data: {
            texto: req.body.texto,
            finalizado: req.body.finalizado
        }
    })
    res.send(dados)
})

app.get("/listar", async(req, res) => {
    const dados = await prisma.tarefas.findMany({

    })
    res.send(dados)
}) 

app.get("/listarUnico/:id", async(req, res) => {
    const dados = await prisma.tarefas.findUnique({
        where: {
            id: parseInt(req.params.id)
        }
    })
    res.send(dados)
})

app.put("/editar/:id", async(req, res) => {
    const dados = await prisma.tarefas.update({
        data: {
            texto: req.body.texto,
            finalizado: req.body.finalizado
        },        
        where:{
            id: parseInt(req.params.id)
        }
    })
    res.send(dados)
})

app.delete("/deletar/:id", async(req, res) =>{
    const dados = await prisma.tarefas.delete({
        where:{
            id: +req.params.id
        }
    })
    res.send(dados)
})

app.listen(port, () => {
})