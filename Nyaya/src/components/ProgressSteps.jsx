import { Check } from 'lucide-react';

/**
 * ProgressSteps — Horizontal step indicator for multi-step flows.
 * Shows Upload → Review → Analyze → Report with active/complete states.
 */
export default function ProgressSteps({ currentStep = 0 }) {
    const steps = ['Upload', 'Review', 'Analyze', 'Report'];

    return (
        <div className="flex items-center justify-center gap-0">
            {steps.map((step, index) => {
                const isComplete = index < currentStep;
                const isActive = index === currentStep;

                return (
                    <div key={step} className="flex items-center">
                        {/* Step circle + label */}
                        <div className="flex flex-col items-center">
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${isComplete
                                        ? 'bg-green-500 text-white'
                                        : isActive
                                            ? 'bg-theme-accent text-white ring-4 ring-theme-accent/20'
                                            : 'bg-theme-input-bg text-theme-text-muted border border-theme-border'
                                    }`}
                            >
                                {isComplete ? <Check className="w-4 h-4" /> : index + 1}
                            </div>
                            <span
                                className={`text-xs mt-1.5 font-medium ${isActive ? 'text-theme-accent' : isComplete ? 'text-green-500' : 'text-theme-text-muted'
                                    }`}
                            >
                                {step}
                            </span>
                        </div>

                        {/* Connector line */}
                        {index < steps.length - 1 && (
                            <div
                                className={`w-10 sm:w-16 h-0.5 mx-1 mt-[-20px] ${index < currentStep ? 'bg-green-500' : 'bg-theme-border'
                                    }`}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
}
