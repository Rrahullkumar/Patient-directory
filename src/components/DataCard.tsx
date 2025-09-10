import { useState, useEffect } from 'react';

export default function DataCards({ searchTerm, sortBy, sortOrder }) {
    const [patients, setPatients] = useState([]);
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
    }, [pagination.page, searchTerm, sortBy, sortOrder]);

    const handlePageChange = (newPage) => {
        setPagination(prev => ({ ...prev, page: newPage }));
    };

    const toTitleCase = (str) => {
        return str.toLowerCase().replace(/\b\w/g, (letter) => letter.toUpperCase());
    };

    const getMedicalIssueColor = (issue) => {
        const colors = {
            'fever': 'bg-[#DC262666] border border-[#FF0000]',
            'headache': 'bg-[#F57C0B80] border border-[#EA7100]',
            'sore throat': 'bg-[#EAB30880] border border-[#BA8D00]',
            'sprained ankle': 'bg-[#10B98180] border border-[#03A972]',
            'rash': 'bg-[#EC489980] border border-[#EC4899]',
            'ear infection': 'bg-[#06B6D480] border border-[#00A2BD]',
        };
        return colors[issue.toLowerCase()] || 'bg-gray-100 border border-gray-400 text-gray-800';
    };

    if (loading) {
        return <div className="flex justify-center p-8">
            <div className="text-lg">Loading patients...</div>
        </div>;
    }

    return (
        <div className="bg-white">
            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
                {patients.map((patient) => (
                    <div key={patient.patient_id} className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow overflow-hidden">
                        {/* Patient Header with full width background */}
                        <div className="bg-[#B5D1FE82] p-6 pb-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                                        <img
                                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(patient.patient_name)}&background=random&size=48`}
                                            alt={patient.patient_name}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                                e.target.nextSibling.style.display = 'flex';
                                            }}
                                        />
                                        <span className="text-sm text-gray-600 font-semibold" style={{ display: 'none' }}>
                                            {patient.patient_name.split(' ').map(n => n[0]).join('')}
                                        </span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">{patient.patient_name}</h3>
                                        <p className="text-sm text-gray-500 font-mono">ID-{patient.patient_id.toString().padStart(4, '0')}</p>
                                    </div>
                                </div>

                                {/* Age Badge */}
                                <span className="px-3 py-2 bg-[#3B82F6] text-white rounded-full text-sm font-medium">
                                    Age {patient.age}
                                </span>
                            </div>
                        </div>

                        {/* Card Content */}
                        <div className="p-6 pt-4">
                            {/* Medical Issue */}
                            <div className="mb-4">
                                <span className={`px-3 py-1 rounded text-sm font-medium ${getMedicalIssueColor(patient.medical_issue)}`}>
                                    {toTitleCase(patient.medical_issue)}
                                </span>
                            </div>

                            {/* Contact Information */}
                            <div className="space-y-2">
                                {/* Address */}
                                <div className="flex items-start space-x-2">
                                    <svg className="w-4 h-4 mt-0.5 text-gray-400 " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span className="text-sm ">
                                        {patient.contact[0]?.address || 'N/A'}
                                    </span>
                                </div>

                                {/* Phone */}
                                <div className="flex items-center space-x-2">
                                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    <span className="text-sm ">
                                        {patient.contact[0]?.number || <span className="text-red-500">N/A</span>}
                                    </span>
                                </div>

                                {/* Email */}
                                <div className="flex items-center space-x-2">
                                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 8V16a2 2 0 01-2 2H5a2 2 0 01-2-2V8m18 0l-9 5L3 8m18 0V7a2 2 0 00-2-2H5a2 2 0 00-2-2v1" />
                                    </svg>

                                    <span className="text-sm  truncate">
                                        {patient.contact[0]?.email || <span className="text-red-500">N/A</span>}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                ))}
            </div>

            {/* Pagination - Same as table */}
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
                                    className={`px-3 py-1 text-sm border rounded ${pageNumber === pagination.page
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
