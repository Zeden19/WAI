const buttonList = document.getElementsByClassName("ph5")[0].children.item(3);

const button = document.createElement("button");
button.innerText = "Add URL"
button.id = "waiFinance"
button.classList.add("waiFinanceButton");
button.addEventListener("click", async function (event) {
  button.disabled = true;
  const spinner = document.getElementById("spinner");
  spinner.innerHTML = `<svg width="15" height="15" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><style>.spinner_HIK5{transform-origin:center;animation:spinner_XVY9 1s cubic-bezier(0.36,.6,.31,1) infinite}@keyframes spinner_XVY9{50%{transform:rotate(180deg)}100%{transform:rotate(360deg)}}</style><circle cx="12" cy="12" r="3"/><g class="spinner_HIK5"><circle cx="4" cy="12" r="3"/><circle cx="20" cy="12" r="3"/></g></svg>`;
  spinner.style.display = "inline-block";
  const data = await chrome.runtime.sendMessage({message: "linkedinAdd", url: window.location.href})
  spinner.style.display = "none";

  if (data.error) {
    button.disabled = false;
    // show error stuff shit balls
  }

})

const spinner = document.createElement("span");
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

buttonList.append(button)

const style = document.createElement("style");
style.innerHTML = `
  .waiFinanceButton {
    border: 1px solid rgb(10, 102, 194);
    border-radius: 1.6rem;
    color: rgb(10, 102, 194);
    font-weight: bold;
    padding: 6px 16px;
    background-color: white;
    cursor: pointer;
  }

  .waiFinanceButton:hover {
    background-color: rgb(55 143 233 / .1);
    box-shadow: inset 0 0 0 2px #004182
    color: white;
  }
  
  .waiFinanceButton:active {
    background-color: hsla(0,0%,100%,0.7)
  }
  
  .waiFinanceButton:disabled {
    background-color: #CCC;
    color: gray;
    box-shadow: none;
    border: #999 1px solid;
    cursor: not-allowed;
  }
`;

document.head.appendChild(style);

// making sure user cannot duplicate links
function checkLinkedAdded(url) {
  chrome.runtime.sendMessage({message: "hasAddedLink", url}).then((result) => {
    console.log(result)
    button.disabled = !!result.exists;
  });
}
checkLinkedAdded(window.location.href);
window.navigation.addEventListener("navigate", (event) => {
  checkLinkedAdded(event.destination.url);
})
