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
import { useLanguage } from '../context/LanguageContext';

/**
 * LandingPage — Hero, Features, Why Nyaya, Stats, CTA sections.
 */
export default function LandingPage() {
    const { t } = useLanguage();
    return (
        <div className="min-h-screen">
            {/* ===================== HERO SECTION ===================== */}
            <section className="hero-gradient text-white pt-20 pb-20 sm:pb-24 md:pt-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="max-w-2xl animate-fade-in-up">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur text-xs font-medium mb-6">
                            <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                            {t('landing.badge')}
                        </div>

                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-4">
                            {t('landing.heroTitle1')}{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white/80 to-white/50">
                                {t('landing.heroTitle2')}
                            </span>{' '}
                            {t('landing.heroTitle3')}
                        </h1>

                        <p className="text-base sm:text-lg text-white/70 leading-relaxed mb-8 max-w-xl">
                            {t('landing.heroDesc')}
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap gap-3 mb-8">
                            <Link
                                to="/upload"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl btn-gradient btn-text font-semibold text-sm hover:opacity-90 transition-colors no-underline"
                            >
                                <Upload className="w-4 h-4" />
                                {t('landing.uploadBtn')}
                            </Link>
                            <a
                                href="#features"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl border border-white/30 text-white font-semibold text-sm hover:bg-white/10 transition-colors no-underline"
                            >
                                {t('landing.learnMore')}
                                <ArrowRight className="w-4 h-4" />
                            </a>
                        </div>

                        {/* Trust indicator */}
                        <div className="flex items-center gap-3">
                            <img
                                src="/img.jpeg"
                                alt="Trusted users"
                                className="w-10 h-10 rounded-full object-cover border-2 border-white/30"
                            />
                            <p className="text-xs text-white/60">
                                {t('landing.trustedBy')} <span className="font-semibold text-white">10,000+</span> {t('landing.citizens')}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===================== FEATURES SECTION ===================== */}
            <section id="features" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-theme-bg section-divider">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-14 animate-fade-in-up">
                        <p className="text-xs font-semibold uppercase tracking-widest text-theme-accent mb-3">{t('landing.badge')}</p>
                        <h2 className="text-2xl sm:text-3xl font-bold text-theme-text mb-3">
                            {t('landing.featuresTitle')}
                        </h2>
                        <p className="text-sm text-theme-text-secondary max-w-md mx-auto">
                            {t('landing.featuresDesc')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
                        <FeatureCard
                            icon={FileSearch}
                            title={t('landing.caseSumTitle')}
                            description={t('landing.caseSumDesc')}
                            to="/upload"
                        />
                        <FeatureCard
                            icon={Scale}
                            title={t('landing.legalGuideTitle')}
                            description={t('landing.legalGuideDesc')}
                            to="/chat"
                        />
                        <FeatureCard
                            icon={BookOpen}
                            title={t('landing.docAnalysisTitle')}
                            description={t('landing.docAnalysisDesc')}
                            to="/upload"
                        />
                    </div>
                </div>
            </section>

            {/* ===================== WHY NYAYA AI SECTION ===================== */}
            <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-theme-card border-y border-theme-border">
                <div className="max-w-7xl mx-auto">
                    <div className="max-w-2xl animate-fade-in-up">
                        <p className="text-xs font-semibold uppercase tracking-widest text-theme-accent mb-3">Why Choose Us</p>
                        <h2 className="text-2xl sm:text-3xl font-bold text-theme-text mb-3">
                            {t('landing.whyTitle')}
                        </h2>
                        <p className="text-sm text-theme-text-secondary mb-10">
                            {t('landing.whyDesc')}
                        </p>

                        <div className="space-y-5">
                            {[
                                {
                                    icon: Shield,
                                    title: t('landing.secureTitle'),
                                    description: t('landing.secureDesc'),
                                },
                                {
                                    icon: Languages,
                                    title: t('landing.bilingualTitle'),
                                    description: t('landing.bilingualDesc'),
                                },
                                {
                                    icon: CheckCircle2,
                                    title: t('landing.verifiedTitle'),
                                    description: t('landing.verifiedDesc'),
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
            <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-theme-bg section-divider">
                <div className="max-w-7xl mx-auto flex flex-col items-center">
                    <p className="text-xs font-semibold uppercase tracking-widest text-theme-accent mb-6">Our Impact</p>
                    <div className="grid grid-cols-2 gap-6 max-w-lg w-full animate-fade-in-up">
                        {/* 99% Accuracy */}
                        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 p-6 text-white">
                            <Zap className="absolute -top-2 -right-2 w-16 h-16 opacity-10" />
                            <p className="text-3xl font-extrabold mb-1">99%</p>
                            <p className="text-sm font-medium text-emerald-100">{t('landing.accuracy')}</p>
                        </div>
                        {/* 24/7 Availability */}
                        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 p-6 text-white">
                            <Clock className="absolute -top-2 -right-2 w-16 h-16 opacity-10" />
                            <p className="text-3xl font-extrabold mb-1">24/7</p>
                            <p className="text-sm font-medium text-amber-100">{t('landing.availability')}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===================== CTA SECTION ===================== */}
            <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto animate-scale-in">
                    <div className="cta-gradient rounded-3xl p-10 sm:p-16 text-white text-center">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-3">
                            {t('landing.ctaTitle')}
                        </h2>
                        <p className="text-sm text-white/60 max-w-md mx-auto mb-8">
                            {t('landing.ctaDesc')}
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                            <Link
                                to="/upload"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl btn-gradient btn-text font-semibold text-sm hover:opacity-90 transition-colors no-underline"
                            >
                                {t('landing.getStarted')}
                            </Link>
                            <a
                                href="#"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl border border-white/30 text-white font-semibold text-sm hover:bg-white/10 transition-colors no-underline"
                            >
                                {t('landing.contactSales')}
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
