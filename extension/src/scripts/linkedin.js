function showToast(message) {
  // Create toast element
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;

  // Style the toast
  toast.style.position = 'fixed';
  toast.style.bottom = '20px';
  toast.style.right = '20px';
  toast.style.backgroundColor = '#FFF';
  toast.style.color = '#000';
  toast.style.fontWeight = "bold"
  toast.style.padding = '10px 20px';
  toast.style.border = "green 1px solid"
  toast.style.borderRadius = '5px';
  toast.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.1)';
  toast.style.zIndex = '1000';
  toast.style.opacity = '0'; // Start hidden
  toast.style.transform = 'translateX(100%)'; // Start from the right side
  toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

  // Append the toast to the body
  document.body.appendChild(toast);

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

function addButton() {
  let button = document.getElementById("waiFinance");
  let spinner = document.createElement("spinner");
  if (!button) {
    // from testing, page loading is inconsistent, either item 3 or item 4 is the correct element
    const buttonList = document.getElementsByClassName("ph5")[0].children.item(4) ??
      document.getElementsByClassName("ph5")[0].children.item(3);

    button = document.createElement("button");
    button.id = "waiFinance"
    button.classList.add("waiFinanceButton");

    spinner = document.createElement("span");
    spinner.id = "spinner";
    spinner.style.display = "none";
    spinner.innerHTML = `
    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <style>
        .spinner_HIK5 { transform-origin: center; animation: spinner_XVY9 1s cubic-bezier(0.36, .6, .31, 1) infinite; }
        @keyframes spinner_XVY9 { 50% { transform: rotate(180deg); } 100% { transform: rotate(360deg); } }
      </style>
      <circle cx="12" cy="12" r="3"/>
      <g class="spinner_HIK5">
        <circle cx="4" cy="12" r="3"/>
        <circle cx="20" cy="12" r="3"/>
      </g>
    </svg>`;

    button.appendChild(spinner);
    buttonList.append(button);

    const style = document.createElement("style");
    style.innerHTML = `
  .waiFinanceButton {
    border: 1px solid rgb(10, 102, 194);
    border-radius: 1.6rem;
    color: rgb(10, 102, 194);
    font-weight: bold;
    padding: 6px 16px;
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
  }

  button.disabled = false;
  chrome.runtime.sendMessage({message: "hasAddedLink", url: window.location.href}).then((result) => {
      let action = result.exists ? "Remove" : "Add";
      let message = result.exists ? "linkedinRemove" : "linkedinAdd";

      button.innerText = `${action} URL`;

      // we use onclick here instead of adding a event listener to prevent duplicate clicks
      button.onclick = async () => {
        button.disabled = true;
        if (!spinner) {
          spinner = document.getElementById("spinner");
        }

        showSpinner();
        const data = await chrome.runtime.sendMessage({message, url: window.location.href});
        hideSpinner();

        if (data.error) {
          button.disabled = false;
          showToast(`Could not ${action.toLowerCase()} link: ${data.error}`);
        } else {
          showToast(`Link successfully ${action.toLowerCase()}ed!`);

          // Toggle action and message for next click
          if (action === "Add") {
            action = "Remove";
            message = "linkedinRemove";
          } else {
            action = "Add";
            message = "linkedinAdd";
          }
          button.innerText = `${action} URL`;
          button.disabled = false;
        }
      }
    }
  );


  function showSpinner() {
    spinner.innerHTML = `
    <svg width="15" height="15" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <style>.spinner{transform-origin:center;animation:spin 1s cubic-bezier(0.36,.6,.31,1) infinite}@keyframes spin{50%{transform:rotate(180deg)}100%{transform:rotate(360deg)}}</style>
      <circle cx="12" cy="12" r="3"/>
      <g class="spinner"><circle cx="4" cy="12" r="3"/><circle cx="20" cy="12" r="3"/></g>
    </svg>`;
    spinner.style.display = "inline-block";
  }

  function hideSpinner() {
    spinner.style.display = "none";
  }
}


// in case we start on a profile page
if (window.location.href.startsWith("https://www.linkedin.com/in/")) {
  addButton()
}


chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    addButton();
    sendResponse({});
  }
);