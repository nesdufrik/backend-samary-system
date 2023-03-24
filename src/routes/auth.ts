import { verificacionDeToken } from './../middleware/session.middleware';
import { validateLogin, validateUpdateUsuario } from './../validators/usuarios';
import { deleteUserController, loginAuthController, registerUserController, updateUserController, verifyJWTController } from './../controllers/auth';
import { Router } from "express";
import { validateRegisterUsuario } from '../validators/usuarios';
import { errorHandle } from '../utils/error.handle';

const router = Router()

router.get('/jwt', verificacionDeToken, verifyJWTController)
router.post('/login', validateLogin, loginAuthController)
router.post('/register', validateRegisterUsuario, registerUserController)
router.put('/update', verificacionDeToken, validateUpdateUsuario, updateUserController)
router.delete('/delete', verificacionDeToken, deleteUserController)

export { router }