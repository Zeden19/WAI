export function showSpinner(spinner) {
    spinner.innerHTML = `
    <svg width="15" height="15" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <style>.spinner{transform-origin:center;animation:spin 1s cubic-bezier(0.36,.6,.31,1) infinite}@keyframes spin{50%{transform:rotate(180deg)}100%{transform:rotate(360deg)}}</style>
      <circle cx="12" cy="12" r="3"/>
      <g class="spinner"><circle cx="4" cy="12" r="3"/><circle cx="20" cy="12" r="3"/></g>
    </svg>`;
    spinner.style.display = "inline-block";
}

export function hideSpinner(spinner) {
    spinner.style.display = "none";
}
