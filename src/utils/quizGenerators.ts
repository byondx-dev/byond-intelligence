export type QuizAnswers = Record<number, string>;

// Helper to get random array item
const getRandom = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

// Dictionaries for dynamic text generation
// We focus on Steps 1 (Industry), 3 (Pain), 4 (Data) based on the requirement.

const HOOKS: Record<string, string[]> = {
    "Produktion / Logistik": [
        "In der Produktion zählt jede Sekunde.",
        "Logistik ist heute ein Daten-Business.",
        "Effizienz in der Lieferkette ist Ihr Hebel.",
        "Maschinen laufen, aber die Prozesse stocken?",
        "Die Industrie 4.0 wartet nicht."
    ],
    "SaaS / Tech": [
        "Tech-Teams sollten coden, nicht verwalten.",
        "Skalierung braucht Automation, kein Micromanagement.",
        "SaaS lebt von Geschwindigkeit.",
        "Ihr Stack ist modern, aber die Ops sind manuell?",
        "Growth Hacking beginnt bei internen Prozessen."
    ],
    "Dienstleistung / Agentur": [
        "Stunden verkaufen ist gut, Ergebnisse automatisieren ist besser.",
        "Agentur-Alltag: Kreativität statt Admin-Chaos.",
        "Ihre Kunden zahlen für Leistung, nicht für Verwaltung.",
        "Zeit ist Ihre wertvollste Ressource.",
        "Service-Exzellenz braucht smarte Prozesse."
    ],
    "Handel / E-Commerce": [
        "E-Commerce schläft nie, Ihre Prozesse sollten es auch nicht.",
        "Margen im Handel werden durch Effizienz gewonnen.",
        "Kundenerwartungen steigen schneller als Ihr Team wächst.",
        "Vom Lager bis zum Kunden: Daten müssen fließen.",
        "Retail is Detail – und Automation."
    ]
};

const PAIN_BRIDGES: Record<string, string[]> = {
    "Zu hohe Prozesskosten": [
        "Hohe Prozesskosten fressen Ihre Marge auf.",
        "Jeder manuelle Klick kostet Sie bares Geld.",
        "Ihre OpEx ist höher als nötig.",
        "Ineffizienz verbrennt Ihr Budget jeden Monat.",
        "Kosten senken heißt heute: Prozesse automatisieren."
    ],
    "Fachkräftemangel / Zeit": [
        "Gute Leute sind schwer zu finden – entlasten Sie Ihr bestes Team.",
        "Ihr Team ertrinkt in Routineaufgaben?",
        "Zeit für strategische Arbeit fehlt oft komplett.",
        "Burnout durch Admin-Tasks ist ein echtes Risiko.",
        "Recruiting ist teuer, Automation ist skalierbar."
    ],
    "Fehlende Daten-Transparenz": [
        "Blindflug ist im modernen Markt tödlich.",
        "Ohne Echtzeit-Daten treffen Sie Entscheidungen aus dem Bauch.",
        "Daten-Silos verhindern den 360-Grad-Blick.",
        "Sie sitzen auf Daten, nutzen sie aber nicht.",
        "Transparenz ist der erste Schritt zur Optimierung."
    ],
    "Skalierungsprobleme": [
        "Wachstum bringt Chaos, wenn die Systeme nicht mitwachsen.",
        "Manuelle Prozesse skalieren nicht linear.",
        "Mehr Umsatz sollte nicht mehr Kopfschmerzen bedeuten.",
        "Bottlenecks bremsen Ihre Expansion aus.",
        "Skalierung braucht digitale Fließbänder."
    ]
};

const DATA_SOLUTIONS: Record<string, string[]> = {
    "Chaos / Excel": [
        "Excel ist kein Datenbank-Ersatz. Wir strukturieren Ihr Chaos.",
        "Verabschieden Sie sich von fehleranfälligen Spreadsheets.",
        "Wir verwandeln Ihre Tabellen-Wüsten in strukturierte Daten.",
        "Excel war gestern. Intelligente Datenbanken sind heute.",
        "Aus Chaos machen wir Gold (Daten)."
    ],
    "Solides ERP/CRM": [
        "Ihr ERP ist stark, aber nutzen Sie die API-Power voll aus?",
        "Ein gutes CRM ist erst der Anfang – die Verknüpfung bringt den Wert.",
        "Lassen Sie Ihr ERP endlich mit anderen Tools sprechen.",
        "Ihr Systemfundament ist gut. Jetzt bauen wir die Intelligenz darauf.",
        "ERP-Daten sind der Treibstoff für unsere AI-Agents."
    ],
    "Data Warehouse vorhanden": [
        "Perfekte Ausgangslage! Wir setzen KI direkt auf Ihr Warehouse.",
        "Sie haben die Daten – wir liefern die prädiktive Intelligenz.",
        "Ihr Data Warehouse ist bereit für den nächsten Level: AI.",
        "Vom Speichern zum Handeln: Wir aktivieren Ihre Assets.",
        "High-End Setup! Hier können wir maximale Automation herausholen."
    ],
    "Silos (viele Tools)": [
        "Silos aufbrechen ist unsere Spezialität.",
        "Wir bauen die Brücken zwischen Ihren Insel-Lösungen.",
        "Kein Copy-Paste mehr zwischen Tools.",
        "Wir orchestrieren Ihre Tool-Landschaft zu einer Symphonie.",
        "Integration statt Isolation: Wir verbinden Ihre Welt."
    ]
};

const CLOSINGS = [
    "Sparen Sie Nerven und Zeit. Lassen Sie uns sprechen.",
    "Schluss mit Frust. Starten Sie die Automation.",
    "Ihr Potenzial ist riesig. Heben wir es gemeinsam.",
    "Werden Sie zum Vorreiter in Ihrer Branche.",
    "Der erste Schritt zur autonomen Firma beginnt hier."
];

export const generateAnalysis = (answers: QuizAnswers) => {
    // Map answers by Index (Step IDs are 1-based in the codebase)
    // Step 1: Industry
    // Step 2: Team Size (Not used in core text logic per request, relying on 1, 3, 4)
    // Step 3: Pain
    // Step 4: Data

    const industry = answers[1] || "Dienstleistung / Agentur"; // Fallback
    const pain = answers[3] || "Effizienz";
    const dataState = answers[4] || "Chaos";

    const hook = getRandom(HOOKS[industry] || HOOKS["Dienstleistung / Agentur"]);
    const painText = getRandom(PAIN_BRIDGES[pain] || ["Wir lösen Ihr Problem."]);
    const totalSolution = getRandom(DATA_SOLUTIONS[dataState] || ["Wir strukturieren Ihre Daten."]);
    const closing = getRandom(CLOSINGS);

    return {
        mainText: `${hook} ${painText}`,
        subText: `${totalSolution} ${closing}`,
        tags: [industry, pain, dataState] // For UI display
    };
};
