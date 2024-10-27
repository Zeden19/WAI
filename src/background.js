chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "linkedinAdd") {
    chrome.action.setPopup({ popup: "src/popups/addProfile/hello.html" });
    chrome.action.openPopup(); // Triggers the popup
  }
});
