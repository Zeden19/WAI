import { showToast } from "./toast";
import getElementFromHTML from "./getElementFromHTML";

let button = null;
let container = null;
let shareListContainer = null;
let showShareList = false;
let emailList = null;

// Main Renderer Function
export async function addShareButton(urlButton) {
    if (!container) {
        container = await getElementFromHTML("share.html", "shareContainer");
        button = container.querySelector("#shareButton");
        shareListContainer = container.querySelector("#shareListContainer");
        urlButton.parentElement.appendChild(container);
    }

    if (!emailList) {
        chrome.runtime.sendMessage(
            { message: "getEmailList", url: window.location.href },
            (result) => {
                emailList = result.emailList;
            },
        );
    }

    button.onclick = () => {
        console.log(!showShareList);
        !showShareList ? addShareList() : removeShareList();
        showShareList = !showShareList;
    };
}

export function removeShareButton() {
    container?.remove();
    container = null;
    button = null;
    shareListContainer = null;
    showShareList = false;
    emailList = null;
}

function addShareList() {
    if (emailList.length === 0) {
        const div = document.createElement("div");
        div.innerText = "No emails to share to";
        shareListContainer.appendChild(div);
    } else {
        emailList.map((email, index) => {
            const div = document.createElement("div");
            div.style.color = "black";
            div.style.padding = "3px";
            div.style.cursor = "pointer";
            div.onmouseover = () => {
                div.style.backgroundColor = "#CCC";
            };
            div.onmouseout = () => {
                div.style.backgroundColor = "white";
            };
            div.style.borderBottom = `${index !== emailList.length - 1 && "1px solid black"}`;
            div.innerText = email.email + `${email.hasAdded ? "-" : "+"}`;

            div.onclick = async () => {
                const data = await chrome.runtime.sendMessage({
                    message: `${email.hasAdded ? "removeShareProfile" : "shareProfile"}`,
                    url: window.location.href,
                    email: email.email,
                });
                if (data.error)
                    showToast(
                        `"Could not ${email.hasAdded ? "remove shared" : "share"} link: ` +
                            data.error,
                        "error",
                    );
                else
                    showToast(
                        `Link successfully ${email.hasAdded ? "removed" : "shared"} with ${email.email}`,
                        "success",
                    );
                email.hasAdded = !email.hasAdded;
                showShareList = false;
                removeShareList();
            };
            shareListContainer.appendChild(div);
        });
    }

    container.appendChild(shareListContainer);
}

function removeShareList() {
    if (shareListContainer) {
        shareListContainer.innerHTML = "";
    }
}

function handleClick(event) {
    if (
        showShareList &&
        !shareListContainer?.contains(event.target) &&
        !button?.contains(event.target)
    ) {
        removeShareList();
        showShareList = false;
    }
}

document.addEventListener("click", handleClick);
