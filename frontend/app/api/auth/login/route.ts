import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = "http://localhost:8080/api";

export async function POST(request: NextRequest) {
	try {
		const { email, password } = await request.json();
		const loginField = email;

		if (!loginField || !password) {
			return NextResponse.json(
				{ error: "Username and password are required" },
				{ status: 400 }
			);
		}

		const response = await fetch(`${BACKEND_URL}/auth/login`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ username: loginField, password }),
		});

		const data = await response.json();

		if (response.ok) {
			return NextResponse.json(data);
		} else {
			return NextResponse.json(
				{ error: data.message || "Login failed" },
				{ status: response.status }
			);
		}
	} catch (error) {
		console.error("Login error:", error);
		return NextResponse.json({ error: "Network error" }, { status: 500 });
	}
}
