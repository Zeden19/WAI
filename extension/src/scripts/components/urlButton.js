// there is not "removeUrlButton()" function because the URL button is always
// supposed to be present. In the future, we could add one when the user
// logs out
import { showToast } from "./toast";
import { addShareButton, removeShareButton } from "./shareButton";
import { renderNotesUI, removeNotesUI } from "./notes";
import getElementFromHTML from "./getElementFromHTML";

let button;
let spinner;
let text;
export const addUrlButton = async () => {
    button = document.getElementById("urlButton");
    spinner = document.createElement("spinner");

    // from testing, page loading is inconsistent, either item 3 or item 4 is the correct element
    let consistentElement = document.getElementsByClassName("ph5 pb5");
    let buttonList;
    if (consistentElement.length !== 0) {
        // this occurs if there is a "connect with people you know" bubble
        buttonList =
            consistentElement[0]?.children.item(3).tagName !== "A"
                ? consistentElement[0]?.children.item(3)
                : consistentElement[0]?.children.item(4);
    } else {
        buttonList =
            document.getElementsByClassName("ph5")[0]?.children.item(4) ??
            document.getElementsByClassName("ph5")[0]?.children.item(3);
    }

    if (!button) {
        button = await getElementFromHTML("url.html", "urlButton");
        button.classList.add("waiButton");
        spinner = button.querySelector("#spinner");
        text = button.querySelector("#urlButtonAction");
        buttonList.append(button);
    }
    // linkedin page gets messed up when we add more buttons, so make sure it can wrap
    buttonList.style.flexWrap = "wrap";
    buttonList.style.rowGap = "10px";
    button.disabled = false;
    return button;
};

export const setUrlButtonAction = (action, message) => {
    text.innerHTML = `${action} URL`;

    // we use onclick here instead of adding an event listener to prevent duplicate clicks
    button.onclick = async () => {
        button.disabled = true;

        spinner.style.display = "inline-block";
        const data = await chrome.runtime.sendMessage({
            message,
            url: window.location.href,
        });
        spinner.style.display = "none";
        button.disabled = false;

        if (data.error) {
            await showToast(
                `Could not ${action.toLowerCase()} link: ${data.error}`,
                "error",
            );
        } else {
            await showToast(
                `Link successfully ${action.toLowerCase()}ed!`,
                "success",
            );

            // Toggle action and message for next click
            if (action === "Add") {
                action = "Remove";
                message = "linkedinRemove";

                if (!document.getElementById("waiButton")) {
                    addShareButton(button);
                    renderNotesUI();
                }
            } else {
                action = "Add";
                message = "linkedinAdd";
                removeShareButton();
                removeNotesUI();
            }
            text.innerHTML = `${action} URL`;
        }
    };
};
