import { Link } from 'react-router-dom';
import { Scale } from 'lucide-react';

/**
 * Footer — Site-wide footer with product sections and legal links.
 */
export default function Footer() {
    const sections = [
        {
            title: 'Product',
            links: ['FIR Analysis', 'Case Summarization', 'Legal Guidance', 'Document Analysis'],
        },
        {
            title: 'Resources',
            links: ['Documentation', 'API Reference', 'Blog', 'Help Center'],
        },
        {
            title: 'Government',
            links: ['e-Courts Integration', 'Police Portal', 'Legal Aid Services'],
        },
        {
            title: 'Legal',
            links: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Data Protection'],
        },
    ];

    return (
        <footer className="bg-theme-card border-t border-theme-border pb-24 md:pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Top — Logo + Description */}
                <div className="flex flex-col md:flex-row gap-10 mb-10">
                    <div className="md:w-1/3">
                        <Link to="/" className="flex items-center gap-2 mb-4 no-underline">
                            <div className="w-8 h-8 rounded-lg btn-gradient flex items-center justify-center">
                                <Scale className="w-4 h-4 text-white" />
                            </div>
                            <span className="font-bold text-lg text-theme-text">Nyaya AI</span>
                        </Link>
                        <p className="text-sm text-theme-text-secondary leading-relaxed">
                            {t('footer.desc')}
                        </p>
                    </div>

                    {/* Link columns */}
                    <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-8">
                        {sections.map((section) => (
                            <div key={section.title}>
                                <h4 className="font-semibold text-sm text-theme-text mb-3">{section.title}</h4>
                                <ul className="space-y-2">
                                    {section.links.map((link) => (
                                        <li key={link}>
                                            <a
                                                href="#"
                                                className="text-sm text-theme-text-muted hover:text-theme-text transition-colors no-underline"
                                            >
                                                {link}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-theme-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-theme-text-muted">
                        © {new Date().getFullYear()} {t('footer.allRights')}
                    </p>
                    <div className="flex items-center gap-4">
                        <a href="#" className="text-xs text-theme-text-muted hover:text-theme-text no-underline">
                            {t('footer.privacyPolicy')}
                        </a>
                        <a href="#" className="text-xs text-theme-text-muted hover:text-theme-text no-underline">
                            {t('footer.termsOfService')}
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
