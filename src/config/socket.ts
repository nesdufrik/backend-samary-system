import { Server } from "socket.io"

export const configSocketIo = (server: any) => {

    const io = new Server(server)

    io.on('connection', (socket) => {
        console.log('Nuevo cliente conectado');

        socket.on('disconnect', () => {
            console.log('Cliente desconectado')
        })

    })

}