export interface ResponseLoginModel {
    [x: string]: any;
    data?: boolean;
    email?: string;
    id?: React.ReactNode;
    status?: number;
    success?: boolean;
    token: string;
    password?: string;
}

export interface LoginModel {
    email: string;
    password: string;
}
    