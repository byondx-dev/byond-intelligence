export interface UseCase {
  id: string;
  category: string;
  title: string;
  description: string;
  roi?: string;
}

export interface ServicePackage {
  title: string;
  price?: string;
  features: string[];
  duration: string;
  outcome: string;
}

export interface QuizStep {
  id: number;
  question: string;
  options: string[];
}

export interface NavItem {
  label: string;
  path: string;
}

export enum Theme {
  DARK = 'dark',
  LIGHT = 'light',
}