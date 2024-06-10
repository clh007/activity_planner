export interface LoginForm {
    account: string
    password: string
}

export interface RegisterForm {
    username: string
    password: string
    phone?: string
    email?: string
    code: string
}

export interface AddUserForm {
    username: string
    password: string
    userpwdagain: string
    phone?: string
    email?: string
    gender: number
    is_admin: number
}