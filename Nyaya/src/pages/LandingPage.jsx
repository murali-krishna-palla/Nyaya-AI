import { Link } from 'react-router-dom';
import {
    Upload,
    ArrowRight,
    Shield,
    Languages,
    CheckCircle2,
    FileSearch,
    Scale,
    BookOpen,
    Star,
    Zap,
    Clock,
} from 'lucide-react';
import FeatureCard from '../components/FeatureCard';

/**
 * LandingPage — Hero, Features, Why Nyaya, Stats, CTA sections.
 */
export default function LandingPage() {
    return (
        <div className="min-h-screen">
            {/* ===================== HERO SECTION ===================== */}
            <section className="hero-gradient text-white pt-24 pb-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="max-w-2xl">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur text-xs font-medium mb-6">
                            <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                            AI-Powered Legal Analysis Platform
                        </div>

                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-4">
                            Understand Your{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white/80 to-white/50">
                                Legal Case
                            </span>{' '}
                            with AI
                        </h1>

                        <p className="text-base sm:text-lg text-white/70 leading-relaxed mb-8 max-w-xl">
                            Upload your FIR, and let our AI break down the legal complexities into simple,
                            actionable insights. Built for every citizen who deserves legal clarity.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap gap-3 mb-8">
                            <Link
                                to="/upload"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl btn-gradient btn-text font-semibold text-sm hover:opacity-90 transition-colors no-underline"
                            >
                                <Upload className="w-4 h-4" />
                                Upload FIR
                            </Link>
                            <a
                                href="#features"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl border border-white/30 text-white font-semibold text-sm hover:bg-white/10 transition-colors no-underline"
                            >
                                Learn How It Works
                                <ArrowRight className="w-4 h-4" />
                            </a>
                        </div>

                        {/* Trust indicator */}
                        <div className="flex items-center gap-3">
                            <div className="flex -space-x-2">
                                {[1, 2, 3, 4].map((i) => (
                                    <div
                                        key={i}
                                        className="w-8 h-8 rounded-full bg-white/20 border-2 border-white/30 flex items-center justify-center text-[10px] font-bold"
                                    >
                                        {String.fromCharCode(64 + i)}
                                    </div>
                                ))}
                            </div>
                            <p className="text-xs text-white/60">
                                Trusted by <span className="font-semibold text-white">10,000+</span> citizens for
                                legal clarity
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===================== FEATURES SECTION ===================== */}
            <section id="features" className="py-16 px-4 sm:px-6 lg:px-8 bg-theme-bg">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl sm:text-3xl font-bold text-theme-text mb-3">
                            Professional Legal Services
                        </h2>
                        <p className="text-sm text-theme-text-secondary max-w-md mx-auto">
                            Our AI analyzes your FIR and provides comprehensive legal insights powered by
                            Indian law databases.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <FeatureCard
                            icon={FileSearch}
                            title="Case Summarization"
                            description="Get a clear, concise summary of your legal case. Our AI distills complex FIR documents into easy-to-understand bullet points."
                            to="/upload"
                        />
                        <FeatureCard
                            icon={Scale}
                            title="Legal Guidance"
                            description="Receive AI-powered legal guidance based on applicable Indian laws, precedents from Supreme Court and High Court rulings."
                            to="/chat"
                        />
                        <FeatureCard
                            icon={BookOpen}
                            title="Document Analysis"
                            description="Our AI reads, parses, and extracts key information from all types of FIR documents, charge sheets, and legal filings."
                            to="/upload"
                        />
                    </div>
                </div>
            </section>

            {/* ===================== WHY NYAYA AI SECTION ===================== */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-theme-card border-y border-theme-border">
                <div className="max-w-7xl mx-auto">
                    <div className="max-w-2xl">
                        <h2 className="text-2xl sm:text-3xl font-bold text-theme-text mb-3">
                            Why Nyaya AI?
                        </h2>
                        <p className="text-sm text-theme-text-secondary mb-8">
                            Designed to demystify the complexities of Indian legal processes, providing
                            transparency and accessibility to citizens everywhere.
                        </p>

                        <div className="space-y-5">
                            {[
                                {
                                    icon: Shield,
                                    title: 'Secure & Private',
                                    description:
                                        'Your documents are encrypted end-to-end. We never store or share your data with third parties.',
                                },
                                {
                                    icon: Languages,
                                    title: 'Bilingual Support',
                                    description:
                                        'Analyze FIRs in both Hindi and English with seamless translation and accurate legal interpretation.',
                                },
                                {
                                    icon: CheckCircle2,
                                    title: 'Verified Logic',
                                    description:
                                        'Our AI is trained on verified Indian Penal Code, CrPC, and Constitution of India for accurate results.',
                                },
                            ].map((item) => (
                                <div key={item.title} className="flex gap-4">
                                    <div className="w-10 h-10 shrink-0 rounded-xl bg-theme-accent/10 flex items-center justify-center">
                                        <item.icon className="w-5 h-5 text-theme-accent" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-sm text-theme-text mb-1">{item.title}</h3>
                                        <p className="text-sm text-theme-text-secondary leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ===================== STATS SECTION ===================== */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-theme-bg">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 gap-4 max-w-md">
                        {/* 99% Accuracy */}
                        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 p-6 text-white">
                            <Zap className="absolute -top-2 -right-2 w-16 h-16 opacity-10" />
                            <p className="text-3xl font-extrabold mb-1">99%</p>
                            <p className="text-sm font-medium text-emerald-100">Accuracy</p>
                        </div>
                        {/* 24/7 Availability */}
                        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 p-6 text-white">
                            <Clock className="absolute -top-2 -right-2 w-16 h-16 opacity-10" />
                            <p className="text-3xl font-extrabold mb-1">24/7</p>
                            <p className="text-sm font-medium text-amber-100">Availability</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===================== CTA SECTION ===================== */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="cta-gradient rounded-3xl p-8 sm:p-12 text-white text-center">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-3">
                            Ready to demystify your case?
                        </h2>
                        <p className="text-sm text-white/60 max-w-md mx-auto mb-8">
                            Join thousands of citizens who have used Nyaya AI to understand their legal rights
                            and navigate the justice system with confidence.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                            <Link
                                to="/upload"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl btn-gradient btn-text font-semibold text-sm hover:opacity-90 transition-colors no-underline"
                            >
                                Get Started Free
                            </Link>
                            <a
                                href="#"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl border border-white/30 text-white font-semibold text-sm hover:bg-white/10 transition-colors no-underline"
                            >
                                Contact Sales
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
