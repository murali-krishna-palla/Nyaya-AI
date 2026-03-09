/**
 * LegalSectionBadge — Renders a styled badge for a legal section code.
 * e.g. "IPC 420", "PC Act 13"
 */
export default function LegalSectionBadge({ code, description }) {
    return (
        <div className="group relative inline-flex items-center px-3 py-1.5 rounded-lg bg-theme-badge-bg text-theme-badge-text text-sm font-medium cursor-default transition-all hover:scale-105">
            {code}
            {/* Tooltip on hover */}
            {description && (
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 rounded-lg bg-theme-card border border-theme-border text-xs text-theme-text-secondary opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap card-shadow pointer-events-none">
                    {description}
                </span>
            )}
        </div>
    );
}
