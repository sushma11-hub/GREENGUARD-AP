import { useState, useRef, useCallback } from 'react';
import {
  MapPin, Tag, FileText, Upload, Send, ArrowRight, Radio,
  Zap, Database, Bell, ShieldCheck, Brain, Globe, Cloud, X, ImageIcon,
} from 'lucide-react';
import type { Lang } from '@/types';
import { tr } from '@/i18n';
import { awsFlowSteps, awsArchitecture } from '@/data';

const flowIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Radio, Zap, Database, Bell, ShieldCheck,
};

const archIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Radio, Zap, Database, Brain, Globe, Cloud,
};

export default function ReportPipeline({ lang }: { lang: Lang }) {
  const [location, setLocation] = useState('');
  const [incidentType, setIncidentType] = useState('');
  const [description, setDescription] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [fileError, setFileError] = useState('');
  const [filePreview, setFilePreview] = useState<{ name: string; url: string } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = useCallback((file: File) => {
    setFileError('');
    if (file.size > 5 * 1024 * 1024) {
      setFileError('File too large, max 5MB allowed');
      return;
    }
    if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
      setFileError('Only JPG and PNG files are allowed');
      return;
    }
    const url = URL.createObjectURL(file);
    setFilePreview({ name: file.name, url });
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const removeFile = () => {
    if (filePreview) URL.revokeObjectURL(filePreview.url);
    setFilePreview(null);
    setFileError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = () => {
    if (!location || !incidentType || !description) {
      setError(true);
      setSuccess(false);
      return;
    }
    setError(false);
    setSuccess(true);
    setLocation('');
    setIncidentType('');
    setDescription('');
    if (filePreview) { URL.revokeObjectURL(filePreview.url); setFilePreview(null); }
    if (fileInputRef.current) fileInputRef.current.value = '';
    setTimeout(() => setSuccess(false), 4000);
  };

  return (
    <section className="max-w-[1400px] mx-auto px-4 lg:px-6 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left: Report form */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4">{tr(lang, 'reportIncident')}</h2>

          <div className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-gray-600 mb-1.5 block">{tr(lang, 'location')}</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => { setLocation(e.target.value); setError(false); }}
                  placeholder={tr(lang, 'locationPlaceholder')}
                  className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-600 mb-1.5 block">{tr(lang, 'incidentType')}</label>
              <div className="relative">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <select
                  value={incidentType}
                  onChange={(e) => { setIncidentType(e.target.value); setError(false); }}
                  className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer"
                >
                  <option value="">--</option>
                  <option value="industrial">{tr(lang, 'industrialSmoke')}</option>
                  <option value="vehicle">{tr(lang, 'vehicleSmoke')}</option>
                  <option value="waste">{tr(lang, 'wasteBurning')}</option>
                  <option value="dust">{tr(lang, 'dust')}</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-600 mb-1.5 block">{tr(lang, 'description')}</label>
              <textarea
                value={description}
                onChange={(e) => { setDescription(e.target.value); setError(false); }}
                placeholder={tr(lang, 'descriptionPlaceholder')}
                rows={3}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-600 mb-1.5 block">{tr(lang, 'uploadPhoto')}</label>
              <input
                ref={fileInputRef}
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={handleFileChange}
                className="hidden"
              />
              {filePreview ? (
                <div className="border-2 border-green-400 rounded-lg p-3 bg-green-50">
                  <div className="flex items-center gap-3">
                    <img src={filePreview.url} alt="preview" className="w-16 h-16 rounded-lg object-cover border border-gray-200" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-800 truncate flex items-center gap-1.5">
                        <ImageIcon className="w-3.5 h-3.5 text-green-600 shrink-0" />
                        {filePreview.name}
                      </p>
                      <button
                        onClick={removeFile}
                        className="mt-1.5 flex items-center gap-1 text-xs text-red-500 hover:text-red-600 font-semibold cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDrop={handleDrop}
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-all ${
                    isDragging ? 'border-green-500 bg-green-50 scale-[1.01]' : 'border-gray-300 hover:border-green-400'
                  }`}
                >
                  <Upload className={`w-6 h-6 mx-auto mb-1.5 transition-colors ${isDragging ? 'text-green-500' : 'text-gray-400'}`} />
                  <p className={`text-xs transition-colors ${isDragging ? 'text-green-600' : 'text-gray-500'}`}>{tr(lang, 'dragDrop')}</p>
                </div>
              )}
              {fileError && (
                <p className="mt-1.5 text-xs text-red-500 font-semibold">{fileError}</p>
              )}
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-2.5 text-xs text-red-600 font-semibold">
                {tr(lang, 'formError')}
              </div>
            )}
            {success && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-2.5 text-xs text-green-600 font-semibold">
                {tr(lang, 'formSuccess')}
              </div>
            )}

            <button
              onClick={handleSubmit}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-bold transition-all cursor-pointer shadow-sm"
            >
              <Send className="w-4 h-4" />
              {tr(lang, 'submitAws')}
            </button>
          </div>
        </div>

        {/* Right: AWS Flow Pipeline */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4">{tr(lang, 'awsFlow')}</h2>
          <div className="space-y-2">
            {awsFlowSteps.map((step, i) => {
              const Icon = flowIcons[step.icon] || Radio;
              return (
                <div key={i}>
                  <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-3 border border-gray-100">
                    <div className="w-9 h-9 rounded-lg bg-orange-100 flex items-center justify-center shrink-0">
                      <Icon className="w-4.5 h-4.5 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-gray-800">{lang === 'te' ? step.teName : step.name}</p>
                      <p className="text-xs text-gray-500">{lang === 'te' ? step.teDesc : step.desc}</p>
                    </div>
                  </div>
                  {i < awsFlowSteps.length - 1 && (
                    <div className="flex justify-center py-0.5">
                      <ArrowRight className="w-4 h-4 text-gray-300 rotate-90" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* AWS Architecture */}
      <div className="mt-6 bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">{tr(lang, 'awsArchitecture')}</h2>
          <span className="text-xs text-gray-500">{tr(lang, 'awsArchSubtitle')}</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {awsArchitecture.map((item, i) => {
            const Icon = archIcons[item.icon] || Radio;
            return (
              <div key={i} className="bg-orange-50 border border-orange-200 rounded-xl p-3 text-center relative">
                <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center mx-auto mb-2">
                  <Icon className="w-5 h-5 text-orange-600" />
                </div>
                <p className="text-xs font-bold text-gray-800">{lang === 'te' ? item.teName : item.name}</p>
                <p className="text-[10px] text-gray-500">{lang === 'te' ? item.teStat : item.stat}</p>
                {i < awsArchitecture.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-300" />
                )}
              </div>
            );
          })}
        </div>
        <p className="text-center text-xs text-gray-400 mt-4">{tr(lang, 'awsCredits')}</p>
      </div>
    </section>
  );
}
