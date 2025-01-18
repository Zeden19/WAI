
export async function showToast(message, type = "default") {
    // Create toast element
    const toast = document.createElement("div");
    toast.id = "toast";
    toast.textContent = message;
    // Append the toast to the body
    document.body.appendChild(toast);

    toast.style.borderLeft = `7px solid ${type === "error" ? "red" : type === "success" ? "green" : "gray"}`;

    // Trigger transition in
    setTimeout(() => {
        toast.style.opacity = "1";
        toast.style.transform = "translateX(0)";
    }, 100);

    // Remove the toast after 3 seconds with a fade-out effect
    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateX(100%)"; // Slide out to the right
    }, 3000);

    // Remove the element after the transition ends
    toast.addEventListener("transitionend", () => {
        if (toast.style.opacity === "0") {
            toast.remove();
        }
    });
}
