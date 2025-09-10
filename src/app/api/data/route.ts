import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface Patient {
  patient_id: number;
  patient_name: string;
  age: number;
  photo_url: string | null;
  contact: Array<{
    address?: string;
    number?: string;
    email?: string;
  }>;
  medical_issue: string;
}

export async function GET(request: NextRequest) {
  try {
    const filePath = path.join(process.cwd(), 'src/data/data.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const allPatients: Patient[] = JSON.parse(fileContents);

    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '50');
    const search = url.searchParams.get('search') || '';
    const sortBy = url.searchParams.get('sortBy') || 'none';
    const sortOrder = url.searchParams.get('sortOrder') || 'none';

    // Filter data based on search
    let filteredPatients = allPatients;
    if (search) {
      filteredPatients = allPatients.filter((patient: Patient) =>
        patient.patient_name.toLowerCase().includes(search.toLowerCase()) ||
        patient.medical_issue.toLowerCase().includes(search.toLowerCase()) ||
        patient.contact[0]?.address?.toLowerCase().includes(search.toLowerCase())
      );
    }

    // First sort: Apply field-specific sort if sortBy is selected
    if (sortBy !== 'none') {
      filteredPatients.sort((a: Patient, b: Patient) => {
        let aValue = a[sortBy as keyof Patient];
        let bValue = b[sortBy as keyof Patient];
        
        // Handle null/undefined values
        if (!aValue) aValue = '';
        if (!bValue) bValue = '';
        
        if (sortBy === 'age') {
          return (aValue as number) - (bValue as number); // Always ascending for field sort
        }
        
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return aValue.localeCompare(bValue); // Always ascending for field sort
        }
        
        return 0;
      });
    }

    // Second sort: Apply ID-based sort if sortOrder is selected
    if (sortOrder !== 'none') {
      filteredPatients.sort((a: Patient, b: Patient) => {
        const aId = a.patient_id;
        const bId = b.patient_id;
        
        if (sortOrder === 'asc') {
          return aId - bId; // ID Low to High
        } else {
          return bId - aId; // ID High to Low
        }
      });
    }

    // Paginate
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedPatients = filteredPatients.slice(startIndex, endIndex);

    return NextResponse.json({
      data: paginatedPatients,
      pagination: {
        page,
        limit,
        total: filteredPatients.length,
        totalPages: Math.ceil(filteredPatients.length / limit),
      }
    });

  } catch (error) {
    console.error('Error reading data:', error);
    return NextResponse.json(
      { error: 'Failed to load patients data' },
      { status: 500 }
    );
  }
}
