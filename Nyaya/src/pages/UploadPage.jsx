import { Shield, CheckCircle2, Scale } from 'lucide-react';
import ProgressSteps from '../components/ProgressSteps';
import UploadDropzone from '../components/UploadDropzone';

/**
 * UploadPage — FIR document upload page with progress indicator,
 * drag-and-drop uploader, and information cards.
 */
export default function UploadPage() {
    const infoCards = [
        {
            icon: Shield,
            title: 'Secure & Private',
            description: 'Documents encrypted and protected. Your data never leaves our secure servers.',
        },
        {
            icon: CheckCircle2,
            title: 'Verified Legal Logic',
            description: 'AI trained on Indian law — IPC, CrPC, and Constitution of India datasets.',
        },
        {
            icon: Scale,
            title: 'Precedent Analysis',
            description: 'Compare with Supreme Court and High Court cases for accurate interpretation.',
        },
    ];

    return (
        <div className="min-h-screen bg-theme-bg pt-24 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                {/* Page Title */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-theme-text mb-2">
                        Upload First Information Report (FIR)
                    </h1>
                    <p className="text-sm text-theme-text-secondary">
                        Upload your FIR document and let our AI analyze it for you.
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
