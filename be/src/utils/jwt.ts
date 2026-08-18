import jwt, { SignOptions } from 'jsonwebtoken'

const signToken = ({ payload, options }: { payload: string | object | Buffer; options?: SignOptions }) => {
    const privatekey = process.env.JWT_SRCRET || 'privatekey'
    const defaultOptions: SignOptions = {
        expiresIn: '1d',
        algorithm: 'HS256'
    }
    return new Promise((resolve, reject) => {
        jwt.sign(payload, privatekey, { ...defaultOptions, ...options }, (error, token) => {
            if (error) {
                reject(error)
            }
            resolve(token)
        })
    })
}

export { signToken }