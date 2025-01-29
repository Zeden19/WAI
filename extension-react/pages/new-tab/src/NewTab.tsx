import React, { useEffect } from 'react';

const OffscreenDocument: React.FC = () => {
  const _URL = 'https://wai-finance.web.app/offscreen.html';

  useEffect(() => {
    const iframe = document.createElement('iframe');
    iframe.src = _URL;
    document.documentElement.appendChild(iframe);

    const handleChromeMessages = (
      message: any,
      sender: chrome.runtime.MessageSender,
      sendResponse: (response?: any) => void,
    ) => {
      if (message.target !== 'offscreen') {
        return false;
      }

      const handleIframeMessage = ({ data }: MessageEvent) => {
        try {
          if (typeof data === 'string' && data.startsWith('!_{')) {
            return;
          }
          const parsedData = JSON.parse(data);
          globalThis.removeEventListener('message', handleIframeMessage);

          sendResponse(parsedData);
        } catch (e) {
          console.log(`json parse failed - ${e instanceof Error ? e.message : e}`);
        }
      };

      globalThis.addEventListener('message', handleIframeMessage, false);

      iframe.contentWindow?.postMessage({ initAuth: true }, new URL(_URL).origin);
      return true;
    };

    chrome.runtime.onMessage.addListener(handleChromeMessages);

    return () => {
      chrome.runtime.onMessage.removeListener(handleChromeMessages);
      document.documentElement.removeChild(iframe);
    };
  }, []);

  return null; // This component does not render anything visible
};

export default OffscreenDocument;
