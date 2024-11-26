import {addUrlButton} from "./urlButton";

export function showToast(message, type = "default") {
  // Create toast element
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  // Append the toast to the body
  document.body.appendChild(toast);

  toast.style.borderLeft = `7px solid ${type === "error" ? "error" : type === "success" ? "green" : "gray"}`;

  // Trigger transition in
  setTimeout(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(0)';
  }, 100);

  // Remove the toast after 3 seconds with a fade-out effect
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)'; // Slide out to the right
  }, 3000);

  // Remove the element after the transition ends
  toast.addEventListener('transitionend', () => {
    if (toast.style.opacity === '0') {
      toast.remove();
    }
  });
}

const style = document.createElement("style");
style.innerHTML = `
  .waiFinanceButton {
    border: 1px solid rgb(10, 102, 194);
    border-radius: 1.6rem;
    color: rgb(10, 102, 194);
    font-weight: bold;
    padding: 6px 16px;
    margin-right: 8px;
    background-color: white;
    cursor: pointer;
  }

  .waiFinanceButton:hover {
    background-color: rgb(55 143 233 / .1);
    box-shadow: inset 0 0 0 2px #004182
    color: white;
  }
  
  .waiFinanceButton:active {
    background-color: hsla(0,0%,100%,0.7)
  }
  
  .waiFinanceButton:disabled {
    background-color: #CCC;
    color: gray;
    box-shadow: none;
    border: #999 1px solid;
    cursor: not-allowed;
  }
  
  .toast {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #FFF;
    color: #000;
    font-weight: bold;
    padding: 10px 20px;
    border-radius: 5px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    opacity: 0; /* Start hidden */
    transform: translateX(100%); /* Start from the right side */
    transition: opacity 0.3s ease, transform 0.3s ease;
  }`;

document.head.appendChild(style);

// in case we start on a profile page
if (window.location.href.startsWith("https://www.linkedin.com/in/")) {
  chrome.storage.local.get("user", (data) => {
    if (!data.user) return
    addUrlButton()
  })
}


chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    chrome.storage.local.get("user", (data) => {
      if (!data.user) return
      addUrlButton();
      sendResponse({});
    })
  }
);