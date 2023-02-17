import { compare, hash } from "bcryptjs"

export const encriptar = async (pass: string) => {
    const passHash = await hash(pass, 8)
    return passHash
}

export const verificar = async (pass: string, passHash: string) => {
    const isCorrect = await compare(pass, passHash)
    return isCorrect
}