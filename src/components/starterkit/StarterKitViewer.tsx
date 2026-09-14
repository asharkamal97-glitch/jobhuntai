import React, { useState } from 'react';
import { 
  DownloadCloud, 
  BookOpen, 
  Copy, 
  Check, 
  Sparkles, 
  FileText, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Download
} from 'lucide-react';
import { STARTER_KIT_MODULES, StarterKitModule } from '../../data/starterKitData';
import { exportStarterKitBundle, exportTextFile } from '../../services/exportService';

interface StarterKitViewerProps {
  isFullAccess?: boolean;
  onOpenPricing?: (feature?: string) => void;
}

export const StarterKitViewer: React.FC<StarterKitViewerProps> = ({
  isFullAccess = false,
  onOpenPricing
}) => {
  const [selectedModuleId, setSelectedModuleId] = useState<string>(STARTER_KIT_MODULES[0].id);
  const [copiedPromptIdx, setCopiedPromptIdx] = useState<number | null>(null);

  const activeModule = STARTER_KIT_MODULES.find(m => m.id === selectedModuleId) || STARTER_KIT_MODULES[0];

  const handleCopyPrompt = (prompt: string, idx: number) => {
    navigator.clipboard.writeText(prompt);
    setCopiedPromptIdx(idx);
    setTimeout(() => setCopiedPromptIdx(null), 2000);
  };

  const handleDownloadAll = () => {
    if (!isFullAccess && onOpenPricing) {
      onOpenPricing('Starter Kit Downloads');
      return;
    }
    exportStarterKitBundle();
  };

  const handleExportSingleModule = (mod: StarterKitModule) => {
    if (!isFullAccess && onOpenPricing) {
      onOpenPricing('Starter Kit Module Export');
      return;
    }
    exportTextFile(mod.content, `Module_${mod.number}_${mod.title.replace(/\s+/g, '_')}.md`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-brand-600 uppercase tracking-wider mb-1">
            <DownloadCloud className="w-4 h-4" />
            <span>Digital Downloadable Edition ($14.99 Value)</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            JOBHUNT AI Starter Kit
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Complete 10-module operating system and prompt framework. Learn to execute the Evidence-First workflow using our structured playbooks and templates.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleDownloadAll}
            className="px-4 py-2.5 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-sm transition flex items-center space-x-1.5"
          >
            <Download className="w-4 h-4" />
            <span>Download All 10 Modules (.md)</span>
          </button>
        </div>
      </div>

      {/* Main Grid: 10 Module Navigation + Module Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Col: 10 Module Selector (4 cols) */}
        <div className="lg:col-span-4 space-y-2">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 px-1">
            10-Module Guidebook
          </span>

          <div className="space-y-1.5 max-h-[650px] overflow-y-auto pr-1">
            {STARTER_KIT_MODULES.map((mod) => {
              const isActive = selectedModuleId === mod.id;

              return (
                <button
                  key={mod.id}
                  onClick={() => setSelectedModuleId(mod.id)}
                  className={`w-full p-3 rounded-xl border text-left transition flex items-center justify-between text-xs space-y-0.5 ${
                    isActive
                      ? 'bg-brand-50/80 border-brand-500 text-brand-900 font-bold shadow-sm'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 font-medium'
                  }`}
                >
                  <div className="flex items-start space-x-2.5">
                    <span className={`w-5 h-5 rounded-md flex items-center justify-center font-mono font-bold text-[10px] flex-shrink-0 ${
                      isActive ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {mod.number}
                    </span>
                    <div>
                      <div className="font-bold text-slate-900 leading-snug">{mod.title}</div>
                      <span className="text-[10px] text-slate-400 font-normal block">{mod.subtitle}</span>
                    </div>
                  </div>
                  <ChevronRight className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? 'text-brand-600' : 'text-slate-300'}`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Col: Active Module Reader (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                  Module {activeModule.number} • {activeModule.category}
                </span>
              </div>
              <h2 className="text-lg font-extrabold text-slate-900 mt-1">{activeModule.title}</h2>
              <p className="text-xs text-slate-500">{activeModule.subtitle}</p>
            </div>

            <button
              onClick={() => handleExportSingleModule(activeModule)}
              className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition flex items-center space-x-1"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Export Module</span>
            </button>
          </div>

          {/* Module Markdown Content */}
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-sans text-slate-800 leading-relaxed whitespace-pre-wrap">
            {activeModule.content}
          </div>

          {/* Prompt Templates */}
          {activeModule.templates && activeModule.templates.length > 0 && (
            <div className="space-y-4 pt-2">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Universal AI Prompt Templates for this Module</span>
              </h3>

              <div className="space-y-3">
                {activeModule.templates.map((tpl, tIdx) => (
                  <div key={tIdx} className="bg-slate-900 text-slate-100 p-4 rounded-xl space-y-3 text-xs">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <span className="font-bold text-brand-300 text-[11px]">{tpl.title}</span>
                      <button
                        onClick={() => handleCopyPrompt(tpl.prompt, tIdx)}
                        className="px-2.5 py-1 text-[11px] font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition flex items-center space-x-1"
                      >
                        <Copy className="w-3 h-3" />
                        <span>{copiedPromptIdx === tIdx ? 'Copied Prompt!' : 'Copy Prompt'}</span>
                      </button>
                    </div>

                    <div className="font-mono text-[11px] text-slate-300 whitespace-pre-wrap leading-relaxed">
                      {tpl.prompt}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
