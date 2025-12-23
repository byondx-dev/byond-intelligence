import { UseCase, QuizStep, ServicePackage } from './types';

export const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'Solutions', path: '/solutions' },

  { label: 'Contact', path: '/contact' },
];

export const USE_CASES: UseCase[] = [
  // Sales
  { id: 's1', category: 'Sales', title: 'Lead Scoring AI', description: 'Automatische Qualifizierung von Inbound-Leads basierend auf Interaktionsdaten.', roi: '+30% Conversion Rate' },
  { id: 's2', category: 'Sales', title: 'Hyper-Personalized Outreach', description: 'Generierung individueller Ansprachen für Cold-Calls/Mails.', roi: '2x Reply Rate' },
  { id: 's3', category: 'Sales', title: 'Proposal Generator', description: 'Erstellt maßgeschneiderte Angebote aus CRM-Daten in Sekunden.', roi: '-80% Zeitaufwand' },
  // Support
  { id: 'su1', category: 'Support', title: 'L1 Support Bot', description: 'Löst 60% der Standardanfragen autonom via Chat/Mail.', roi: '-40% Ticket Volume' },
  { id: 'su2', category: 'Support', title: 'Ticket Triage & Routing', description: 'KI analysiert Sentiment und Dringlichkeit zur Zuweisung.', roi: 'Schnellere Resolution Time' },
  { id: 'su3', category: 'Support', title: 'QA Summaries', description: 'Fasst lange Support-Threads für Nachfolger/Management zusammen.' },
  // Ops
  { id: 'op1', category: 'Ops', title: 'Invoice Automation', description: 'Auslesen und Verbuchen von Rechnungen (OCR + LLM).', roi: '99% Genauigkeit' },
  { id: 'op2', category: 'Ops', title: 'Stammdaten-Hygiene', description: 'Bereinigt Dubletten und füllt fehlende Felder im ERP.', roi: 'Saubere BI-Daten' },
  { id: 'op3', category: 'Ops', title: 'Mahnwesen-Copilot', description: 'Erstellt kontextsensitive Zahlungserinnerungen.' },
  // HR
  { id: 'hr1', category: 'HR', title: 'Resume Screener', description: 'Matcht CVs gegen Job-Requirements und rankt Kandidaten.', roi: '-50% Screening Zeit' },
  { id: 'hr2', category: 'HR', title: 'Onboarding Buddy', description: 'Interaktiver Bot für alle Fragen neuer Mitarbeiter.', roi: 'Schnellere Productivity' },
  { id: 'hr3', category: 'HR', title: 'Policy Q&A', description: 'Mitarbeiter chatten mit dem Handbuch/Richtlinien.' },
  // Finance
  { id: 'fi1', category: 'Finance', title: 'Cashflow Forecasting', description: 'Predictive Analytics für Liquiditätsengpässe.', roi: 'Bessere Planungssicherheit' },
  { id: 'fi2', category: 'Finance', title: 'Anomaly Detection', description: 'Erkennt ungewöhnliche Buchungen in Echtzeit.', roi: 'Fraud Prevention' },
  { id: 'fi3', category: 'Finance', title: 'Monatsabschluss Assist', description: 'Automatisiert Abgrenzungen und Report-Erstellung.' },
  // Legal
  { id: 'le1', category: 'Legal', title: 'Contract Analysis', description: 'Extrahiert Klauseln und Risiken aus Verträgen.', roi: 'Risikominimierung' },
  { id: 'le2', category: 'Legal', title: 'DSGVO Workflow', description: 'Automatisiert Auskunftsersuchen und Löschungen.' },
  // IT
  { id: 'it1', category: 'IT', title: 'Incident Summarizer', description: 'Erstellt Post-Mortems aus Logs und Chats.', roi: 'Faster Learning' },
  { id: 'it2', category: 'IT', title: 'Log Intelligence', description: 'Erkennt Muster in Server-Logs bevor Systemausfall.' },
  { id: 'it3', category: 'IT', title: 'SecOps Assistant', description: 'Priorisiert Security Alerts für Analysten.' },
  // Marketing
  { id: 'mk1', category: 'Marketing', title: 'Content Engine', description: 'Erstellt Blog/Social Posts im Brand Voice.', roi: 'Scale Output' },
  { id: 'mk2', category: 'Marketing', title: 'SEO Brief Generator', description: 'Analysiert Top-Resultate und erstellt Briefings.' },
  { id: 'mk3', category: 'Marketing', title: 'Creative Variants', description: 'Generiert Ad-Copy Varianten für A/B Tests.' },
  // Logistics
  { id: 'lg1', category: 'Logistics', title: 'Predictive Maintenance', description: 'Sagt Maschinenausfälle voraus.', roi: 'Less Downtime' },
  { id: 'lg2', category: 'Logistics', title: 'Route Optimization', description: 'Plant dynamische Routen basierend auf Traffic/Wetter.' },
];

export const QUIZ_STEPS: QuizStep[] = [
  { id: 1, question: "In welcher Branche sind Sie tätig?", options: ["Produktion / Logistik", "SaaS / Tech", "Dienstleistung / Agentur", "Handel / E-Commerce"] },
  { id: 2, question: "Wie groß ist Ihr Team?", options: ["1-10", "11-50", "51-200", "200+"] },
  { id: 3, question: "Wo drückt der Schuh am meisten?", options: ["Zu hohe Prozesskosten", "Fachkräftemangel / Zeit", "Fehlende Daten-Transparenz", "Skalierungsprobleme"] },
  { id: 4, question: "Wie ist Ihre Datenlage?", options: ["Chaos / Excel", "Solides ERP/CRM", "Data Warehouse vorhanden", "Silos (viele Tools)"] },
  { id: 5, question: "Automatisierungsgrad heute?", options: ["Alles manuell", "Erste Zaps/Skripte", "Teilautomatisiert", "Hochentwickelt"] },
  { id: 6, question: "Compliance Anforderungen?", options: ["Standard (DSGVO)", "Hoch (Fin/Health)", "Internationale Normen", "Gering"] },
];

export const PACKAGES: ServicePackage[] = [
  {
    title: "Discovery Audit",
    price: "Ab €2.500",
    duration: "2 Wochen",
    outcome: "Status Quo & Roadmap",
    features: ["Prozess-Analyse", "Data Readiness Check", "ROI Kalkulation", "Tech Stack Empfehlung"]
  },
  {
    title: "Pilot Sprint",
    price: "Ab €9.000",
    duration: "4-6 Wochen",
    outcome: "MVP / Proof of Concept",
    features: ["1 Use Case Umsetzung", "Agent/Automation Build", "Team Onboarding", "Performance Review"]
  },
  {
    title: "Enterprise Transformation",
    duration: "3-12 Monate",
    outcome: "Full AI Integration",
    features: ["Custom AI Agents", "RAG Pipeline Setup", "Governance & Security", "Internal Enablement Academy"]
  }
];