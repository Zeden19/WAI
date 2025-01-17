// there is not "removeUrlButton()" function because the URL button is always
// supposed to be present. In the future, we could add one when the user
// logs out
import { hideSpinner, showSpinner } from "./spinner";
import { showToast } from "./toast";
import { addShareButton, removeShareButton } from "./shareButton";
import { addNotesUI, removeNotesUI } from "./notes";

let button;
let spinner;
export const addUrlButton = () => {
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
    }
    button.disabled = false;
    return [button, spinner];
};

export const setUrlButtonAction = (action, message) => {
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
                "error",
            );
        } else {
            showToast(
                `Link successfully ${action.toLowerCase()}ed!`,
                "success",
            );

            // Toggle action and message for next click
            if (action === "Add") {
                action = "Remove";
                message = "linkedinRemove";

                if (!document.getElementById("shareButton")) {
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
};
