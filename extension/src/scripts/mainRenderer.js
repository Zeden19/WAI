import { addShareButton, removeShareButton } from "./components/shareButton";
import { addNotesUI, removeNotesUI } from "./components/notes";
import { addUrlButton, setUrlButtonAction } from "./components/urlButton";
import { showToast } from "./components/toast";
import { showSpinner, hideSpinner } from "./components/spinner";

let action = "Add";

// Used to Un-render the UI upon a tab change
export function mainUnRenderer() {
    removeShareButton();
    removeNotesUI();
    action = "Add";
}

// Used to Render the UI
export function mainRenderer() {
    setTimeout(async () => {
        let [button, spinner] = addUrlButton();
        button.disabled = false;
        chrome.runtime
            .sendMessage({ message: "hasAddedLink", url: window.location.href })
            .then((result) => {
                action = result.exists ? "Remove" : "Add";
                let message = result.exists ? "linkedinRemove" : "linkedinAdd";
                setUrlButtonAction(action, message);

                if (result.exists) {
                    addShareButton(button);
                    addNotesUI();
                } else {
                    removeShareButton();
                    removeNotesUI();
                }
            });
    }, 1500);
}
