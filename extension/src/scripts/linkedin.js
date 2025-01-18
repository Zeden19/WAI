import { mainRenderer, mainUnRenderer } from "./mainRenderer";
import { getLoggedInUser } from "../backgroundTasks/utils";

// Inject the CSS
const components =
    chrome.runtime.getManifest().web_accessible_resources[0].resources;
(async () => {
    for (const component of components) {
        if (component.includes("global.css")) {
            const styleSheet = document.createElement("link");
            styleSheet.rel = "stylesheet";
            styleSheet.href = chrome.runtime.getURL("components/global.css");
            document.head.appendChild(styleSheet);
            continue;
        }

        const response = await fetch(chrome.runtime.getURL(component));
        const htmlText = await response.text();

        const container = document.createElement("div");
        container.innerHTML = htmlText;
        const styleTags = container.querySelectorAll("style");
        styleTags.forEach((styleTag) => {
            document.head.appendChild(styleTag);
        });
    }
})();

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
