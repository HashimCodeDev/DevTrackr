import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = 'http://localhost:8080/api';

function getAuthHeaders(request: NextRequest) {
  const token = request.headers.get('authorization');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': token })
  };
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const queryString = searchParams.toString();
    
    const response = await fetch(`${BACKEND_URL}/projects?${queryString}`, {
      headers: getAuthHeaders(request)
    });
    const data = await response.json();
    
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const response = await fetch(`${BACKEND_URL}/projects`, {
      method: 'POST',
      headers: getAuthHeaders(request),
      body: JSON.stringify(body),
    });
    
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}