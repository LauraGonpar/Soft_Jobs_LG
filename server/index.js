import express from 'express'
import cors from 'cors'
import { registrarUsuario, loginUsuario, obtenerUsuario } from './consultas.js'
import {
  reportarConsultas,
  verificarCredenciales,
  validarToken
} from './middlewares.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use(reportarConsultas)

app.post('/usuarios', async (req, res) => {
  try {
    await registrarUsuario(req.body)
    res.status(201).send('Usuario creado con éxito')
  } catch (error) {
    res.status(500).send(error.message)
  }
})

app.post('/login', verificarCredenciales, async (req, res) => {
  try {
    const token = await loginUsuario(req.body.email, req.body.password)
    res.send(token)
  } catch (error) {
    res.status(error.code || 500).send(error.message)
  }
})

app.get('/usuarios', validarToken, async (req, res) => {
  try {
    const usuario = await obtenerUsuario(req.userEmail)
    res.json(usuario)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

app.listen(3000, () => console.log('¡Servidor encendido en el puerto 3000!'))
