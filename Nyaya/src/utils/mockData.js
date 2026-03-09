/**
 * Mock case data used on the Case Analysis Results page.
 * Provides sample FIR analysis including parties, legal basis,
 * timeline, and plain-language explanation.
 */

export const mockCaseData = {
    title: 'State vs. Sharma & Ors.',
    caseNumber: 'FIR No. 2024/1087',
    court: 'Sessions Court, New Delhi',
    date: '2024-11-15',

    /* AI-generated summary */
    overview:
        'This case involves allegations of financial fraud, criminal breach of trust, and corruption against three individuals employed in a state-run infrastructure project. ' +
        'The First Information Report details systematic misappropriation of project funds through falsified procurement records, shell company transactions, and unauthorized fund diversions totaling ₹4.7 Crore over a period of 18 months.',

    /* Parties involved */
    parties: {
        petitioner: {
            name: 'State of Delhi',
            represented: 'Public Prosecutor, Mr. Rajesh Kumar',
        },
        respondents: [
            { name: 'Mr. Vikram Sharma', role: 'Project Director' },
            { name: 'Ms. Anita Gupta', role: 'Finance Officer' },
            { name: 'Mr. Suresh Patel', role: 'Procurement Head' },
        ],
    },

    /* Legal sections cited */
    legalBasis: [
        { code: 'IPC 420', description: 'Cheating and dishonestly inducing delivery of property' },
        { code: 'IPC 406', description: 'Criminal breach of trust' },
        { code: 'IPC 409', description: 'Criminal breach of trust by public servant' },
        { code: 'PC Act 13', description: 'Criminal misconduct by a public servant' },
        { code: 'IPC 120B', description: 'Criminal conspiracy' },
    ],

    /* Plain-language explanation */
    simpleExplanation:
        'In simple terms, three government officials have been accused of stealing public money meant for building roads and bridges. ' +
        'They allegedly created fake companies, submitted false bills, and diverted government funds into their personal accounts. ' +
        'The total amount involved is approximately ₹4.7 Crore. The law sections mentioned relate to cheating, breach of trust, corruption, and conspiracy — all of which are serious criminal offenses under Indian law.',

    /* Case timeline */
    timeline: [
        { date: '2024-06-12', title: 'Incident Reported', description: 'Whistleblower filed a complaint with the Anti-Corruption Bureau.' },
        { date: '2024-07-03', title: 'FIR Registered', description: 'FIR No. 2024/1087 registered at Sarojini Nagar PS.' },
        { date: '2024-08-15', title: 'Investigation Started', description: 'Special investigation team formed and document seizure conducted.' },
        { date: '2024-10-20', title: 'Arrests Made', description: 'All three accused arrested; bail denied by Sessions Court.' },
        { date: '2024-11-15', title: 'Charge Sheet Filed', description: 'Detailed charge sheet submitted with evidence to the court.' },
    ],
};
