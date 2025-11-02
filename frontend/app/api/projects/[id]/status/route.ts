import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = 'http://localhost:8080/api';

function getAuthHeaders(request: NextRequest) {
  const token = request.headers.get('authorization');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': token })
  };
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const status = await request.json();
    
    const response = await fetch(`${BACKEND_URL}/projects/${params.id}/status`, {
      method: 'PATCH',
      headers: getAuthHeaders(request),
      body: JSON.stringify(status),
    });
    
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update project status' }, { status: 500 });
  }
}