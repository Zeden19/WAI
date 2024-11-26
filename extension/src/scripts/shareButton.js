import {showToast} from "./linkedin";

let emailList = null;
let showShareList = false;
let button = null;
let container = null;
let shareContainer = null;

export function addShareButton(urlButton) {
  if (!container) {
    container = document.createElement("div");
    container.id = "shareButtonContainer";
    container.style.position = "relative";
    urlButton.parentElement.appendChild(container);
  }

  button = document.createElement("button");
  button.id = "shareButton";
  button.classList.add("waiFinanceButton");
  button.innerText = "Share Link";
  container.appendChild(button);

  if (!emailList) {
    chrome.runtime.sendMessage({message: "getEmailList", url: window.location.href}, (result) => {
      emailList = result.emailList;
    })
  }

  button.onclick = () => {
    !showShareList ? addShareList() : removeShareList()
    showShareList = !showShareList;
  }
}

export function removeShareButton() {
  button?.remove();
  removeShareList();
  button = null;
}


function addShareList() {
  if (!shareContainer) {
    shareContainer = document.createElement("div");
    shareContainer.id = "shareListContainer";
    shareContainer.style.position = "absolute";
    shareContainer.style.backgroundColor = "white"
    shareContainer.style.display = "flex";
    shareContainer.style.flexDirection = "column";
    shareContainer.style.zIndex = "100";
    shareContainer.style.border = "1px solid black";
    shareContainer.style.borderRadius = "10px";
    shareContainer.style.overflow = "hidden";
  }

  const div = document.createElement("div");
  div.style.color = "black";
  div.style.padding = "3px";
  div.style.cursor = "pointer";
  div.onmouseover = () => {
    div.style.backgroundColor = "#CCC";
  }
  div.onmouseout = () => {
    div.style.backgroundColor = "white";
  }

  if (emailList.length === 0) {
    div.style.border = "1px solid black";
    div.innerText = "No emails";
  } else {
    emailList.map((email, index) => {
      div.style.borderBottom = `${index !== emailList.length - 1 && "1px solid black"}`;
      div.innerText = email.email + `${email.hasAdded ? "-" : "+"}`;


      div.onclick = async () => {
        const data = await chrome.runtime.sendMessage({
          message: `${email.hasAdded ? "removeShareProfile" : "shareProfile"}`,
          url: window.location.href,
          email: email.email,
        });
        if (data.error) showToast(`"Could not ${email.hasAdded ? 'remove shared' : 'share'} link: ` + data.error, "error");
        else showToast(`Link successfully ${email.hasAdded ? 'removed' : 'shared'} with ${email.email}`, "success");
        removeShareList();
      }
    })
  }

  shareContainer.appendChild(div);
  container.appendChild(shareContainer);
}

function removeShareList() {
  shareContainer?.remove();
  shareContainer = null;
}


function handleClick(event) {
  if (showShareList && !shareContainer?.contains(event.target) && !button?.contains(event.target)) {
    removeShareList();
    showShareList = false
  }
}

document.addEventListener("click", handleClick);
