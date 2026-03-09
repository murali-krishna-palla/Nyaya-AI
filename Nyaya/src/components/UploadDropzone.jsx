import { useState, useCallback } from 'react';
import { Upload, FileText, Image, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { documentAPI } from '../services/api';

/**
 * UploadDropzone — Drag-and-drop file upload area.
 * Supports PDF and TXT. Calls the backend document analysis API.
 */
export default function UploadDropzone() {
    const [isDragging, setIsDragging] = useState(false);
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleDragOver = useCallback((e) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback(() => {
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFiles = Array.from(e.dataTransfer.files);
        setFiles(droppedFiles);
    }, []);

    const handleFileSelect = (e) => {
        const selected = Array.from(e.target.files);
        setFiles(selected);
    };

    const isImage = (file) => file.type.startsWith('image/');

    const handleAnalyze = async () => {
        if (files.length === 0) return;
        setError('');
        setLoading(true);
        try {
            const file = files[0];
            const data = isImage(file)
                ? await documentAPI.uploadImage(file)
                : await documentAPI.upload(file);
            navigate('/analysis', { state: { analysis: data.simplifiedExplanation, fileName: file.name } });
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-theme-card border border-theme-border rounded-2xl p-6 sm:p-8 card-shadow">
            {/* Dropzone area */}
            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`dropzone-border rounded-2xl p-10 sm:p-14 text-center transition-all ${isDragging ? 'border-theme-accent bg-theme-accent/5 scale-[1.01]' : ''
                    }`}
            >
                {/* Upload icon */}
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-theme-accent/10 flex items-center justify-center">
                    <Upload className="w-7 h-7 text-theme-accent" />
                </div>

                <h3 className="text-base font-semibold text-theme-text mb-2">
                    Drag and drop your FIR document or image
                </h3>

                {/* Supported formats */}
                <div className="flex items-center justify-center gap-2 mb-5">
                    {['PDF', 'TXT', 'JPG', 'PNG'].map((fmt) => (
                        <span
                            key={fmt}
                            className="px-2.5 py-0.5 rounded-md bg-theme-badge-bg text-theme-badge-text text-xs font-medium"
                        >
                            {fmt}
                        </span>
                    ))}
                </div>

                {/* File input */}
                <label className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-theme-input-bg border border-theme-border text-sm font-medium text-theme-text cursor-pointer hover:bg-theme-border transition-colors">
                    <FileText className="w-4 h-4" />
                    Select Files
                    <input
                        type="file"
                        accept=".pdf,.txt,.jpg,.jpeg,.png,.webp"
                        className="hidden"
                        onChange={handleFileSelect}
                    />
                </label>
            </div>

            {/* Selected files list */}
            {files.length > 0 && (
                <div className="mt-4 space-y-2">
                    {files.map((file, i) => (
                        <div
                            key={i}
                            className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-theme-input-bg border border-theme-border"
                        >
                            {file.type.startsWith('image/') ? (
                                <Image className="w-4 h-4 text-theme-accent" />
                            ) : (
                                <FileText className="w-4 h-4 text-theme-accent" />
                            )}
                            <span className="text-sm text-theme-text truncate flex-1">{file.name}</span>
                            <span className="text-xs text-theme-text-muted">
                                {(file.size / 1024).toFixed(1)} KB
                            </span>
                        </div>
                    ))}
                </div>
            )}

            {/* Analyze CTA */}
            {error && (
                <div className="mt-4 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400">
                    {error}
                </div>
            )}

            <button
                onClick={handleAnalyze}
                disabled={files.length === 0 || loading}
                className="w-full mt-6 py-3 rounded-2xl btn-gradient btn-text font-semibold text-sm hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
                {loading ? (
                    <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Analyzing...
                    </>
                ) : (
                    'Analyze Case'
                )}
            </button>
        </div>
    );
}
