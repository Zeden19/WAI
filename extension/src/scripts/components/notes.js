import { doc } from "firebase/firestore";
import { showToast } from "./toast";

// TODO: Adding a Title Feature
const addNoteTitle = () => {
  // Styling NotesUI
  notesUI.style.display = "flex";
  notesUI.style.flexDirection = "row";
  notesUI.style.width = "60%";
  notesUI.style.marginTop = "1.6rem";

  // Styling NotesTextArea
  notesTextArea.style.width = "100%";
  notesTextArea.style.height = "3.6rem";
  notesTextArea.style.minHeight = "3.6rem";
  notesTextArea.style.maxHeight = "15rem";
  notesTextArea.style.boxSizing = "border-box";
  notesTextArea.style.border = "2px solid rgb(10, 102, 194)";

  notesTextArea.style.overflow = "hidden";
  notesTextArea.style.overflowY = "scroll";
  notesTextArea.style.resize = "vertical";
  notesTextArea.style.scrollbarWidth = "none";
  notesTextArea.placeholder = "Enter your notes here :)";

  // Pulling Previous Notes from DB + Cache
  const getNotesData = () => {
    return "";
  };
  notesTextArea.innerText = getNotesData();

  // Styling ConfirmButton
  // lowkey should find actual stupid top an
  confirmButton.style.marginLeft = "1.6rem";
  confirmButton.style.height = "3.6rem";
  confirmButton.style.backgroundColor = "rgb(10, 102, 194)";
  confirmButton.style.color = "white";
  confirmButton.style.border = "none";
  confirmButton.style.borderRadius = "var(--corner-radius-large)!important";
  confirmButton.style.fontSize = "1.5rem";
  confirmButton.style.fontWeight = "bold";

  confirmButton.innerText = "Save";
  confirmButton.style.color = "white";
  confirmButton.style.cursor = "pointer";
  confirmButton.style.transition = "all 0.2s ease-in-out";
  confirmButton.style.boxShadow = "0 0 0 0 rgba(10, 102, 194, 0.5)";
  confirmButton.style.paddingLeft = "2rem";
  confirmButton.style.paddingRight = "2rem";

  // Posting Changes to Notes
  const postNewNotes = () => {
    confirmButton.disabled = true;
    notesTextArea.disabled = true;
    confirmButton.innerText = "Saving...";
    confirmButton.style.backgroundColor = "rgb(80, 144, 207)";

    // Push

    setTimeout(() => {
      showToast("Notes Saved", "success");
      confirmButton.disabled = false;
      notesTextArea.disabled = false;
      confirmButton.innerText = "Save";
      confirmButton.style.backgroundColor = "rgb(10, 102, 194)";
    }, 2000);
  };
  confirmButton.addEventListener("click", postNewNotes);
};

const removeNotesTitle = () => {
  notesUI?.remove();
  notesUI = null;

  notesTextArea?.remove();
  notesTextArea = null;

  confirmButton?.remove();
  confirmButton = null;
};

let noteBodyUI = null;

const addNoteBody = () => {};

const removeNoteBody = () => {};

let previousNotesUI = null;

const addNotePrevious = (notes) => {
  // getting the notes

  notes?.forEach((note) => {
    renderIndividualPost(note);
  });
};

const removeNotePrevious = () => {};

let notesUI = null;

let allNotesArea = null;
let allNotesButton = null;

let postUI = null;
let postTitle = null;
let postTextBox = null;
let postPreviousButton = null;
let postSaveButton = null;

let notesTextArea = null;
let confirmButton = null;

export const addNotesUI = () => {
  notesUI = document.getElementById("notesUI");
  // Renders and creates the text area for notes
  const renderNotesTextArea = () => {
    const parentUI = document.querySelector(".ph5");

    notesUI = document.createElement("div");
    notesUI.id = "notesUI";
    notesUI.classList.add("notesUI");
    parentUI.appendChild(notesUI);

    notesTextArea = document.createElement("textarea");
    notesUI.appendChild(notesTextArea); // Add button to notes UI

    confirmButton = document.createElement("button");
    notesUI.appendChild(confirmButton); // Add button to notes UI
  };

  const renderPostArea = () => {};
  const renderAllNotesArea = () => {};

  if (!notesUI) {
    renderNotesTextArea();
  }
  renderPostArea();
  renderAllNotesArea();
  addNoteTitle();
  addNoteBody();
  addNotePrevious();
};

export const removeNotesUI = () => {
  removeNotesTitle();
  removeNoteBody();
  removeNotePrevious();
};
