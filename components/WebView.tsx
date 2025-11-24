import React, { useEffect, useRef } from 'react';
import { LoadingScreen } from './LoadingScreen';

interface WebViewProps {
  htmlContent: string | null;
  isLoading: boolean;
  onInternalNavigate: (url: string) => void;
}

export const WebView: React.FC<WebViewProps> = ({ htmlContent, isLoading, onInternalNavigate }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Handle messages from the iframe (simulating navigation)
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Security check: in a real app, verify origin. 
      // Here, since we generate the srcDoc, we trust it somewhat, but 'null' or 'file://' origins might happen.
      
      if (event.data && event.data.type === 'NAVIGATE' && event.data.url) {
        console.log("Internal navigation request:", event.data.url);
        onInternalNavigate(event.data.url);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onInternalNavigate]);

  return (
    <div className="flex-1 relative w-full h-full bg-white overflow-hidden">
      {isLoading && <LoadingScreen />}
      
      {htmlContent ? (
        <iframe
          ref={iframeRef}
          title="Generated Website"
          srcDoc={htmlContent}
          className="w-full h-full border-0 block"
          sandbox="allow-scripts allow-same-origin allow-forms"
          // We allow scripts so our click interceptor works. 
          // allow-same-origin is needed for some JS but increases risk. 
          // Given this is an ephemeral AI browser, it's acceptable for the demo.
        />
      ) : (
        !isLoading && (
            <div className="w-full h-full flex items-center justify-center text-gray-300">
                <p>No content loaded</p>
            </div>
        )
      )}
    </div>
  );
};
