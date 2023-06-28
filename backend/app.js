const express = require("express");
const bodyParser = require("body-parser");
const { PrismaClient } = require("@prisma/client");
const cors = require("cors");
const cookieParser = require("cookie-parser")

const prisma = new PrismaClient()
const app = express();
app.use(cookieParser());
app.use(bodyParser.json())
app.use(cors({
    origin:"http://localhost:5500",
    credentials: true
}))
const port = 3000;

app.post("/criar", async (req, res) => {
    const usuario = JSON.parse(req.cookies.usuario)
    const dados = await prisma.tarefas.create({
        data: {
            texto: req.body.texto,
            finalizado: req.body.finalizado,
            usuarioId: usuario.id
        }
    })
    res.send(dados)
})

app.get("/listar", async(req, res) => {
    console.log(req.headers)
    const usuario = JSON.parse(req.cookies.usuario)
    const dados = await prisma.tarefas.findMany({
        where:{
            usuarioId: usuario.id
        }
    })
    res.send(dados)
}) 

app.get("/listarUnico/:id", async(req, res) => {
    const usuario = JSON.parse(req.cookies.usuario)
    const dados = await prisma.tarefas.findFirst({
        where: {
            id: parseInt(req.params.id),
            usuarioId: usuario.id
        }
    })
    res.send(dados)
})

app.put("/editar/:id", async(req, res) => {
    const usuario = JSON.parse(req.cookies.usuario)
    const dados = await prisma.tarefas.updateMany({
        data: {
            texto: req.body.texto,
            finalizado: req.body.finalizado
        },        
        where:{
            id: parseInt(req.params.id),
            usuarioId: usuario.id
        }
    })
    res.send(dados)
})

app.delete("/deletar/:id", async(req, res) =>{
    const usuario = JSON.parse(req.cookies.usuario)
    const dados = await prisma.tarefas.deleteMany({
        where:{
            id: +req.params.id,
            usuarioId: usuario.id
        }
    })
    res.send(dados)
})

app.post("/cadastrar", async(req,res) => {
    try {
        const cadastro = await prisma.usuario.create({
            data:{
                nome: req.body.nome,
                senha: req.body.senha
            }
        })
        res.status(200)
        res.send(cadastro)
    } catch (error) {
        console.log(error)
        if (error.code === "P2002") {
            console.log("erro 409, usuario ja cadastrado")
            res.status(409)
            res.send("Usuario ja cadastrado")
            return
        }
        res.status(500)
        res.send("Erro inesperado")
    }

})

app.post("/login", async(req,res) => {
    try {
        const usuario = await prisma.usuario.findFirstOrThrow({
            where:{
                nome: req.body.nome,
                senha: req.body.senha
            }
        })
        res.status(200)
        res.cookie("usuario",JSON.stringify(usuario))
        res.send(usuario)
    } catch (error) {
        console.error(error)
        if (error.code === "P2025") {
            res.status(400)
            res.send("Usuario não cadastrado")
        }
        
    }
    
})
app.listen(port, () => {
})