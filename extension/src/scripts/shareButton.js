export function addShareButton(urlButton) {
  const button = document.createElement("button");
  button.id = "shareButton";
  button.classList.add("waiFinanceButton");
  button.innerText = "Share Link";

  urlButton.parentElement.appendChild(button);
}

export function removeShareButton() {
  document.getElementById("shareButton")?.remove();
}