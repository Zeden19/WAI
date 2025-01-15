/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
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
/*!*********************************************!*\
  !*** ./src/scripts/components/urlButton.js ***!
  \*********************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addUrlButton: () => (/* binding */ addUrlButton)
/* harmony export */ });
const addUrlButton = () => {
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


/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXJsQnV0dG9uLmpzIiwibWFwcGluZ3MiOiI7O1VBQUE7VUFDQTs7Ozs7V0NEQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTk87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QiwwQkFBMEI7QUFDdEQsc0NBQXNDLE1BQU0sNkJBQTZCLE9BQU87QUFDaEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2FpLWNocm9tZS1leHRlbnNpb24vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2FpLWNocm9tZS1leHRlbnNpb24vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dhaS1jaHJvbWUtZXh0ZW5zaW9uL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2FpLWNocm9tZS1leHRlbnNpb24vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93YWktY2hyb21lLWV4dGVuc2lvbi8uL3NyYy9zY3JpcHRzL2NvbXBvbmVudHMvdXJsQnV0dG9uLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFRoZSByZXF1aXJlIHNjb3BlXG52YXIgX193ZWJwYWNrX3JlcXVpcmVfXyA9IHt9O1xuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiZXhwb3J0IGNvbnN0IGFkZFVybEJ1dHRvbiA9ICgpID0+IHtcbiAgICBsZXQgYnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ1cmxCdXR0b25cIik7XG4gICAgbGV0IHNwaW5uZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3Bpbm5lclwiKTtcblxuICAgIC8vIGZyb20gdGVzdGluZywgcGFnZSBsb2FkaW5nIGlzIGluY29uc2lzdGVudCwgZWl0aGVyIGl0ZW0gMyBvciBpdGVtIDQgaXMgdGhlIGNvcnJlY3QgZWxlbWVudFxuICAgIGNvbnN0IGJ1dHRvbkxpc3QgPVxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwicGg1XCIpWzBdPy5jaGlsZHJlbi5pdGVtKDQpID8/XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJwaDVcIilbMF0/LmNoaWxkcmVuLml0ZW0oMyk7XG5cbiAgICBpZiAoIWJ1dHRvbikge1xuICAgICAgICBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgICBidXR0b24uaWQgPSBcInVybEJ1dHRvblwiO1xuICAgICAgICBidXR0b24uY2xhc3NMaXN0LmFkZChcIndhaUZpbmFuY2VCdXR0b25cIik7XG5cbiAgICAgICAgc3Bpbm5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgICAgICBzcGlubmVyLmlkID0gXCJzcGlubmVyXCI7XG4gICAgICAgIHNwaW5uZXIuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICBzcGlubmVyLmlubmVySFRNTCA9IGBcbiAgICAgICAgPHN2ZyB3aWR0aD1cIjI0XCIgaGVpZ2h0PVwiMjRcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuICAgICAgICAgIDxzdHlsZT5cbiAgICAgICAgICAgIC5zcGlubmVyX0hJSzUgeyB0cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7IGFuaW1hdGlvbjogc3Bpbm5lcl9YVlk5IDFzIGN1YmljLWJlemllcigwLjM2LCAuNiwgLjMxLCAxKSBpbmZpbml0ZTsgfVxuICAgICAgICAgICAgQGtleWZyYW1lcyBzcGlubmVyX1hWWTkgeyA1MCUgeyB0cmFuc2Zvcm06IHJvdGF0ZSgxODBkZWcpOyB9IDEwMCUgeyB0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpOyB9IH1cbiAgICAgICAgICA8L3N0eWxlPlxuICAgICAgICAgIDxjaXJjbGUgY3g9XCIxMlwiIGN5PVwiMTJcIiByPVwiM1wiLz5cbiAgICAgICAgICA8ZyBjbGFzcz1cInNwaW5uZXJfSElLNVwiPlxuICAgICAgICAgICAgPGNpcmNsZSBjeD1cIjRcIiBjeT1cIjEyXCIgcj1cIjNcIi8+XG4gICAgICAgICAgICA8Y2lyY2xlIGN4PVwiMjBcIiBjeT1cIjEyXCIgcj1cIjNcIi8+XG4gICAgICAgICAgPC9nPlxuICAgICAgICA8L3N2Zz5gO1xuXG4gICAgICAgIGJ1dHRvbi5hcHBlbmRDaGlsZChzcGlubmVyKTtcbiAgICAgICAgYnV0dG9uTGlzdC5hcHBlbmQoYnV0dG9uKTtcblxuICAgICAgICAvLyBsaW5rZWRpbiBwYWdlIGdldHMgbWVzc2VkIHVwIHdoZW4gd2UgYWRkIG1vcmUgYnV0dG9ucywgc28gbWFrZSBzdXJlIGl0IGNhbiB3cmFwXG4gICAgICAgIGJ1dHRvbkxpc3Quc3R5bGUuZmxleFdyYXAgPSBcIndyYXBcIjtcbiAgICAgICAgYnV0dG9uTGlzdC5zdHlsZS5yb3dHYXAgPSBcIjEwcHhcIjtcblxuICAgICAgICByZXR1cm4gW2J1dHRvbiwgc3Bpbm5lcl07XG4gICAgfVxufTtcblxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9