import type { Project } from '@/types';
export const projects: Project[] = [
  {
    slug: 'devflow', title: 'DevFlow', subtitle: 'Full-Stack Developer Productivity Dashboard',
    techStack: ['React 19', 'TypeScript', 'FastAPI', 'Python 3.12', 'PostgreSQL', 'pgvector', 'Redis', 'Docker', 'GitHub Actions', 'Vercel', 'Oracle Cloud'],
    highlights: [
      'Designed and shipped a developer productivity platform with reusable React 19 and TypeScript interfaces for snippets, markdown notes, semantic search, AI workflows, GitHub analytics, and HTTP API testing.',
      'Built accessible, responsive UI components using semantic HTML, keyboard navigation, ARIA attributes, route-level code splitting, and lazy loading to improve maintainability and frontend performance.',
      'Integrated React workflows with FastAPI REST APIs and implemented authentication, loading, empty, error, and cancellation states for data-driven interactions.',
      'Structured frontend state with Redux Toolkit and connected the UI to PostgreSQL-backed application services while maintaining clear separation between presentation and data concerns.',
      'Implemented AI-assisted product workflows with streaming Server-Sent Events and provider-backed APIs, including frontend handling for progressive responses and client disconnects.',
    ],
    links: { live: 'https://devflow-om.vercel.app' }, images: ['/screenshots/devflow_screenshot.png'], featured: true, accentColor: '#63e9ed',
  },
  {
    slug: 'reviewpilot', title: 'ReviewPilot', subtitle: 'AI-Powered GitHub Pull Request Review Platform',
    techStack: ['GitHub App', 'Python', 'FastAPI', 'PostgreSQL', 'LLMs', 'Vercel', 'Oracle Cloud', 'Gemini'],
    highlights: [
      'Built the dashboard interface for an AI-powered GitHub pull request review platform that analyzes code changes, surfaces inline review feedback, and tracks review-quality metrics.',
      'Developed reusable UI patterns for review results, status states, metrics, and developer feedback while integrating frontend workflows with backend APIs.',
      'Designed frontend handling for asynchronous review processing, loading states, validation feedback, and long-running AI-generated results.',
      'Supported a review engine evaluated against 31 labeled pull requests, with production review latency targeted below 60 seconds.',
    ],
    links: { live: 'https://reviewpilot-om.vercel.app' }, images: ['/screenshots/reviewpilot_screenshot.png'], featured: true, accentColor: '#a88cff',
  },
  {
    slug: 'hiremytalent', title: 'HireMyTalent', subtitle: 'Actors Booking Marketplace',
    techStack: ['Next.js 16', 'TypeScript', 'FastAPI', 'SQLAlchemy 2.0', 'PostgreSQL 16', 'Vercel Blob', 'JWT', 'GitHub Actions'],
    highlights: [
      'Built a high-fidelity talent marketplace frontend using Next.js 16, TypeScript, Server Components, and Server Actions for talent discovery, profiles, applications, messaging, booking, and project tracking.',
      'Implemented an environment-aware avatar processing workflow with Sharp and Vercel Blob, supporting 800x800 WebP output, local fallback, content-type validation, and 5 MB upload limits.',
      'Designed Next.js caching and targeted revalidation for talent discovery and public profiles, balancing UI freshness with frontend performance.',
      'Implemented PostgreSQL-backed full-text search with faceted filters and cursor-based pagination through API integrations, enabling scalable talent discovery.',
      'Built role-aware navigation and protected application flows using JWT/email-verification state while maintaining consistent responsive UI behavior.',
    ],
    links: { live: 'https://actors.hiremytalent.in' }, images: ['/screenshots/HireMyTalent_Screenshot.png'], featured: true, accentColor: '#80d9b4',
  },
];
