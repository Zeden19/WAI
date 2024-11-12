const signInButton = document.getElementById('signInButton');

async function signIn() {
  const data = await chrome.runtime.sendMessage({message: "signIn"}) // background.js saves user to local storage
  updateUI()
}

// Function to log out the user and clear storage
function logOut() {
  // Remove user data from chrome local storage
  chrome.storage.local.remove("user", () => {
    console.log("User logged out and removed from storage.");
    updateUI(); // Update UI to show sign-in option
  });
}


function updateUI() {
  chrome.storage.local.get("user", (data) => {
    const body = document.querySelector("body");
    // Clear previous content
    body.innerHTML = "";

    if (data.user) {
      // Display user information
      const userInfo = document.createElement("div");
      userInfo.innerHTML = `<h1>Welcome, ${data.user.displayName}</h1><p>Email: ${data.user.email}</p>`;
      body.appendChild(userInfo);

      const logOutButton = document.createElement("button");
      logOutButton.id = "logOutButton";
      logOutButton.textContent = "Log Out";
      logOutButton.addEventListener("click", logOut);
      body.appendChild(logOutButton);

    } else {
      // Show sign-in button if no user is signed in
      const signInMessage = document.createElement("h1");
      signInMessage.textContent = "Sign in";
      body.appendChild(signInMessage);

      const button = document.createElement("button");
      button.id = "signInButton";
      button.textContent = "Sign in With Google";
      button.addEventListener("click", signIn);
      body.appendChild(button);
    }
  })
}

updateUI()
