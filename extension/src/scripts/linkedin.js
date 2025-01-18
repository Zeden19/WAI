import { mainRenderer, mainUnRenderer } from "./mainRenderer";
import { getLoggedInUser } from "../backgroundTasks/utils";

// Inject the CSS
const styleSheet = document.createElement("link");
styleSheet.rel = "stylesheet";
styleSheet.href = chrome.runtime.getURL("components/styles.css");
document.head.appendChild(styleSheet);

// in case we start on a profile page
if (window.location.href.startsWith("https://www.linkedin.com/in/")) {
    async function renderPage() {
        const user = await getLoggedInUser();
        if (!user) return;
        mainUnRenderer();
        mainRenderer();
    }

    renderPage();
}

chrome.runtime.onMessage.addListener(
    async function (request, sender, sendResponse) {
        console.log("event listener");
        const user = await getLoggedInUser();
        if (!user) return;

        mainUnRenderer();
        mainRenderer();
        sendResponse({});
    },
);
