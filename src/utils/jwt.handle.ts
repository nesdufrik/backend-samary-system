import { sign, verify } from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "Necesitas una clave secreta"

export const generarToken = (payload: object) => {
    const Token = sign(payload, JWT_SECRET, { expiresIn: "24h" })
    return Token
}

export const verificarToken = (token: string) => {
    const isOk = verify(token, JWT_SECRET)
    return isOk
}