/* eslint-disable no-throw-literal */
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import pkg from 'pg'
const { Pool } = pkg

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: 'tu_contraseña',
  database: 'softjobs',
  allowExitOnIdle: true
})

// 1. Registrar usuario (Encriptando la contraseña)
export const registrarUsuario = async (usuario) => {
  const { email, password, rol, lenguage } = usuario
  const passwordEncriptada = bcrypt.hashSync(password)
  const values = [email, passwordEncriptada, rol, lenguage]
  const consulta = 'INSERT INTO usuarios VALUES (DEFAULT, $1, $2, $3, $4)'
  await pool.query(consulta, values)
}

// 2. Login de usuario (Verificando credenciales y entregando Token)
export const loginUsuario = async (email, password) => {
  const { rows: [usuario], rowCount } = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email])

  if (!rowCount || !bcrypt.compareSync(password, usuario.password)) {
    throw { code: 401, message: 'Email o contraseña incorrecta' }
  }

  // Generamos el token con el email del usuario
  return jwt.sign({ email }, 'CLAVE_SECRETA', { expiresIn: '1h' })
}

// 3. Obtener datos del usuario (Para la ruta protegida /usuarios)
export const obtenerUsuario = async (email) => {
  const { rows: [usuario] } = await pool.query(
    'SELECT email, rol, lenguage FROM usuarios WHERE email = $1',
    [email]
  )
  return usuario
}
