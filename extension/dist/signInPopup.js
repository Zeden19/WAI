/******/ (() => { // webpackBootstrap
/*!****************************!*\
  !*** ./src/signInPopup.js ***!
  \****************************/
const signInButton = document.getElementById('signInButton');

async function signInPopup() {
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
      button.addEventListener("click", signInPopup);
      body.appendChild(button);
    }
  })
}

updateUI()

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbkluUG9wdXAuanMiLCJtYXBwaW5ncyI6Ijs7OztBQUFBOztBQUVBO0FBQ0EsaURBQWlELGtCQUFrQjtBQUNuRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsR0FBRztBQUNIOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQyxzQkFBc0IsaUJBQWlCLGdCQUFnQjtBQUNsRzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93YWktY2hyb21lLWV4dGVuc2lvbi8uL3NyYy9zaWduSW5Qb3B1cC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBzaWduSW5CdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2lnbkluQnV0dG9uJyk7XG5cbmFzeW5jIGZ1bmN0aW9uIHNpZ25JblBvcHVwKCkge1xuICBjb25zdCBkYXRhID0gYXdhaXQgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2Uoe21lc3NhZ2U6IFwic2lnbkluXCJ9KSAvLyBiYWNrZ3JvdW5kLmpzIHNhdmVzIHVzZXIgdG8gbG9jYWwgc3RvcmFnZVxuICB1cGRhdGVVSSgpXG59XG5cbi8vIEZ1bmN0aW9uIHRvIGxvZyBvdXQgdGhlIHVzZXIgYW5kIGNsZWFyIHN0b3JhZ2VcbmZ1bmN0aW9uIGxvZ091dCgpIHtcbiAgLy8gUmVtb3ZlIHVzZXIgZGF0YSBmcm9tIGNocm9tZSBsb2NhbCBzdG9yYWdlXG4gIGNocm9tZS5zdG9yYWdlLmxvY2FsLnJlbW92ZShcInVzZXJcIiwgKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKFwiVXNlciBsb2dnZWQgb3V0IGFuZCByZW1vdmVkIGZyb20gc3RvcmFnZS5cIik7XG4gICAgdXBkYXRlVUkoKTsgLy8gVXBkYXRlIFVJIHRvIHNob3cgc2lnbi1pbiBvcHRpb25cbiAgfSk7XG59XG5cblxuZnVuY3Rpb24gdXBkYXRlVUkoKSB7XG4gIGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldChcInVzZXJcIiwgKGRhdGEpID0+IHtcbiAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIik7XG4gICAgLy8gQ2xlYXIgcHJldmlvdXMgY29udGVudFxuICAgIGJvZHkuaW5uZXJIVE1MID0gXCJcIjtcblxuICAgIGlmIChkYXRhLnVzZXIpIHtcbiAgICAgIC8vIERpc3BsYXkgdXNlciBpbmZvcm1hdGlvblxuICAgICAgY29uc3QgdXNlckluZm8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgdXNlckluZm8uaW5uZXJIVE1MID0gYDxoMT5XZWxjb21lLCAke2RhdGEudXNlci5kaXNwbGF5TmFtZX08L2gxPjxwPkVtYWlsOiAke2RhdGEudXNlci5lbWFpbH08L3A+YDtcbiAgICAgIGJvZHkuYXBwZW5kQ2hpbGQodXNlckluZm8pO1xuXG4gICAgICBjb25zdCBsb2dPdXRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgbG9nT3V0QnV0dG9uLmlkID0gXCJsb2dPdXRCdXR0b25cIjtcbiAgICAgIGxvZ091dEJ1dHRvbi50ZXh0Q29udGVudCA9IFwiTG9nIE91dFwiO1xuICAgICAgbG9nT3V0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBsb2dPdXQpO1xuICAgICAgYm9keS5hcHBlbmRDaGlsZChsb2dPdXRCdXR0b24pO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFNob3cgc2lnbi1pbiBidXR0b24gaWYgbm8gdXNlciBpcyBzaWduZWQgaW5cbiAgICAgIGNvbnN0IHNpZ25Jbk1lc3NhZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDFcIik7XG4gICAgICBzaWduSW5NZXNzYWdlLnRleHRDb250ZW50ID0gXCJTaWduIGluXCI7XG4gICAgICBib2R5LmFwcGVuZENoaWxkKHNpZ25Jbk1lc3NhZ2UpO1xuXG4gICAgICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgYnV0dG9uLmlkID0gXCJzaWduSW5CdXR0b25cIjtcbiAgICAgIGJ1dHRvbi50ZXh0Q29udGVudCA9IFwiU2lnbiBpbiBXaXRoIEdvb2dsZVwiO1xuICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBzaWduSW5Qb3B1cCk7XG4gICAgICBib2R5LmFwcGVuZENoaWxkKGJ1dHRvbik7XG4gICAgfVxuICB9KVxufVxuXG51cGRhdGVVSSgpXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=