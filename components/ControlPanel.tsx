import React from 'react';
import { GenerationOptions, ToneType, PlatformType } from '../types';
import { SAMPLE_PROMPTS } from '../constants';
import { Wand2, Megaphone, MonitorPlay } from 'lucide-react';

interface ControlPanelProps {
  options: GenerationOptions;
  setOptions: React.Dispatch<React.SetStateAction<GenerationOptions>>;
  isGenerating: boolean;
  onGenerate: () => void;
  canGenerate: boolean;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ 
  options, 
  setOptions, 
  isGenerating, 
  onGenerate,
  canGenerate
}) => {
  
  const handleOfferClick = (offer: string) => {
    setOptions(prev => ({ ...prev, customOffer: offer }));
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-6">
      
      {/* Platform Selection */}
      <div>
        <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
          <MonitorPlay size={18} className="text-brand-500" />
          Chọn nền tảng đăng bài
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {Object.values(PlatformType).map((platform) => (
            <button
              key={platform}
              onClick={() => setOptions(prev => ({ ...prev, platform: platform }))}
              className={`
                px-4 py-3 rounded-lg text-sm font-medium text-left transition-all border
                ${options.platform === platform 
                  ? 'bg-brand-50 border-brand-500 text-brand-700 shadow-sm' 
                  : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                }
              `}
            >
              {platform}
            </button>
          ))}
        </div>
      </div>

      {/* Tone Selection */}
      <div>
        <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
          <Megaphone size={18} className="text-brand-500" />
          Chọn giọng văn (Tone)
        </label>
        <select
          value={options.tone}
          onChange={(e) => setOptions(prev => ({ ...prev, tone: e.target.value as ToneType }))}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 bg-white text-gray-700 outline-none transition-shadow"
        >
          {Object.values(ToneType).map((tone) => (
            <option key={tone} value={tone}>{tone}</option>
          ))}
        </select>
      </div>

      {/* Custom Offer Input */}
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">
          Thông tin khuyến mãi / Ghi chú (Tùy chọn)
        </label>
        <div className="flex flex-wrap gap-2 mb-3">
          {SAMPLE_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleOfferClick(prompt)}
              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-xs text-gray-600 rounded-full transition-colors"
            >
              + {prompt}
            </button>
          ))}
        </div>
        <textarea
          value={options.customOffer || ''}
          onChange={(e) => setOptions(prev => ({ ...prev, customOffer: e.target.value }))}
          placeholder="Ví dụ: Freeship hôm nay, Mua 1 tặng 1..."
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none text-sm min-h-[80px]"
        />
      </div>

      {/* Generate Button */}
      <button
        onClick={onGenerate}
        disabled={!canGenerate || isGenerating}
        className={`
          w-full py-4 rounded-xl flex items-center justify-center gap-2 text-white font-bold text-lg shadow-lg transition-all transform active:scale-[0.98]
          ${!canGenerate || isGenerating 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 hover:shadow-brand-500/30'
          }
        `}
      >
        {isGenerating ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Đang viết bài...
          </>
        ) : (
          <>
            <Wand2 size={20} />
            Tạo bài viết ngay
          </>
        )}
      </button>
    </div>
  );
};

export default ControlPanel;