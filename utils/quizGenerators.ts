export type QuizAnswers = Record<number, string>;

// Helper to get random index
const getRandomIndex = (length: number) => Math.floor(Math.random() * length);

// Mappings from UI strings (EN & DE) to Keys
const INDUSTRY_MAP: Record<string, string> = {
    "Produktion / Logistik": "production",
    "Production / Logistics": "production",
    "SaaS / Tech": "saas",
    "Dienstleistung / Agentur": "agency",
    "Service / Agency": "agency",
    "Handel / E-Commerce": "retail",
    "Retail / E-Commerce": "retail"
};

const PAIN_MAP: Record<string, string> = {
    // DE
    "Zu hohe Prozesskosten": "costs",
    "Fachkräftemangel / Zeit": "time",
    "Fehlende Daten-Transparenz": "transparency",
    "Skalierungsprobleme": "scaling",
    // EN
    "Process costs too high": "costs",
    "Labor shortage / Time": "time",
    "Lack of data transparency": "transparency",
    "Scaling issues": "scaling"
};

const DATA_MAP: Record<string, string> = {
    // DE
    "Chaos / Excel": "chaos",
    "Solides ERP/CRM": "erp",
    "Data Warehouse vorhanden": "warehouse",
    "Silos (viele Tools)": "silos",
    // EN
    "Solid ERP/CRM": "erp",
    "Data Warehouse exists": "warehouse",
    "Silos (many tools)": "silos"
};

export const generateAnalysis = (answers: QuizAnswers) => {
    // Step 1: Industry
    // Step 3: Pain
    // Step 4: Data

    // Normalize keys (fallback to default if not found)
    const industryKey = INDUSTRY_MAP[answers[1]] || "agency";
    const painKey = PAIN_MAP[answers[3]] || "time";
    const dataKey = DATA_MAP[answers[4]] || "chaos";

    // Select random variant index (0-4)
    // We assume 5 variants exist for each, as implemented in translation.json
    const hookIdx = getRandomIndex(5);
    const painIdx = getRandomIndex(5);
    const dataIdx = getRandomIndex(5);
    const closeIdx = getRandomIndex(5);

    return {
        // We return an array of keys that the UI will translate and join
        mainTextKeys: [
            `analysis.hooks.${industryKey}.${hookIdx}`,
            `analysis.pains.${painKey}.${painIdx}`
        ],
        subTextKeys: [
            `analysis.solutions.${dataKey}.${dataIdx}`,
            `analysis.closings.${closeIdx}`
        ],
        tags: [answers[1], answers[3], answers[4]].filter(Boolean) // Keep original selected text for tags
    };
};
