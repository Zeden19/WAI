export const addUrlButton = () => {
    let button = document.getElementById("urlButton");
    let spinner = document.createElement("spinner");

    // from testing, page loading is inconsistent, either item 3 or item 4 is the correct element
    const buttonList =
        document.getElementsByClassName("ph5")[0]?.children.item(4) ??
        document.getElementsByClassName("ph5")[0]?.children.item(3);

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

        return [button, spinner];
    }
};

