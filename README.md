# Patient Directory Management System

🔗 **Live Demo**: [https://patient-directory-woic.vercel.app/](https://patient-directory-woic.vercel.app/)

A modern, responsive single-page application built with Next.js that provides comprehensive patient data management with dual-view interface, real-time search, and advanced filtering capabilities.

## ✅ Assignment Requirements Fulfilled

| Requirement | Status | Implementation |
|-------------|--------|----------------|
| **Next.js App Router** | ✅ | Latest Next.js 15 with App Router |
| **TypeScript** | ✅ | Full TypeScript implementation with strict typing |
| **TailwindCSS** | ✅ | Custom styling with utility classes |
| **Local API Endpoint** | ✅ | RESTful API serving 1000+ patient records |
| **Dual Views** | ✅ | Both table and card layouts implemented |
| **Search & Filter** | ✅ | Real-time search across multiple fields |
| **Sorting** | ✅ | Multi-field sorting with custom logic |
| **Pagination** | ✅ | 50 records per page with navigation |
| **Responsive Design** | ✅ | Mobile-first responsive implementation |
| **Custom Implementation** | ✅ | No external libraries for core functionality |

🏗️ Project Architecture
```src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   └── api/data/route.ts
├── components/
│   ├── Header.tsx
│   ├── ViewToggle.tsx
│   ├── DataTable.tsx
│   └── DataCards.tsx
└── data/
    └── data.json
```



## 🛠️ Technical Implementation

### API Endpoint
// GET /api/data - Supports pagination, search, and sorting
interface APIResponse {
data: Patient[];
pagination: {
page: number;
limit: number;
total: number;
totalPages: number;
};
}


### Data Structure
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

text


### Key Features
- **🔍 Real-time Search**: Search across patient names, medical conditions, and addresses
- **🔄 Advanced Sorting**: Sort by name, age, medical issue, or patient ID
- **📄 Smart Pagination**: Navigate through large datasets with intuitive controls
- **👀 Dual Views**: Switch between professional table and modern card layouts
- **🎨 Custom Styling**: Medical conditions with distinct visual color coding
- **📱 Responsive Design**: Mobile-first approach with adaptive layouts
- **⚡ Performance**: Optimized API queries and efficient React re-renders

### Medical Condition Color System
const medicalColors = {
'fever': 'bg-[#DC262666] border border-[#FF0000]',
'headache': 'bg-[#F57C0B80] border border-[#EA7100]',
'sore throat': 'bg-[#EAB30880] border border-[#BA8D00]',
'sprained ankle': 'bg-[#10B98180] border border-[#03A972]',
'rash': 'bg-[#EC489980] border border-[#EC4899]',
'ear infection': 'bg-[#06B6D480] border border-[#00A2BD]'
};


## 🚀 Getting Started

### Prerequisites
- Node.js 18 or higher
- npm or yarn package manager

### Installation
```Clone the repository
git clone https://github.com/Rrahullkumar/Patient-directory.git
cd Patient-directory

Install dependencies
npm install

Start development server
npm run dev
```

## 📱 Features Showcase

### Table View
- Sortable columns with visual indicators
- Patient avatars with fallback initials
- Color-coded medical condition badges
- Responsive column layout
- Hover effects and loading states

### Card View  
- Modern card design with patient profiles
- Medical condition badges with custom colors
- Contact information with intuitive icons
- Responsive grid layout (1-4 columns)
- Smooth hover transitions

### Search & Filter System
- Real-time search across multiple fields
- Debounced input for optimal performance
- Visual search and filter icons
- Persistent state across view switches
- Clear visual feedback for active filters

### Pagination
- 50 records per page for optimal performance
- Intuitive navigation with page numbers
- Previous/Next controls with disabled states
- Total results counter
- Smooth transitions between pages

## 🎯 Bonus Features Implemented

- ✅ **Both Views**: Complete table and card implementations
- ✅ **Responsive Design**: Mobile-first with adaptive breakpoints
- ✅ **TypeScript**: Comprehensive type safety throughout
- ✅ **Performance**: Efficient API queries and React optimizations
- ✅ **UI/UX**: Professional design with hover effects and transitions
- ✅ **Error Handling**: Graceful fallbacks and user feedback
- ✅ **Accessibility**: Semantic HTML and proper alt texts
- ✅ **Clean Code**: Modular architecture with separation of concerns

## 🔮 Future Enhancements

### Planned Features
- **Advanced Filtering**: Modal-based multi-criteria filter system
- **Export Functionality**: PDF/CSV export capabilities
- **Patient Management**: Add, edit, and delete patient records
- **Data Visualization**: Charts and analytics dashboard
- **Dark Mode**: Theme switching with user preference persistence
- **Infinite Scroll**: Alternative pagination approach
- **Offline Support**: PWA capabilities with data caching

### Technical Improvements
- **Unit Testing**: Jest and React Testing Library implementation
- **E2E Testing**: Playwright or Cypress integration
- **Performance Monitoring**: Analytics and Core Web Vitals tracking
- **SEO Optimization**: Meta tags and structured data
- **Internationalization**: Multi-language support
- **Advanced Search**: Fuzzy search and filters


## 🛡️ Error Handling

- **API Errors**: Graceful fallbacks with user-friendly messages
- **Network Issues**: Retry mechanisms and offline indicators
- **Data Validation**: Input sanitization and type checking
- **Loading States**: Skeleton screens and progress indicators
- **404 Handling**: Custom error pages with navigation options


---

## 🏆 Technical Excellence

This project demonstrates proficiency in:
- **Modern React Patterns**: Hooks, state management, component composition
- **Next.js App Router**: File-based routing, API routes, server components
- **TypeScript**: Interface design, type safety, generic types
- **API Design**: RESTful principles, pagination, error handling
- **UI/UX Design**: Responsive layouts, accessibility, user feedback
- **Performance**: Optimization strategies, efficient rendering
- **Code Quality**: Clean architecture, separation of concerns, maintainability

## 📧 Submission Details
- 🔗 Live Demo: [https://patient-directory-woic.vercel.app](https://patient-directory-woic.vercel.app)
- 📂 GitHub Repo: [https://github.com/Rrahullkumar/Patient-directory](https://github.com/Rrahullkumar/Patient-directory)
- 📩 Contact: rahulkr811844@gmail.com


Built with attention to detail, following industry best practices, and designed for scalability and maintenance.

