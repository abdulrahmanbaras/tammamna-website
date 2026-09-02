import type { TeamMember } from '@/types';

export const team: TeamMember[] = [
  {
    name: 'Ziyad Qasim',
    role: 'Founder & Principal Engineer',
    initials: 'ZQ',
    focus: 'Distributed systems, financial platforms',
    accent: ['#ff5fa2', '#c74bff'],
  },
  {
    name: 'Abdulrahman Ali',
    role: 'Head of Engineering',
    initials: 'AA',
    focus: 'Platform architecture, delivery',
    accent: ['#7b5cff', '#3d8bff'],
  },
  {
    name: 'Lina Al-Otaibi',
    role: 'Design Director',
    initials: 'LO',
    focus: 'Design systems, research',
    accent: ['#ffc8a2', '#ff5fa2'],
  },
  {
    name: 'Faris Al-Ghamdi',
    role: 'Principal Mobile Engineer',
    initials: 'FG',
    focus: 'React Native, offline-first',
    accent: ['#c74bff', '#7b5cff'],
  },
  {
    name: 'Sarah Al-Harbi',
    role: 'Head of AI Engineering',
    initials: 'SH',
    focus: 'Retrieval, evaluation, guardrails',
    accent: ['#8ef0c0', '#3d8bff'],
  },
  {
    name: 'Majed Al-Qahtani',
    role: 'Principal Platform Engineer',
    initials: 'MQ',
    focus: 'Kubernetes, observability, FinOps',
    accent: ['#3d8bff', '#8ef0c0'],
  },
  {
    name: 'Nouf Al-Dossari',
    role: 'Delivery Lead',
    initials: 'ND',
    focus: 'Discovery, scope shaping',
    accent: ['#ff5fa2', '#ffc8a2'],
  },
  {
    name: 'Omar Bin Saleh',
    role: 'Staff Engineer, Frontend',
    initials: 'OS',
    focus: 'Performance, accessibility',
    accent: ['#c74bff', '#8ef0c0'],
  },
];

export const timeline = [
  { year: '2016', title: 'Founded in Makkah', detail: 'Three engineers, one client, and a rule about writing decisions down.' },
  { year: '2018', title: 'First regulated platform', detail: 'A payments integration that taught us how much of this work is evidence, not code.' },
  { year: '2020', title: 'Design brought in-house', detail: 'Designers moved into the same repository as engineers. Handover disappeared.' },
  { year: '2022', title: 'Riyadh delivery studio', detail: 'A second timezone, opened because clients asked, not because we wanted a map pin.' },
  { year: '2023', title: 'AI engineering practice', detail: 'Formed around evaluation and guardrails after watching a lot of demos fail in production.' },
  { year: '2025', title: 'Twenty-plus, still senior-weighted', detail: 'Fifty products shipped. Same rule about writing things down.' },
];
