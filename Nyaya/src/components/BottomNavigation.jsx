import { Link, useLocation } from 'react-router-dom';
import { Home, Briefcase, MessageSquare, FileEdit } from 'lucide-react';

/**
 * BottomNavigation — Mobile-style bottom tab bar.
 * Fixed to the bottom of the viewport, visible on small screens.
 */
export default function BottomNavigation() {
    const location = useLocation();

    const tabs = [
        { name: 'Home', icon: Home, path: '/' },
        { name: 'Cases', icon: Briefcase, path: '/analysis' },
        { name: 'Chat', icon: MessageSquare, path: '/chat' },
        { name: 'Complaint', icon: FileEdit, path: '/complaint' },
    ];

    const isActive = (path) =>
        path !== '#' && location.pathname === path;

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-theme-bottom-nav glass-nav border-t border-theme-border">
            <div className="flex items-center justify-around py-2">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                        <Link
                            key={tab.name}
                            to={tab.path}
                            className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-colors no-underline ${isActive(tab.path)
                                    ? 'text-theme-accent'
                                    : 'text-theme-text-muted hover:text-theme-text-secondary'
                                }`}
                        >
                            <Icon className="w-5 h-5" />
                            <span className="text-[10px] font-medium">{tab.name}</span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
