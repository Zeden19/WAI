import { addShareButton, removeShareButton } from "./shareButton";
import { addNotesUI, removeNotesUI } from "./notes";
import { showToast } from "./linkedin";

export function addUrlButton() {
  setTimeout(() => {
    const renderButtons = () => {
      let button = document.getElementById("urlButton");
      let spinner = document.createElement("spinner");
      // from testing, page loading is inconsistent, either item 3 or item 4 is the correct element
      const buttonList =
        document.getElementsByClassName("ph5")[0]?.children.item(4) ??
        document.getElementsByClassName("ph5")[0].children.item(3);

      if (!button) {
        button = document.createElement("button");
        button.id = "urlButton";
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

        // linkedin page gets messed up when we add more buttons, so make sure it can wrap
        buttonList.style.flexWrap = "wrap";
        buttonList.style.rowGap = "10px";

        return [button, spinner];
      }
    };

    // Renders and creates the text area for notes
    const renderNotesTextArea = () => {
      let notesTextArea = document.getElementById("notesTextArea");
      const parentUI = document.querySelector(".ph5.pb5");

      if (!notesTextArea) {
        notesTextArea = document.createElement("textarea");
        parentUI.appendChild(notesTextArea);
      }

      return notesTextArea;
    };

    const [button, spinner] = renderButtons();

    button.disabled = false;
    chrome.runtime
      .sendMessage({ message: "hasAddedLink", url: window.location.href })
      .then((result) => {
        let action = result.exists ? "Remove" : "Add";
        let message = result.exists ? "linkedinRemove" : "linkedinAdd";

        if (result.exists){ 
          addShareButton(button);
          addNotesUI(renderNotesTextArea());
        } else{
          removeShareButton();
          removeNotesUI();
        }

        button.innerText = `${action} URL`;

        // we use onclick here instead of adding a event listener to prevent duplicate clicks
        button.onclick = async () => {
          button.disabled = true;
          if (!spinner) {
            spinner = document.getElementById("spinner");
          }

          showSpinner();
          const data = await chrome.runtime.sendMessage({
            message,
            url: window.location.href,
          });
          hideSpinner();

          if (data.error) {
            button.disabled = false;
            showToast(
              `Could not ${action.toLowerCase()} link: ${data.error}`,
              "error"
            );
          } else {
            showToast(
              `Link successfully ${action.toLowerCase()}ed!`,
              "success"
            );

            // Toggle action and message for next click
            if (action === "Add") {
              action = "Remove";
              message = "linkedinRemove";

              if (!document.getElementById("shareButton"))
                addShareButton(button);
                addNotesUI(renderNotesTextArea());
            } else {
              action = "Add";
              message = "linkedinAdd";
              removeShareButton();
              removeNotesUI();
            }
            button.innerText = `${action} URL`;
            button.disabled = false;
          }
        };
      });

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
  }, 2000);
}
