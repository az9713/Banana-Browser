import React, { useState } from 'react';
import { DEFAULT_SUGGESTIONS } from '../constants';
import { Search, Sparkles } from 'lucide-react';

interface HomeViewProps {
  onNavigate: (url: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onNavigate(inputValue);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] bg-banana-50 text-center px-4 animate-fade-in">
      <div className="max-w-3xl w-full flex flex-col items-center">
        
        {/* Logo Section */}
        <div className="mb-8 flex flex-col items-center animate-slide-up">
           <div className="text-6xl mb-4">🍌</div>
           <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3 tracking-tight">
             Banana Browser
           </h1>
           <div className="flex items-center gap-2 text-gray-600 font-medium bg-white/50 px-4 py-1.5 rounded-full border border-banana-200">
             <Sparkles size={16} className="text-banana-500" />
             <span>The Internet, Reimagined by AI</span>
           </div>
        </div>

        <p className="text-gray-500 mb-10 max-w-lg leading-relaxed">
          Enter any URL above and watch as AI generates a complete website in real-time. 
          Every page is unique, every link works, and nothing is real.
        </p>

        {/* Big Search Bar */}
        <form 
          onSubmit={handleSubmit}
          className={`w-full max-w-2xl relative group transition-all duration-300 ${
            isFocused ? 'scale-[1.02]' : ''
          }`}
        >
          <div className={`absolute inset-0 bg-banana-400 rounded-2xl blur opacity-20 transition-opacity duration-300 ${isFocused ? 'opacity-40' : 'opacity-0 group-hover:opacity-30'}`}></div>
          <div className={`relative flex items-center w-full bg-white border-2 rounded-2xl overflow-hidden shadow-sm transition-colors duration-300 ${
            isFocused ? 'border-banana-400' : 'border-banana-200'
          }`}>
             <div className="pl-4 text-gray-400">
                <Search size={20} />
             </div>
             <input
               type="text"
               value={inputValue}
               onChange={(e) => setInputValue(e.target.value)}
               onFocus={() => setIsFocused(true)}
               onBlur={() => setIsFocused(false)}
               className="w-full py-4 px-4 outline-none text-lg text-gray-800 placeholder-gray-400 font-medium bg-transparent"
               placeholder="Enter any URL..."
               autoFocus
             />
             <button 
                type="submit"
                className="mr-2 p-2 rounded-xl bg-banana-100 text-banana-900 hover:bg-banana-300 transition-colors"
             >
                <span className="font-semibold text-sm px-2">Go</span>
             </button>
          </div>
        </form>

        {/* Suggestions */}
        <div className="mt-12">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Try these</p>
          <div className="flex flex-wrap justify-center gap-3">
            {DEFAULT_SUGGESTIONS.map((suggestion) => (
              <button
                key={suggestion.name}
                onClick={() => onNavigate(suggestion.url)}
                className="px-5 py-2.5 bg-white border border-banana-200 shadow-sm rounded-full text-sm font-medium text-gray-700 hover:border-banana-400 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2"
              >
                {suggestion.name}
              </button>
            ))}
          </div>
        </div>

      </div>
      
      <div className="fixed bottom-4 right-4 flex items-center gap-2 text-xs text-gray-400">
        <span>Powered by Gemini 2.5</span>
      </div>
    </div>
  );
};