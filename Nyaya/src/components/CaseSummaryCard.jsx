/**
 * CaseSummaryCard — Generic card wrapper used on the Case Analysis page.
 * Accepts a title, optional subtitle, and children.
 */
export default function CaseSummaryCard({ title, subtitle, children }) {
    return (
        <div className="bg-theme-card border border-theme-border rounded-2xl p-5 sm:p-6 card-shadow">
            {title && (
                <div className="mb-4">
                    <h3 className="font-semibold text-base text-theme-text">{title}</h3>
                    {subtitle && (
                        <p className="text-xs text-theme-text-muted mt-0.5">{subtitle}</p>
                    )}
                </div>
            )}
            {children}
        </div>
    );
}
