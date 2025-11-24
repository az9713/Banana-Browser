import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, RefreshCw, Lock, Search } from 'lucide-react';

interface BrowserChromeProps {
  url: string;
  isLoading: boolean;
  canGoBack: boolean;
  canGoForward: boolean;
  onNavigate: (url: string) => void;
  onBack: () => void;
  onForward: () => void;
  onRefresh: () => void;
}

export const BrowserChrome: React.FC<BrowserChromeProps> = ({
  url,
  isLoading,
  canGoBack,
  canGoForward,
  onNavigate,
  onBack,
  onForward,
  onRefresh,
}) => {
  const [inputVal, setInputVal] = useState(url);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setInputVal(url);
  }, [url]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputVal.trim()) {
      onNavigate(inputVal);
    }
  };

  return (
    <div className="bg-banana-50 border-b border-banana-200 px-4 py-3 flex items-center gap-3 shadow-sm sticky top-0 z-50">
      {/* Navigation Controls */}
      <div className="flex items-center gap-2 text-gray-600">
        <button
          onClick={onBack}
          disabled={!canGoBack}
          className={`p-2 rounded-full hover:bg-black/5 transition-colors ${!canGoBack ? 'opacity-30 cursor-not-allowed' : ''}`}
        >
          <ArrowLeft size={18} />
        </button>
        <button
          onClick={onForward}
          disabled={!canGoForward}
          className={`p-2 rounded-full hover:bg-black/5 transition-colors ${!canGoForward ? 'opacity-30 cursor-not-allowed' : ''}`}
        >
          <ArrowRight size={18} />
        </button>
        <button
          onClick={onRefresh}
          className={`p-2 rounded-full hover:bg-black/5 transition-colors ${isLoading ? 'animate-spin' : ''}`}
        >
          <RefreshCw size={16} />
        </button>
      </div>

      {/* Address Bar */}
      <form 
        onSubmit={handleSubmit}
        className={`flex-1 flex items-center bg-white border transition-all duration-200 rounded-lg px-3 h-10 ${
          isFocused 
            ? 'border-banana-400 ring-2 ring-banana-100 shadow-sm' 
            : 'border-transparent shadow-[0_1px_3px_rgba(0,0,0,0.05)] hover:border-banana-200'
        }`}
      >
        <div className="text-gray-400 mr-2">
          {url.startsWith('https') ? <Lock size={14} className="text-green-600" /> : <Search size={14} />}
        </div>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Enter a URL or query..."
          className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent font-medium"
        />
        {isLoading && (
          <span className="text-xs text-banana-500 font-semibold animate-pulse ml-2">
            Generating...
          </span>
        )}
      </form>

      {/* Placeholder Menu */}
      <div className="flex gap-2">
         <div className="w-8 h-8 rounded-full bg-banana-200 flex items-center justify-center text-banana-900 font-bold text-xs">
            BB
         </div>
      </div>
    </div>
  );
};
