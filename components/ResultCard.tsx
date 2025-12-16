import React, { useState } from 'react';
import { Copy, CheckCircle2, RefreshCw } from 'lucide-react';
import ReactMarkdown from 'react-markdown'; // Actually we will use simple formatting or pre-wrap since we don't have react-markdown installed in the prompt constraints, we'll use whitespace-pre-wrap

interface ResultCardProps {
  content: string;
}

const ResultCard: React.FC<ResultCardProps> = ({ content }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!content) return null;

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-brand-100 overflow-hidden animate-fade-in-up">
      <div className="bg-brand-50 px-6 py-4 border-b border-brand-100 flex items-center justify-between">
        <h3 className="font-bold text-brand-800 flex items-center gap-2">
          <CheckCircle2 size={20} className="text-brand-600" />
          Kết quả của bạn
        </h3>
        <button
          onClick={handleCopy}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all
            ${copied 
              ? 'bg-green-100 text-green-700' 
              : 'bg-white text-brand-600 border border-brand-200 hover:bg-brand-50'
            }
          `}
        >
          {copied ? (
            <>Đã sao chép!</>
          ) : (
            <>
              <Copy size={16} />
              Sao chép
            </>
          )}
        </button>
      </div>
      <div className="p-6 bg-white min-h-[300px]">
        <div className="prose prose-brand max-w-none text-gray-800 whitespace-pre-wrap font-sans text-base leading-relaxed">
           {content}
        </div>
      </div>
      <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 text-xs text-gray-500 flex justify-between items-center">
         <span>Được tạo bởi Gemini AI 🤖</span>
         <span>Chúc bạn buôn may bán đắt! 💰</span>
      </div>
    </div>
  );
};

export default ResultCard;