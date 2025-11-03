export interface LoginRequest {
	email: string;
	password: string;
}

export interface RegisterRequest {
	username: string;
	email: string;
	password: string;
}

export interface AuthResponse {
	token: string;
	user: User;
}

export interface User {
	id: number;
	username: string;
	email: string;
}
