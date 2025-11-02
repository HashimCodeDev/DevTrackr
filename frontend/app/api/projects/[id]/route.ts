import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = 'http://localhost:8080/api';

function getAuthHeaders(request: NextRequest) {
  const token = request.headers.get('authorization');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': token })
  };
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const response = await fetch(`${BACKEND_URL}/projects/${params.id}`, {
      headers: getAuthHeaders(request)
    });
    const data = await response.json();
    
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch project' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    
    const response = await fetch(`${BACKEND_URL}/projects/${params.id}`, {
      method: 'PUT',
      headers: getAuthHeaders(request),
      body: JSON.stringify(body),
    });
    
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const response = await fetch(`${BACKEND_URL}/projects/${params.id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(request)
    });
    
    return NextResponse.json({}, { status: response.status });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}