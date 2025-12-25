import { UseCase, QuizStep, ServicePackage } from './types';

// IDs are used to look up translations: use_cases.{id}.title, etc.
export const USE_CASES: UseCase[] = [
  // Sales
  { id: 's1', category: 'Sales', title: '', description: '' },
  { id: 's2', category: 'Sales', title: '', description: '' },
  { id: 's3', category: 'Sales', title: '', description: '' },
  // Support
  { id: 'su1', category: 'Support', title: '', description: '' },
  { id: 'su2', category: 'Support', title: '', description: '' },
  { id: 'su3', category: 'Support', title: '', description: '' },
  // Ops
  { id: 'op1', category: 'Ops', title: '', description: '' },
  { id: 'op2', category: 'Ops', title: '', description: '' },
  { id: 'op3', category: 'Ops', title: '', description: '' },
  // HR
  { id: 'hr1', category: 'HR', title: '', description: '' },
  { id: 'hr2', category: 'HR', title: '', description: '' },
  { id: 'hr3', category: 'HR', title: '', description: '' },
  // Finance
  { id: 'fi1', category: 'Finance', title: '', description: '' },
  { id: 'fi2', category: 'Finance', title: '', description: '' },
  { id: 'fi3', category: 'Finance', title: '', description: '' },
  // Legal
  { id: 'le1', category: 'Legal', title: '', description: '' },
  { id: 'le2', category: 'Legal', title: '', description: '' },
  // IT
  { id: 'it1', category: 'IT', title: '', description: '' },
  { id: 'it2', category: 'IT', title: '', description: '' },
  { id: 'it3', category: 'IT', title: '', description: '' },
  // Marketing
  { id: 'mk1', category: 'Marketing', title: '', description: '' },
  { id: 'mk2', category: 'Marketing', title: '', description: '' },
  { id: 'mk3', category: 'Marketing', title: '', description: '' },
  // Logistics
  { id: 'lg1', category: 'Logistics', title: '', description: '' },
  { id: 'lg2', category: 'Logistics', title: '', description: '' },
];

export const QUIZ_IDS = [1, 2, 3, 4, 5, 6];

export const PACKAGE_IDS = [0, 1, 2];