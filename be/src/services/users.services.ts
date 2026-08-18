import User from "~/models/schemas/User.schema";
import databaseServices from "./database.services";
import { LoginReqBody, RegisterReqBody } from "~/requests/User.requests";
import { hashPassword } from "~/utils/crypto";
import { signToken } from "~/utils/jwt";
import { TokenType } from "~/constants/enums";
import type { StringValue } from 'ms'

class UsersService {
    private signAccessToken(userId: string) {
        return signToken({
            payload: {
                user_id: userId,
                tokenType: TokenType.AccessToken,
            },
            options: {
                expiresIn: (process.env.ACCESS_TOKEN_EXPIRES_IN || '15m') as StringValue
            }
        })
    }

    private signRefreshToken(userId: string) {
        return signToken({
            payload: {
                user_id: userId,
                tokenType: TokenType.RefreshToken
            },
            options: {
                expiresIn: (process.env.REFRESH_TOKEN_EXPIRES_IN || '100d') as StringValue
            }
        })
    }

    async register(payload: RegisterReqBody) {
        const { email, password, username, date_of_birth } = payload
        const result = await databaseServices.users.insertOne(
            new User({
                email,
                password: hashPassword(password),
                username,
                date_of_birth: new Date(date_of_birth)
            })
        )

        const user_id = result.insertedId.toString()
        const [access_token, refresh_token] = await Promise.all([this.signAccessToken(user_id), this.signRefreshToken(user_id)])

        return {
            access_token,
            refresh_token
        }
    }

    async checkEmailExist(email: string) {
        const user = await databaseServices.users.findOne({ email })
        return Boolean(user)
    }

    async login(payload: LoginReqBody) {
        const { email, password } = payload
        const user = await databaseServices.users.findOne({ email })

        if (!user) {
            throw new Error('User not found')
        }

        // const isPasswordValid = verifyPassword(payload.password, user.password)
        // if (!isPasswordValid) {
        //     throw new Error('Invalid password')
        // }

        const user_id = user._id.toString()
        const [access_token, refresh_token] = await Promise.all([
            this.signAccessToken(user_id),
            this.signRefreshToken(user_id)
        ])

        return {
            access_token,
            refresh_token
        }
    }
}

const usersService = new UsersService()
export default usersService