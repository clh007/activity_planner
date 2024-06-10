export interface currentUser {
    id: number;
    username: string;
    phone: string;
    email: string;
    gender: string;
    avatar: string;
    create_time: string;
    update_time: string;
}

export interface UpdatePasswordForm{
    userid: number;
    new_password: string;
    confirmPassword: string;
}