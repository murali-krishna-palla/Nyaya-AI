import { Circle, CheckCircle2 } from 'lucide-react';

/**
 * Timeline — Vertical timeline showing events with dates, titles, and descriptions.
 * Used on the Case Analysis page.
 */
export default function Timeline({ events }) {
    return (
        <div className="relative pl-6">
            {/* Vertical line */}
            <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-theme-border" />

            <div className="space-y-6">
                {events.map((event, index) => (
                    <div key={index} className="relative flex gap-4">
                        {/* Dot */}
                        <div className="absolute -left-6 top-0.5">
                            {index === events.length - 1 ? (
                                <Circle className="w-5 h-5 text-theme-accent fill-theme-accent/20" />
                            ) : (
                                <CheckCircle2 className="w-5 h-5 text-green-500" />
                            )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 pb-2">
                            <p className="text-xs text-theme-text-muted font-medium mb-0.5">{event.date}</p>
                            <h4 className="text-sm font-semibold text-theme-text mb-1">{event.title}</h4>
                            <p className="text-sm text-theme-text-secondary leading-relaxed">{event.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
