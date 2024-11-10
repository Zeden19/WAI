const buttonList = document.getElementsByClassName("ph5")[0].children.item(3)

const button = document.createElement("button");
button.innerText = "Add URL"
button.id = "waiFinance"
button.classList.add("waiFinanceButton");
buttonList.append(button)

button.addEventListener("click", async function (event) {
  const data = await chrome.runtime.sendMessage({message: "linkedinAdd", url: window.location.href})
})

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
`;

// Append the style to the head of the document
document.head.appendChild(style);