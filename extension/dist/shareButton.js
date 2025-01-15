/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scripts/components/toast.js":
/*!*****************************************!*\
  !*** ./src/scripts/components/toast.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   showToast: () => (/* binding */ showToast)
/* harmony export */ });
function showToast(message, type = "default") {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    // Append the toast to the body
    document.body.appendChild(toast);

    toast.style.borderLeft = `7px solid ${type === "error" ? "error" : type === "success" ? "green" : "gray"}`;

    // Trigger transition in
    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(0)';
    }, 100);

    // Remove the toast after 3 seconds with a fade-out effect
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)'; // Slide out to the right
    }, 3000);

    // Remove the element after the transition ends
    toast.addEventListener('transitionend', () => {
        if (toast.style.opacity === '0') {
            toast.remove();
        }
    });
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!***********************************************!*\
  !*** ./src/scripts/components/shareButton.js ***!
  \***********************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addShareButton: () => (/* binding */ addShareButton),
/* harmony export */   removeShareButton: () => (/* binding */ removeShareButton)
/* harmony export */ });
/* harmony import */ var _toast__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toast */ "./src/scripts/components/toast.js");


let emailList = null;
let showShareList = false;
let button = null;
let container = null;
let shareContainer = null;

// Main Renderer Function
function addShareButton(urlButton) {
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

function removeShareButton() {
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


  if (emailList.length === 0) {
    const div = document.createElement("div");
    div.innerText = "No emails to share to"
    shareContainer.appendChild(div);
  } else {
    emailList.map((email, index) => {
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
      div.style.borderBottom = `${index !== emailList.length - 1 && "1px solid black"}`;
      div.innerText = email.email + `${email.hasAdded ? "-" : "+"}`;


      div.onclick = async () => {
        const data = await chrome.runtime.sendMessage({
          message: `${email.hasAdded ? "removeShareProfile" : "shareProfile"}`,
          url: window.location.href,
          email: email.email,
        });
        if (data.error) (0,_toast__WEBPACK_IMPORTED_MODULE_0__.showToast)(`"Could not ${email.hasAdded ? 'remove shared' : 'share'} link: ` + data.error, "error");
        else (0,_toast__WEBPACK_IMPORTED_MODULE_0__.showToast)(`Link successfully ${email.hasAdded ? 'removed' : 'shared'} with ${email.email}`, "success");
        email.hasAdded = !email.hasAdded
        removeShareList();
      }
      shareContainer.appendChild(div);
    })
  }

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

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVCdXR0b24uanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwwQ0FBMEMsbUVBQW1FOztBQUU3RztBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0Esb0RBQW9EO0FBQ3BELEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7Ozs7O1VDNUJBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7O0FDTmtDOztBQUVsQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGdDQUFnQyxtREFBbUQ7QUFDbkY7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyxvREFBb0Q7QUFDdEYsdUNBQXVDLDJCQUEyQjs7O0FBR2xFO0FBQ0E7QUFDQSxzQkFBc0IsdURBQXVEO0FBQzdFO0FBQ0E7QUFDQSxTQUFTO0FBQ1Qsd0JBQXdCLGlEQUFTLGVBQWUsNENBQTRDO0FBQzVGLGFBQWEsaURBQVMsc0JBQXNCLHVDQUF1QyxPQUFPLFlBQVk7QUFDdEc7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2FpLWNocm9tZS1leHRlbnNpb24vLi9zcmMvc2NyaXB0cy9jb21wb25lbnRzL3RvYXN0LmpzIiwid2VicGFjazovL3dhaS1jaHJvbWUtZXh0ZW5zaW9uL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dhaS1jaHJvbWUtZXh0ZW5zaW9uL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93YWktY2hyb21lLWV4dGVuc2lvbi93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dhaS1jaHJvbWUtZXh0ZW5zaW9uL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2FpLWNocm9tZS1leHRlbnNpb24vLi9zcmMvc2NyaXB0cy9jb21wb25lbnRzL3NoYXJlQnV0dG9uLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBzaG93VG9hc3QobWVzc2FnZSwgdHlwZSA9IFwiZGVmYXVsdFwiKSB7XG4gICAgLy8gQ3JlYXRlIHRvYXN0IGVsZW1lbnRcbiAgICBjb25zdCB0b2FzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRvYXN0LmNsYXNzTmFtZSA9ICd0b2FzdCc7XG4gICAgdG9hc3QudGV4dENvbnRlbnQgPSBtZXNzYWdlO1xuICAgIC8vIEFwcGVuZCB0aGUgdG9hc3QgdG8gdGhlIGJvZHlcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRvYXN0KTtcblxuICAgIHRvYXN0LnN0eWxlLmJvcmRlckxlZnQgPSBgN3B4IHNvbGlkICR7dHlwZSA9PT0gXCJlcnJvclwiID8gXCJlcnJvclwiIDogdHlwZSA9PT0gXCJzdWNjZXNzXCIgPyBcImdyZWVuXCIgOiBcImdyYXlcIn1gO1xuXG4gICAgLy8gVHJpZ2dlciB0cmFuc2l0aW9uIGluXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRvYXN0LnN0eWxlLm9wYWNpdHkgPSAnMSc7XG4gICAgICAgIHRvYXN0LnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGVYKDApJztcbiAgICB9LCAxMDApO1xuXG4gICAgLy8gUmVtb3ZlIHRoZSB0b2FzdCBhZnRlciAzIHNlY29uZHMgd2l0aCBhIGZhZGUtb3V0IGVmZmVjdFxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0b2FzdC5zdHlsZS5vcGFjaXR5ID0gJzAnO1xuICAgICAgICB0b2FzdC5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlWCgxMDAlKSc7IC8vIFNsaWRlIG91dCB0byB0aGUgcmlnaHRcbiAgICB9LCAzMDAwKTtcblxuICAgIC8vIFJlbW92ZSB0aGUgZWxlbWVudCBhZnRlciB0aGUgdHJhbnNpdGlvbiBlbmRzXG4gICAgdG9hc3QuYWRkRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsICgpID0+IHtcbiAgICAgICAgaWYgKHRvYXN0LnN0eWxlLm9wYWNpdHkgPT09ICcwJykge1xuICAgICAgICAgICAgdG9hc3QucmVtb3ZlKCk7XG4gICAgICAgIH1cbiAgICB9KTtcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7c2hvd1RvYXN0fSBmcm9tIFwiLi90b2FzdFwiO1xuXG5sZXQgZW1haWxMaXN0ID0gbnVsbDtcbmxldCBzaG93U2hhcmVMaXN0ID0gZmFsc2U7XG5sZXQgYnV0dG9uID0gbnVsbDtcbmxldCBjb250YWluZXIgPSBudWxsO1xubGV0IHNoYXJlQ29udGFpbmVyID0gbnVsbDtcblxuLy8gTWFpbiBSZW5kZXJlciBGdW5jdGlvblxuZXhwb3J0IGZ1bmN0aW9uIGFkZFNoYXJlQnV0dG9uKHVybEJ1dHRvbikge1xuICBpZiAoIWNvbnRhaW5lcikge1xuICAgIGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY29udGFpbmVyLmlkID0gXCJzaGFyZUJ1dHRvbkNvbnRhaW5lclwiO1xuICAgIGNvbnRhaW5lci5zdHlsZS5wb3NpdGlvbiA9IFwicmVsYXRpdmVcIjtcbiAgICB1cmxCdXR0b24ucGFyZW50RWxlbWVudC5hcHBlbmRDaGlsZChjb250YWluZXIpO1xuICB9XG5cbiAgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgYnV0dG9uLmlkID0gXCJzaGFyZUJ1dHRvblwiO1xuICBidXR0b24uY2xhc3NMaXN0LmFkZChcIndhaUZpbmFuY2VCdXR0b25cIik7XG4gIGJ1dHRvbi5pbm5lclRleHQgPSBcIlNoYXJlIExpbmtcIjtcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKGJ1dHRvbik7XG5cbiAgaWYgKCFlbWFpbExpc3QpIHtcbiAgICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSh7bWVzc2FnZTogXCJnZXRFbWFpbExpc3RcIiwgdXJsOiB3aW5kb3cubG9jYXRpb24uaHJlZn0sIChyZXN1bHQpID0+IHtcbiAgICAgIGVtYWlsTGlzdCA9IHJlc3VsdC5lbWFpbExpc3Q7XG4gICAgfSlcbiAgfVxuXG4gIGJ1dHRvbi5vbmNsaWNrID0gKCkgPT4ge1xuICAgICFzaG93U2hhcmVMaXN0ID8gYWRkU2hhcmVMaXN0KCkgOiByZW1vdmVTaGFyZUxpc3QoKVxuICAgIHNob3dTaGFyZUxpc3QgPSAhc2hvd1NoYXJlTGlzdDtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlU2hhcmVCdXR0b24oKSB7XG4gIGJ1dHRvbj8ucmVtb3ZlKCk7XG4gIHJlbW92ZVNoYXJlTGlzdCgpO1xuICBidXR0b24gPSBudWxsO1xufVxuXG5cbmZ1bmN0aW9uIGFkZFNoYXJlTGlzdCgpIHtcbiAgaWYgKCFzaGFyZUNvbnRhaW5lcikge1xuICAgIHNoYXJlQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBzaGFyZUNvbnRhaW5lci5pZCA9IFwic2hhcmVMaXN0Q29udGFpbmVyXCI7XG4gICAgc2hhcmVDb250YWluZXIuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG4gICAgc2hhcmVDb250YWluZXIuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJ3aGl0ZVwiXG4gICAgc2hhcmVDb250YWluZXIuc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xuICAgIHNoYXJlQ29udGFpbmVyLnN0eWxlLmZsZXhEaXJlY3Rpb24gPSBcImNvbHVtblwiO1xuICAgIHNoYXJlQ29udGFpbmVyLnN0eWxlLnpJbmRleCA9IFwiMTAwXCI7XG4gICAgc2hhcmVDb250YWluZXIuc3R5bGUuYm9yZGVyID0gXCIxcHggc29saWQgYmxhY2tcIjtcbiAgICBzaGFyZUNvbnRhaW5lci5zdHlsZS5ib3JkZXJSYWRpdXMgPSBcIjEwcHhcIjtcbiAgICBzaGFyZUNvbnRhaW5lci5zdHlsZS5vdmVyZmxvdyA9IFwiaGlkZGVuXCI7XG4gIH1cblxuXG4gIGlmIChlbWFpbExpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBkaXYuaW5uZXJUZXh0ID0gXCJObyBlbWFpbHMgdG8gc2hhcmUgdG9cIlxuICAgIHNoYXJlQ29udGFpbmVyLmFwcGVuZENoaWxkKGRpdik7XG4gIH0gZWxzZSB7XG4gICAgZW1haWxMaXN0Lm1hcCgoZW1haWwsIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgZGl2LnN0eWxlLmNvbG9yID0gXCJibGFja1wiO1xuICAgICAgZGl2LnN0eWxlLnBhZGRpbmcgPSBcIjNweFwiO1xuICAgICAgZGl2LnN0eWxlLmN1cnNvciA9IFwicG9pbnRlclwiO1xuICAgICAgZGl2Lm9ubW91c2VvdmVyID0gKCkgPT4ge1xuICAgICAgICBkaXYuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCIjQ0NDXCI7XG4gICAgICB9XG4gICAgICBkaXYub25tb3VzZW91dCA9ICgpID0+IHtcbiAgICAgICAgZGl2LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwid2hpdGVcIjtcbiAgICAgIH1cbiAgICAgIGRpdi5zdHlsZS5ib3JkZXJCb3R0b20gPSBgJHtpbmRleCAhPT0gZW1haWxMaXN0Lmxlbmd0aCAtIDEgJiYgXCIxcHggc29saWQgYmxhY2tcIn1gO1xuICAgICAgZGl2LmlubmVyVGV4dCA9IGVtYWlsLmVtYWlsICsgYCR7ZW1haWwuaGFzQWRkZWQgPyBcIi1cIiA6IFwiK1wifWA7XG5cblxuICAgICAgZGl2Lm9uY2xpY2sgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSh7XG4gICAgICAgICAgbWVzc2FnZTogYCR7ZW1haWwuaGFzQWRkZWQgPyBcInJlbW92ZVNoYXJlUHJvZmlsZVwiIDogXCJzaGFyZVByb2ZpbGVcIn1gLFxuICAgICAgICAgIHVybDogd2luZG93LmxvY2F0aW9uLmhyZWYsXG4gICAgICAgICAgZW1haWw6IGVtYWlsLmVtYWlsLFxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGRhdGEuZXJyb3IpIHNob3dUb2FzdChgXCJDb3VsZCBub3QgJHtlbWFpbC5oYXNBZGRlZCA/ICdyZW1vdmUgc2hhcmVkJyA6ICdzaGFyZSd9IGxpbms6IGAgKyBkYXRhLmVycm9yLCBcImVycm9yXCIpO1xuICAgICAgICBlbHNlIHNob3dUb2FzdChgTGluayBzdWNjZXNzZnVsbHkgJHtlbWFpbC5oYXNBZGRlZCA/ICdyZW1vdmVkJyA6ICdzaGFyZWQnfSB3aXRoICR7ZW1haWwuZW1haWx9YCwgXCJzdWNjZXNzXCIpO1xuICAgICAgICBlbWFpbC5oYXNBZGRlZCA9ICFlbWFpbC5oYXNBZGRlZFxuICAgICAgICByZW1vdmVTaGFyZUxpc3QoKTtcbiAgICAgIH1cbiAgICAgIHNoYXJlQ29udGFpbmVyLmFwcGVuZENoaWxkKGRpdik7XG4gICAgfSlcbiAgfVxuXG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChzaGFyZUNvbnRhaW5lcik7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVNoYXJlTGlzdCgpIHtcbiAgc2hhcmVDb250YWluZXI/LnJlbW92ZSgpO1xuICBzaGFyZUNvbnRhaW5lciA9IG51bGw7XG59XG5cblxuZnVuY3Rpb24gaGFuZGxlQ2xpY2soZXZlbnQpIHtcbiAgaWYgKHNob3dTaGFyZUxpc3QgJiYgIXNoYXJlQ29udGFpbmVyPy5jb250YWlucyhldmVudC50YXJnZXQpICYmICFidXR0b24/LmNvbnRhaW5zKGV2ZW50LnRhcmdldCkpIHtcbiAgICByZW1vdmVTaGFyZUxpc3QoKTtcbiAgICBzaG93U2hhcmVMaXN0ID0gZmFsc2VcbiAgfVxufVxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlQ2xpY2spO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9