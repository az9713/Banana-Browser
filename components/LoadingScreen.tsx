import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

const LOADING_MESSAGES = [
  "Dreaming up layout...",
  "Painting pixels...",
  "Writing JavaScript...",
  "Inventing content...",
  "Optimizing for banana...",
  "Polishing CSS...",
  "Adding magic dust..."
];

export const LoadingScreen: React.FC = () => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm absolute inset-0 z-40">
      <div className="relative">
        <div className="absolute inset-0 bg-banana-300 rounded-full blur-xl opacity-30 animate-pulse"></div>
        <div className="relative bg-white p-6 rounded-2xl shadow-xl border border-banana-100 flex flex-col items-center">
          <Loader2 className="w-10 h-10 text-banana-500 animate-spin mb-4" />
          <h3 className="text-lg font-bold text-gray-800 mb-1">Generating Website</h3>
          <p className="text-sm text-gray-500 w-40 text-center h-5">
            {LOADING_MESSAGES[messageIndex]}
          </p>
        </div>
      </div>
    </div>
  );
};
