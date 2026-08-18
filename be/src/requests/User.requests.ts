export interface RegisterReqBody {
    username: string
    email: string
    password: string
    confirm_password: string
    date_of_birth: string
}

export interface LoginReqBody {
    email: string
    password: string
}