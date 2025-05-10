export interface User {
    id: number;
    email: string;
    password: string;
    role: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    token?: string;
    success: boolean;
    message: string;
}
