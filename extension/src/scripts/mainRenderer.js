import { addShareButton, removeShareButton } from "./components/shareButton";
import { addNotesUI, removeNotesUI } from "./components/notes";
import { addUrlButton } from "./components/urlButton";
import {showToast} from "./components/toast";
import {showSpinner, hideSpinner} from "./components/spinner";


let action = "Add";

// Used to Un-render the UI upon a tab change
export function mainUnRenderer() {
  removeShareButton();
  removeNotesUI();
  action = "Add";
}

// Used to Render the UI
export function mainRenderer() {
  setTimeout(() => {
    let [button, spinner] = addUrlButton();

    button.disabled = false;
    chrome.runtime
      .sendMessage({ message: "hasAddedLink", url: window.location.href })
      .then((result) => {
        action = result.exists ? "Remove" : "Add";
        let message = result.exists ? "linkedinRemove" : "linkedinAdd";

        if (result.exists){ 
          addShareButton(button);
          addNotesUI();
        } else{
          removeShareButton();
          removeNotesUI();
        }
        console.log(result);
        console.log(action);

        button.innerText = `${action} URL`;

        // we use onclick here instead of adding an event listener to prevent duplicate clicks
        button.onclick = async () => {
          button.disabled = true;


          if (!spinner) {
            spinner = document.getElementById("spinner");
          }

          showSpinner(spinner);
          const data = await chrome.runtime.sendMessage({
            message,
            url: window.location.href,
          });
          hideSpinner(spinner);

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

              if (!document.getElementById("shareButton")){
                addShareButton(button);
                addNotesUI();
              }
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
  }, 2000);
}

