import { useState, useEffect } from 'react';

interface DataTableProps {
  searchTerm: string;
  sortBy: string;
  sortOrder: string;
}

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

export default function DataTable({ searchTerm, sortBy, sortOrder }: DataTableProps) {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 50,
    total: 0,
    totalPages: 0,
  });
  const [loading, setLoading] = useState(false);

  const fetchPatients = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        search: searchTerm,
        sortBy,
        sortOrder,
      });

      const response = await fetch(`/api/data?${params}`);
      const data = await response.json();
      
      setPatients(data.data);
      setPagination(data.pagination);
    } catch (error) {
      console.error('Error fetching patients:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.page, searchTerm, sortBy, sortOrder]);

  const handlePageChange = (newPage: number) => {
    setPagination(prev => ({ ...prev, page: newPage }));
  };

  const getMedicalIssueColor = (issue: string) => {
    const colors: Record<string, string> = {
      'fever': 'bg-[#DC262666] border border-[#FF0000]',
      'headache': 'bg-[#F57C0B80] border border-[#EA7100]',
      'sore throat': 'bg-[#EAB30880] border border-[#BA8D00]',
      'sprained ankle': 'bg-[#10B98180] border border-[#03A972]',
      'rash': 'bg-[#EC489980] border border-[#EC4899]',
      'ear infection': 'bg-[#06B6D480] border border-[#00A2BD]',
    };
    return colors[issue.toLowerCase()] || 'bg-gray-100 border border-gray-400 text-gray-800';
  };

  const toTitleCase = (str: string) => {
    return str.toLowerCase().replace(/\b\w/g, (letter: string) => letter.toUpperCase());
  };

  if (loading) {
    return <div className="flex justify-center p-8">
      <div className="text-lg">Loading patients...</div>
    </div>;
  }

  return (
    <div className="bg-white">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left p-4 font-medium text-blue-600">ID</th>
              <th className="text-left p-4 font-medium text-blue-600">Name</th>
              <th className="text-left p-4 font-medium text-blue-600">Age</th>
              <th className="text-left p-4 font-medium text-blue-600">Medical Issue</th>
              <th className="text-left p-4 font-medium text-blue-600">Address</th>
              <th className="text-left p-4 font-medium text-blue-600">Phone Number</th>
              <th className="text-left p-4 font-medium text-blue-600">Email ID</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.patient_id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="p-4 text-sm font-mono">ID-{patient.patient_id.toString().padStart(4, '0')}</td>
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                      <img 
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(patient.patient_name)}&background=random&size=40`}
                        alt={patient.patient_name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const nextSibling = target.nextSibling as HTMLElement;
                          if (nextSibling) nextSibling.style.display = 'flex';
                        }}
                      />
                      <span className="text-xs text-gray-600 font-semibold" style={{display: 'none'}}>
                        {patient.patient_name.split(' ').map((n: string) => n[0]).join('')}
                      </span>
                    </div>
                    <span className="font-medium">{patient.patient_name}</span>
                  </div>
                </td>
                <td className="p-4">
                  <span className=" text-black rounded text-sm">
                    Age {patient.age}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-sm ${getMedicalIssueColor(patient.medical_issue)}`}>
                    {toTitleCase(patient.medical_issue)}
                  </span>
                </td>
                <td className="p-4 text-sm">{patient.contact[0]?.address || 'N/A'}</td>
                <td className="p-4 text-sm">
                  {patient.contact[0]?.number ? (
                    <span>{patient.contact[0].number}</span>
                  ) : (
                    <span className="text-red-500">N/A</span>
                  )}
                </td>
                <td className="p-4 text-sm">
                  {patient.contact[0]?.email ? (
                    <span>{patient.contact[0].email}</span>
                  ) : (
                    <span className="text-red-500">N/A</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200">
        <div className="text-sm text-gray-700">
          Showing {(pagination.page - 1) * pagination.limit + 1} to{' '}
          {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} results
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handlePageChange(pagination.page - 1)}
            disabled={pagination.page <= 1}
            className="px-3 py-1 text-sm border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Previous
          </button>
          
          <div className="flex items-center space-x-1">
            {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
              const pageNumber = pagination.page - 2 + i;
              if (pageNumber < 1 || pageNumber > pagination.totalPages) return null;
              
              return (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`px-3 py-1 text-sm border rounded ${
                    pageNumber === pagination.page
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}
          </div>
          
          <button
            onClick={() => handlePageChange(pagination.page + 1)}
            disabled={pagination.page >= pagination.totalPages}
            className="px-3 py-1 text-sm border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
