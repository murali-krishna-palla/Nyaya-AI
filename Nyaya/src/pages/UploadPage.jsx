import { Shield, CheckCircle2, Scale } from 'lucide-react';
import ProgressSteps from '../components/ProgressSteps';
import UploadDropzone from '../components/UploadDropzone';
import { useLanguage } from '../context/LanguageContext';

/**
 * UploadPage — FIR document upload page with progress indicator,
 * drag-and-drop uploader, and information cards.
 */
export default function UploadPage() {
    const { t } = useLanguage();
    const infoCards = [
        {
            icon: Shield,
            title: t('uploadPage.secureTitle'),
            description: t('uploadPage.secureDesc'),
        },
        {
            icon: CheckCircle2,
            title: t('uploadPage.verifiedTitle'),
            description: t('uploadPage.verifiedDesc'),
        },
        {
            icon: Scale,
            title: t('uploadPage.precedentTitle'),
            description: t('uploadPage.precedentDesc'),
        },
    ];

    return (
        <div className="min-h-screen bg-theme-bg pt-24 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                {/* Page Title */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-theme-text mb-2">
                        {t('uploadPage.title')}
                    </h1>
                    <p className="text-sm text-theme-text-secondary">
                        {t('uploadPage.desc')}
                    </p>
                </div>

                {/* Progress Steps */}
                <div className="mb-8">
                    <ProgressSteps currentStep={0} />
                </div>

                {/* Upload Dropzone */}
                <UploadDropzone />

                {/* Information Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                    {infoCards.map((card) => (
                        <div
                            key={card.title}
                            className="bg-theme-card border border-theme-border rounded-2xl p-5 card-shadow text-center"
                        >
                            <div className="w-10 h-10 mx-auto mb-3 rounded-xl bg-theme-accent/10 flex items-center justify-center">
                                <card.icon className="w-5 h-5 text-theme-accent" />
                            </div>
                            <h3 className="font-semibold text-sm text-theme-text mb-1">{card.title}</h3>
                            <p className="text-xs text-theme-text-secondary leading-relaxed">
                                {card.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
