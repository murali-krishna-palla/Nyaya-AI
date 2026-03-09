import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

/**
 * FeatureCard — Displays a single feature with icon, title, description,
 * and an "Explore Service" link. Used on the landing page.
 */
export default function FeatureCard({ icon: Icon, title, description, to }) {
    const { t } = useLanguage();
    const Wrapper = to ? Link : 'div';
    const wrapperProps = to ? { to, className: 'no-underline block' } : {};

    return (
        <Wrapper {...wrapperProps}>
            <div className="group bg-theme-card border border-theme-border rounded-2xl p-6 card-shadow card-shadow-hover transition-all duration-300 hover:-translate-y-1.5 hover:border-theme-accent/20 animate-fade-in-up">
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-theme-accent/10 flex items-center justify-center mb-5 group-hover:bg-theme-accent/15 transition-colors">
                    <Icon className="w-6 h-6 text-theme-accent" />
                </div>

                {/* Content */}
                <h3 className="font-semibold text-lg text-theme-text mb-2">{title}</h3>
                <p className="text-sm text-theme-text-secondary leading-relaxed mb-5">{description}</p>

                {/* Link */}
                <span
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-theme-accent hover:gap-2.5 transition-all no-underline"
                >
                    {t('featureCard.explore')}
                    <ArrowRight className="w-4 h-4" />
                </span>
            </div>
        </Wrapper>
    );
}
