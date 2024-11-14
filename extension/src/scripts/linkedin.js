import {addUrlButton} from "./urlButton";

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
`;

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