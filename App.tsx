import React, { useState, useCallback, useEffect } from 'react';
import { BrowserChrome } from './components/BrowserChrome';
import { HomeView } from './components/HomeView';
import { WebView } from './components/WebView';
import { generateWebsite } from './services/geminiService';
import { cleanGeneratedHtml, normalizeUrl } from './utils/htmlUtils';
import { HistoryEntry } from './types';

const App: React.FC = () => {
  // State
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUrl, setCurrentUrl] = useState(''); // Displayed in bar

  // Current active page data
  const activeEntry = currentIndex >= 0 ? history[currentIndex] : null;

  // Navigate to a new URL
  const handleNavigate = useCallback(async (inputUrl: string) => {
    const url = normalizeUrl(inputUrl);
    
    // Update UI immediately to show we are loading this URL
    setCurrentUrl(url);
    setIsLoading(true);

    try {
      // Call Gemini API
      console.log(`Generating content for: ${url}`);
      const rawHtml = await generateWebsite(url);
      const cleanHtml = cleanGeneratedHtml(rawHtml);

      // Create new history entry
      const newEntry: HistoryEntry = {
        url: url,
        html: cleanHtml,
        title: url, // Could extract title from HTML
        timestamp: Date.now(),
      };

      setHistory(prev => {
        const newHistory = prev.slice(0, currentIndex + 1);
        return [...newHistory, newEntry];
      });
      setCurrentIndex(prev => prev + 1);

    } catch (error) {
      console.error("Failed to generate page", error);
      alert("AI failed to imagine this website. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [currentIndex, history]);

  // Handle back button
  const handleBack = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      setCurrentUrl(history[newIndex].url);
    } else if (currentIndex === 0) {
        // Go back to home
        setCurrentIndex(-1);
        setCurrentUrl('');
    }
  };

  // Handle forward button
  const handleForward = () => {
    if (currentIndex < history.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      setCurrentUrl(history[newIndex].url);
    }
  };

  // Handle refresh
  const handleRefresh = () => {
    if (activeEntry) {
      handleNavigate(activeEntry.url);
    }
  };

  // If we are at index -1, we show HomeView. Otherwise WebView.
  const isHome = currentIndex === -1;

  return (
    <div className="flex flex-col h-screen w-screen bg-banana-50 overflow-hidden text-gray-900 font-sans selection:bg-banana-200">
      {/* Browser Chrome (Header) */}
      <BrowserChrome 
        url={currentUrl} 
        isLoading={isLoading}
        canGoBack={currentIndex >= 0}
        canGoForward={currentIndex < history.length - 1}
        onNavigate={handleNavigate}
        onBack={handleBack}
        onForward={handleForward}
        onRefresh={handleRefresh}
      />

      {/* Main Content Area */}
      <div className="flex-1 relative overflow-hidden">
        {isHome && !isLoading ? (
          <HomeView onNavigate={handleNavigate} />
        ) : (
          <WebView 
            htmlContent={activeEntry?.html || null} 
            isLoading={isLoading}
            onInternalNavigate={handleNavigate}
          />
        )}
      </div>
    </div>
  );
};

export default App;
