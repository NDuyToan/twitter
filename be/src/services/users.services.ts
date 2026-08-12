import User from "~/models/schemas/User.schema";
import databaseServices from "./database.services";

class UsersService {
    async register(payload: { email: string, password: string }) {
        const { email, password } = payload
        const result = await databaseServices.users.insertOne(
            new User({
                email,
                password
            })
        )

        return result
    }

    async checkEmailExist(email: string) {
        const user = await databaseServices.users.findOne({ email })
        return Boolean(user)
    }
}

const usersService = new UsersService()
export default usersService