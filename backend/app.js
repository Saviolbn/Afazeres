const express = require("express");
const bodyParser = require("body-parser");
const { PrismaClient } = require("@prisma/client");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const createErrors = require("http-errors")

const prisma = new PrismaClient()
const app = express();
app.use(cookieParser());
app.use(bodyParser.json())
app.use(cors({
    origin: "http://localhost:5500",
    credentials: true
}))
const port = 3000;


app.post("/criar", async (req, res) => {
    try {
        const usuario = JSON.parse(req.cookies.usuario)
        const dados = await prisma.tarefas.create({
            data: {
                texto: req.body.texto,
                finalizado: req.body.finalizado,
                usuarioId: usuario.id
            }
        })
        res.send(dados)
    } catch (error) {
        next(error)
    }

})

app.get("/listar", async (req, res) => {
    try {
        const usuario = JSON.parse(req.cookies.usuario)
        const dados = await prisma.tarefas.findMany({
            where: {
                usuarioId: usuario.id
            }
        })
        res.send(dados)
    } catch (error) {
        next(error)
    }
})

app.get("/listarUnico/:id", async (req, res) => {
    try {
        const usuario = JSON.parse(req.cookies.usuario)
        const dados = await prisma.tarefas.findFirst({
            where: {
                id: parseInt(req.params.id),
                usuarioId: usuario.id
            }
        })
        res.send(dados)
    } catch (error) {
        next(error)
    }
})

app.put("/editar/:id", async (req, res) => {
    try {
        const usuario = JSON.parse(req.cookies.usuario)
        const dados = await prisma.tarefas.updateMany({
            data: {
                texto: req.body.texto,
                finalizado: req.body.finalizado
            },
            where: {
                id: parseInt(req.params.id),
                usuarioId: usuario.id
            }
        })
        res.send(dados)
    } catch (error) {
        next(error)
    }
})

app.delete("/deletar/:id", async (req, res, next) => {
    try {
        const usuario = JSON.parse(req.cookies.usuario)
        const dados = await prisma.tarefas.deleteMany({
            where: {
                id: +req.params.id,
                usuarioId: usuario.id
            }
        })
        res.send(dados)
    } catch (error) {
        next(error)
    }

})

app.post("/cadastrar", async (req, res) => {
    try {
        const hash = await bcrypt.hash(req.body.senha, 10)
        const cadastro = await prisma.usuario.create({
            data: {
                nome: req.body.nome,
                senha: hash
            }
        })
        res.status(200)
        res.send(cadastro)
    } catch (error) {
        console.log(error)
        if (error.code === "P2002") {
            next(new createErrors.Conflict("Usuario ja cadastrado"))
            return
        }
        next(error)
    }
})

app.post("/login", async (req, res, next) => {
    try {
        const usuario = await prisma.usuario.findFirstOrThrow({
            where: {
                nome: req.body.nome
            }
        })
        if (!bcrypt.compare(req.body.nome, usuario.senha)) {
            next(new createErrors.Unauthorized("Senha errada"))
            return
        }
        res.status(200)
        res.cookie("usuario", JSON.stringify(usuario))
        res.send(usuario)
    } catch (error) {
        if (error.code === "P2025") {
            next(new createErrors.BadRequest("Usuario não cadastrado"))
        } else {
            next(error)
        }
    }
})

app.use((err, req, res, next) => {
    console.error(err)
    if (createErrors.isHttpError(err)) {
        res.status(err.statusCode).send(err.message)
    } else {
        res.status(500).send("pane no sistema")
    }
})

app.listen(port, () => {
})

