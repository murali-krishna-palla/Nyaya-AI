import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * FeatureCard — Displays a single feature with icon, title, description,
 * and an "Explore Service" link. Used on the landing page.
 */
export default function FeatureCard({ icon: Icon, title, description, to }) {
    const Wrapper = to ? Link : 'div';
    const wrapperProps = to ? { to, className: 'no-underline block' } : {};

    return (
        <Wrapper {...wrapperProps}>
            <div className="group bg-theme-card border border-theme-border rounded-2xl p-6 card-shadow card-shadow-hover transition-all duration-300 hover:-translate-y-1">
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-theme-accent/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-theme-accent" />
                </div>

                {/* Content */}
                <h3 className="font-semibold text-lg text-theme-text mb-2">{title}</h3>
                <p className="text-sm text-theme-text-secondary leading-relaxed mb-4">{description}</p>

                {/* Link */}
                <span
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-theme-accent hover:gap-2.5 transition-all no-underline"
                >
                    Explore Service
                    <ArrowRight className="w-4 h-4" />
                </span>
            </div>
        </Wrapper>
    );
}
