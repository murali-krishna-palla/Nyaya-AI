import { FileDown, Share2, User, Users, AlertCircle, FileText } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';
import CaseSummaryCard from '../components/CaseSummaryCard';
import LegalSectionBadge from '../components/LegalSectionBadge';
import Timeline from '../components/Timeline';
import { mockCaseData } from '../utils/mockData';

/**
 * AnalysisPage — Case Analysis Results page.
 * Shows real AI analysis when navigated from upload,
 * or the mock demo data otherwise.
 */
export default function AnalysisPage() {
    const location = useLocation();
    const realAnalysis = location.state?.analysis;
    const fileName = location.state?.fileName;

    // If we have a real analysis from the API, show it
    if (realAnalysis) {
        return (
            <div className="min-h-screen bg-theme-bg pt-24 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <FileText className="w-4 h-4 text-theme-accent" />
                                <p className="text-xs text-theme-text-muted font-medium">
                                    {fileName || 'Uploaded Document'}
                                </p>
                            </div>
                            <h1 className="text-xl sm:text-2xl font-bold text-theme-text">
                                AI Legal Analysis
                            </h1>
                        </div>
                        <Link
                            to="/upload"
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-theme-card border border-theme-border text-sm font-medium text-theme-text hover:bg-theme-input-bg transition-colors no-underline"
                        >
                            Analyze Another
                        </Link>
                    </div>

                    {/* Analysis Result */}
                    <CaseSummaryCard title="Document Analysis" subtitle="AI-generated legal analysis">
                        <div className="flex gap-3 p-4 rounded-xl bg-theme-accent/5 border border-theme-accent/20">
                            <AlertCircle className="w-5 h-5 shrink-0 text-theme-accent mt-0.5" />
                            <p className="text-sm text-theme-text-secondary leading-relaxed whitespace-pre-wrap">
                                {realAnalysis}
                            </p>
                        </div>
                    </CaseSummaryCard>

                    <p className="text-xs text-theme-text-muted mt-4 text-center italic">
                        This explanation is for informational purposes only and should not replace advice from a qualified lawyer.
                    </p>
                </div>
            </div>
        );
    }

    // Fallback: mock demo data
    const data = mockCaseData;

    return (
        <div className="min-h-screen bg-theme-bg pt-24 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                {/* ========== HEADER ========== */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                    <div>
                        <p className="text-xs text-theme-text-muted font-medium mb-1">
                            {data.caseNumber} · {data.court}
                        </p>
                        <h1 className="text-xl sm:text-2xl font-bold text-theme-text">{data.title}</h1>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                        <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-theme-card border border-theme-border text-sm font-medium text-theme-text hover:bg-theme-input-bg transition-colors cursor-pointer">
                            <FileDown className="w-4 h-4" />
                            Export PDF
                        </button>
                        <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl btn-gradient btn-text text-sm font-medium hover:opacity-90 transition-opacity cursor-pointer">
                            <Share2 className="w-4 h-4" />
                            Share
                        </button>
                    </div>
                </div>

                {/* ========== CARDS ========== */}
                <div className="space-y-4">
                    {/* CASE OVERVIEW */}
                    <CaseSummaryCard title="Case Overview" subtitle="AI-generated summary">
                        <p className="text-sm text-theme-text-secondary leading-relaxed">{data.overview}</p>
                    </CaseSummaryCard>

                    {/* KEY PARTIES */}
                    <CaseSummaryCard title="Key Parties">
                        <div className="space-y-4">
                            {/* Petitioner */}
                            <div className="flex items-start gap-3">
                                <div className="w-9 h-9 shrink-0 rounded-full bg-blue-500/10 flex items-center justify-center">
                                    <User className="w-4 h-4 text-blue-500" />
                                </div>
                                <div>
                                    <p className="text-xs text-theme-text-muted font-medium">Petitioner</p>
                                    <p className="text-sm font-semibold text-theme-text">{data.parties.petitioner.name}</p>
                                    <p className="text-xs text-theme-text-secondary">Represented by {data.parties.petitioner.represented}</p>
                                </div>
                            </div>

                            {/* Respondents */}
                            <div className="flex items-start gap-3">
                                <div className="w-9 h-9 shrink-0 rounded-full bg-red-500/10 flex items-center justify-center">
                                    <Users className="w-4 h-4 text-red-500" />
                                </div>
                                <div>
                                    <p className="text-xs text-theme-text-muted font-medium mb-1">Respondents</p>
                                    <div className="space-y-1.5">
                                        {data.parties.respondents.map((r) => (
                                            <div key={r.name}>
                                                <p className="text-sm font-semibold text-theme-text">{r.name}</p>
                                                <p className="text-xs text-theme-text-secondary">{r.role}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CaseSummaryCard>

                    {/* LEGAL BASIS */}
                    <CaseSummaryCard title="Legal Basis" subtitle="Applicable sections of law">
                        <div className="flex flex-wrap gap-2">
                            {data.legalBasis.map((section) => (
                                <LegalSectionBadge
                                    key={section.code}
                                    code={section.code}
                                    description={section.description}
                                />
                            ))}
                        </div>
                    </CaseSummaryCard>

                    {/* SIMPLE EXPLANATION */}
                    <CaseSummaryCard title="Simple Explanation" subtitle="In plain language for citizens">
                        <div className="flex gap-3 p-4 rounded-xl bg-theme-accent/5 border border-theme-accent/20">
                            <AlertCircle className="w-5 h-5 shrink-0 text-theme-accent mt-0.5" />
                            <p className="text-sm text-theme-text-secondary leading-relaxed">
                                {data.simpleExplanation}
                            </p>
                        </div>
                    </CaseSummaryCard>

                    {/* CASE TIMELINE */}
                    <CaseSummaryCard title="Case Timeline">
                        <Timeline events={data.timeline} />
                    </CaseSummaryCard>
                </div>
            </div>
        </div>
    );
}
