/******/ (() => { // webpackBootstrap
/*!**************************!*\
  !*** ./src/offscreen.js ***!
  \**************************/
// This URL must point to the public site
const _URL = 'https://wai-finance.web.app/';
const iframe = document.createElement('iframe');
iframe.src = _URL;
document.documentElement.appendChild(iframe);
chrome.runtime.onMessage.addListener(handleChromeMessages);

function handleChromeMessages(message, sender, sendResponse) {
  // Extensions may have an number of other reasons to send messages, so you
  // should filter out any that are not meant for the offscreen document.
  if (message.target !== 'offscreen') {
    return false;
  }

  function handleIframeMessage({data}) {
    try {
      if (data.startsWith('!_{')) {
        // Other parts of the Firebase library send messages using postMessage.
        // You don't care about them in this context, so return early.
        return;
      }
      data = JSON.parse(data);
      self.removeEventListener('message', handleIframeMessage);

      sendResponse(data);
    } catch (e) {
      console.log(`json parse failed - ${e.message}`);
    }
  }

  globalThis.addEventListener('message', handleIframeMessage, false);

  // Initialize the authentication flow in the iframed document. You must set the
  // second argument (targetOrigin) of the message in order for it to be successfully
  // delivered.
  iframe.contentWindow.postMessage({"initAuth": true}, new URL(_URL).origin);
  return true;
}

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2Zmc2NyZWVuLmpzIiwibWFwcGluZ3MiOiI7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGdDQUFnQyxLQUFLO0FBQ3JDO0FBQ0EsOEJBQThCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLE1BQU07QUFDTix5Q0FBeUMsVUFBVTtBQUNuRDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyxpQkFBaUI7QUFDckQ7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3dhaS1jaHJvbWUtZXh0ZW5zaW9uLy4vc3JjL29mZnNjcmVlbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUaGlzIFVSTCBtdXN0IHBvaW50IHRvIHRoZSBwdWJsaWMgc2l0ZVxuY29uc3QgX1VSTCA9ICdodHRwczovL3dhaS1maW5hbmNlLndlYi5hcHAvJztcbmNvbnN0IGlmcmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lmcmFtZScpO1xuaWZyYW1lLnNyYyA9IF9VUkw7XG5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYXBwZW5kQ2hpbGQoaWZyYW1lKTtcbmNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihoYW5kbGVDaHJvbWVNZXNzYWdlcyk7XG5cbmZ1bmN0aW9uIGhhbmRsZUNocm9tZU1lc3NhZ2VzKG1lc3NhZ2UsIHNlbmRlciwgc2VuZFJlc3BvbnNlKSB7XG4gIC8vIEV4dGVuc2lvbnMgbWF5IGhhdmUgYW4gbnVtYmVyIG9mIG90aGVyIHJlYXNvbnMgdG8gc2VuZCBtZXNzYWdlcywgc28geW91XG4gIC8vIHNob3VsZCBmaWx0ZXIgb3V0IGFueSB0aGF0IGFyZSBub3QgbWVhbnQgZm9yIHRoZSBvZmZzY3JlZW4gZG9jdW1lbnQuXG4gIGlmIChtZXNzYWdlLnRhcmdldCAhPT0gJ29mZnNjcmVlbicpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVJZnJhbWVNZXNzYWdlKHtkYXRhfSkge1xuICAgIHRyeSB7XG4gICAgICBpZiAoZGF0YS5zdGFydHNXaXRoKCchX3snKSkge1xuICAgICAgICAvLyBPdGhlciBwYXJ0cyBvZiB0aGUgRmlyZWJhc2UgbGlicmFyeSBzZW5kIG1lc3NhZ2VzIHVzaW5nIHBvc3RNZXNzYWdlLlxuICAgICAgICAvLyBZb3UgZG9uJ3QgY2FyZSBhYm91dCB0aGVtIGluIHRoaXMgY29udGV4dCwgc28gcmV0dXJuIGVhcmx5LlxuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBkYXRhID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgICAgIHNlbGYucmVtb3ZlRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGhhbmRsZUlmcmFtZU1lc3NhZ2UpO1xuXG4gICAgICBzZW5kUmVzcG9uc2UoZGF0YSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5sb2coYGpzb24gcGFyc2UgZmFpbGVkIC0gJHtlLm1lc3NhZ2V9YCk7XG4gICAgfVxuICB9XG5cbiAgZ2xvYmFsVGhpcy5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgaGFuZGxlSWZyYW1lTWVzc2FnZSwgZmFsc2UpO1xuXG4gIC8vIEluaXRpYWxpemUgdGhlIGF1dGhlbnRpY2F0aW9uIGZsb3cgaW4gdGhlIGlmcmFtZWQgZG9jdW1lbnQuIFlvdSBtdXN0IHNldCB0aGVcbiAgLy8gc2Vjb25kIGFyZ3VtZW50ICh0YXJnZXRPcmlnaW4pIG9mIHRoZSBtZXNzYWdlIGluIG9yZGVyIGZvciBpdCB0byBiZSBzdWNjZXNzZnVsbHlcbiAgLy8gZGVsaXZlcmVkLlxuICBpZnJhbWUuY29udGVudFdpbmRvdy5wb3N0TWVzc2FnZSh7XCJpbml0QXV0aFwiOiB0cnVlfSwgbmV3IFVSTChfVVJMKS5vcmlnaW4pO1xuICByZXR1cm4gdHJ1ZTtcbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==