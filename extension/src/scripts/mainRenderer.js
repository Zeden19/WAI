import { addShareButton, removeShareButton } from "./components/shareButton";
import { addNotesUI, removeNotesUI } from "./components/notes";
import { addUrlButton, setUrlButtonAction } from "./components/urlButton";

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
        const result = await chrome.runtime.sendMessage({
            message: "hasAddedLink",
            url: window.location.href,
        });

        action = result.exists ? "Remove" : "Add";
        let message = result.exists ? "linkedinRemove" : "linkedinAdd";

        if (result.exists) {
            addShareButton(button);
            addNotesUI();
        } else {
            removeShareButton();
            removeNotesUI();
        }

        setUrlButtonAction(action, message);
    }, 1500);
}
