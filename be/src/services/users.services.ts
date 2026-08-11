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
}

const usersService = new UsersService()
export default usersService