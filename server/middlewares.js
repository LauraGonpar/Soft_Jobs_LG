import jwt from 'jsonwebtoken'

export const reportarConsultas = (req, res, next) => {
  console.log(`Consulta: ${req.method} en ${req.url}`)
  next()
}

export const verificarCredenciales = (req, res, next) => {
  const { email, password } = req.body
  if (!email || !password) return res.status(401).send('Faltan datos')
  next()
}

export const validarToken = (req, res, next) => {
  const header = req.header('Authorization')
  if (!header) return res.status(401).send('No hay token')

  const token = header.split('Bearer ')[1]
  try {
    const { email } = jwt.verify(token, 'CLAVE_SECRETA')
    req.userEmail = email
    next()
  } catch (e) {
    res.status(401).send('Token no válido')
  }
}
