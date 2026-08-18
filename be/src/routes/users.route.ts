import { NextFunction, Request, Response, Router } from 'express'
import { loginController, registerController } from '~/controllers/user.controller'
import { loginValidator, registerValidator } from '~/middlewares/users.middlewares'
import { validate } from '~/utils/validation'

const usersRouter = Router()

// usersRouter.post('/login', loginValidator, loginController)
usersRouter.post(
    '/login',
    loginValidator,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log('1')
            // next(new Error(' loi roi ban oi')) 
            throw new Error("loi roi ban oi 1")
        } catch (error) {
            next(error)
        }

    },
    (req: Request, res: Response, next: NextFunction) => {
        console.log('2')
        next()
    },

    (req: Request, res: Response, next: NextFunction) => {
        console.log('3')
        return res.json({
            message: 'ok'
        })
    },
    (err: Error, req: Request, res: Response, next: NextFunction) => {
        console.log('error', err.message)
        return res.status(400).json({
            message: err.message
        })
    }
    // loginController
)

/**
 * Description: Register new user
 * Path: /register
 * Method: POST
 * Body: { name, email, password, confirmpassword, date_of_birth: Date ISO }
 * 
 * 
 */
usersRouter.post('/register', validate(registerValidator), registerController)

export default usersRouter
